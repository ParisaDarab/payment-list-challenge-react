ARG NODE_VERSION=20.17.0
ARG APP_DIR=/payment-list-challenge-react

########################
# Stage 1: build
########################
FROM node:${NODE_VERSION}-alpine3.20 AS build
ARG APP_DIR
WORKDIR ${APP_DIR}

# Fail the build if there's no lockfile - reproducibility is mandatory in regulated envs
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --ignore-scripts

COPY . .
RUN npm run build \
    && npm prune --omit=dev --ignore-scripts

########################
# Stage 2: security scan (fails build on HIGH/CRITICAL CVEs)
# Not referenced by `runtime`, so it never ships. CI builds it explicitly with
# `docker build --target scan`; skip it locally if Trivy isn't available.
########################
FROM aquasec/trivy:latest AS scan
ARG APP_DIR
WORKDIR /scan
COPY --from=build ${APP_DIR} /scan
RUN trivy fs --exit-code 1 --severity HIGH,CRITICAL --ignore-unfixed /scan || \
    (echo "Vulnerabilities found - failing build" && exit 1)

########################
# Stage 3: runtime (minimal, non-root, distroless-ish)
########################
FROM node:${NODE_VERSION}-alpine3.20 AS runtime
ARG APP_DIR

# Metadata for audit trails (fintech change-management often requires this)
LABEL org.opencontainers.image.title="payment-list-challenge-react" \
      org.opencontainers.image.vendor="your-org" \
      org.opencontainers.image.licenses="proprietary"

ENV NODE_ENV=production \
    NPM_CONFIG_LOGLEVEL=warn \
    PORT=3000

# tini handles PID 1 / signal forwarding correctly (clean shutdown, no zombie processes)
RUN apk add --no-cache tini=0.19.0-r3 \
    && addgroup -S appgroup -g 10001 \
    && adduser -S appuser -u 10001 -G appgroup -h ${APP_DIR} -s /sbin/nologin

WORKDIR ${APP_DIR}

COPY --from=build --chown=appuser:appgroup ${APP_DIR}/dist ./dist
COPY --from=build --chown=appuser:appgroup ${APP_DIR}/node_modules ./node_modules
COPY --from=build --chown=appuser:appgroup ${APP_DIR}/package.json ./package.json

# Writable tmp only - pair with `docker run --read-only --tmpfs /tmp` in prod
RUN mkdir -p ${APP_DIR}/tmp && chown appuser:appgroup ${APP_DIR}/tmp

USER appuser:appgroup

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD node -e "require('http').get('http://127.0.0.1:'+(process.env.PORT||3000)+'/healthz', r => process.exit(r.statusCode===200?0:1)).on('error', () => process.exit(1))"

ENTRYPOINT ["/sbin/tini", "--"]
CMD ["node", "dist/server.js"]