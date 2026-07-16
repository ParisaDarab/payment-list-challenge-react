# Solution Notes

This document covers my implementation of the Payment Search Challenge — architecture, the decisions behind it, and what I'd do with more time. The original challenge brief and API spec are in [`README.md`](./README.md); this file is my own documentation of the solution.

## Summary

A payment search interface built with React 19, TypeScript, and Tailwind, backed by a mocked API (MSW). Supports searching by payment ID, filtering by currency, combining both filters, pagination, and distinct handling for not-found (404) and server-error (500) responses — all driven by the provided API contract.

## Architecture

The app is layered by responsibility, each layer with one job:

```
App.tsx              → QueryClientProvider setup + centralized query logging
  └─ PaymentsPage.tsx → owns UI state (filters, search input, currency), composes the page
       ├─ SearchForm.tsx  → search input, currency select, submit/clear
       ├─ PaymentTable    → renders results + pagination controls
       └─ usePayments.ts  → useQuery wrapper around the API call
            └─ api/payments.ts   → input validation, builds the request, calls serviceCall
                 └─ services/serviceCall.ts → generic HTTP client, shared across services (config per service in services/services.ts)
                 └─ adaptors/paymentAdaptor.ts → shapes the raw API response for the UI
                 └─ error/*.ts + utils/getErrorMessage.ts → typed errors mapped to i18n messages
```

All HTTP calls go through the shared `serviceCall` client — `api/payments.ts` doesn't call `fetch` directly. `serviceCall` throws a generic `ApiError` on a failed response (it has no knowledge of payments specifically); `api/payments.ts` catches that at the domain boundary and re-throws it as `PaymentApiError`, preserving `status`, `message`, and the request ID, so downstream error handling (`getErrorMessage`) still resolves 404/500 to the right copy.

All user-facing strings live in `constants/i18n.ts` — the challenge notes these are also used by the test/scoring harness, so using them consistently wasn't optional, but it also kept copy centralized rather than scattered across components.

## Key decisions

**State management — React Query for server state, `useState` for UI state.** The payments list is server state: asynchronous, owned by a remote source, can go stale. React Query gives caching (`staleTime: 30s`), retry (`retry: 1`), and loading/error tracking without hand-rolling a `useEffect` fetch. Filters, search input, and currency are local UI state scoped to `PaymentsPage` — plain `useState` is the right tool there; reaching for Redux or a global store would have been unnecessary for state only one component tree needs.

**Errors as typed classes, not string matching.** `ValidationError` (bad input, caught before any network call) and `ApiError`/`PaymentApiError` (HTTP failures) are distinct types, both resolved to user-facing copy in one place — `getErrorMessage()` — rather than checking status codes or error strings inline in components. `serviceCall` throws a generic `ApiError` since it's shared across services and shouldn't know about payments specifically; domain-specific errors are the responsibility of the code that calls it.

**The adaptor strips fields deliberately, not accidentally.** `paymentAdaptor` only forwards `id`, `customerName`, `amount`, `currency`, `status`, and `date` to the UI — `customerAddress`, `description`, and `clientId` never leave the data layer. That's a data-minimization choice: the UI doesn't need them, so they don't get passed down, logged, or accidentally rendered.

**Client-side validation before any network call.** `isValidSearchInput` and `isValidCurrency` reject bad input before `fetch` ever runs, saving a round trip for input that can't possibly succeed. This is a UX optimization, not a security boundary — a real backend would still need to validate independently, since client-side checks can be bypassed.

## Observability

Every query already emits a structured event through React Query's `QueryCache` — `query_failed` or `query_succeeded`, tagged with the query key, so a failure is traceable to the exact search/filter combination that caused it. `serviceCall` also generates a request ID per HTTP call, which distinguishes an original request from React Query's automatic retry — something the query key alone can't do.

Today this only reaches the browser console, which means nobody's watching it in production. With a real deployment, the next step is redirecting those same hooks into a real observability platform (Datadog, given this is a payments company likely already running Datadog for backend APM) rather than adding a new logging mechanism — and propagating the request ID to the backend so a single failed search becomes one connected trace across the front end and API, not two log streams correlated by hand. Session replay / RUM tooling would need explicit masking rules for anything sensitive before being added, consistent with how the adaptor already keeps `customerAddress` out of the UI layer.

## Testing

The `test:step1`–`test:step8` scripts run the challenge's provided grading tests (`vitest -t "Step N:"`), validating each step against the spec. Beyond those, worth calling out what's _not_ covered yet: edge cases in the validation regex (boundary lengths, accented characters), the adaptor's field-stripping behavior (asserting sensitive fields never reach the UI layer), and the structured logging itself (that `QueryCache` hooks always produce valid JSON regardless of what's in the query key).

## Running it

```bash
npm install
npm run dev          # start the dev server
npx vitest run        # run all tests
npm run build          # type-check (tsc -b) + production build
npm run lint            # eslint
```

CI (`.github/workflows/ci.yml`) runs lint → test → build on every push/PR to `main`. There's no deploy step configured — this repo has continuous integration, not continuous deployment.

## Trade-offs and what I'd do with more time

Being upfront about scope rather than pretending this is more finished than it is:

- **No real deploy target.** CI covers lint/test/build; there's no CD stage, no Dockerfile, no hosting config — reasonable for a challenge repo, but the next step for a real service.
- **No production observability tooling wired up.** The structured logging and request ID exist as the collection points; there's no deployed backend or environment for a platform like Datadog to report against yet, so I didn't add the dependency without a real target for it.
- **`axios` is an installed dependency that isn't currently used** anywhere in the codebase — either worth removing, or worth using consistently instead of the native `fetch` calls in `serviceCall`, rather than having both approaches available unused.
