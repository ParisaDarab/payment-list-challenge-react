import { PaymentApiError } from "../error/paymentApiError";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface ServiceConfig {
  baseUrl: string;
  method: Method;
  headers?: Record<string, string>;
}

export const serviceCall = async (
  service: ServiceConfig,
  url: string = "",
  params?: URLSearchParams | Record<string, string>,
  body?: unknown,
) => {
  const { baseUrl, method, headers } = service;

  const searchParams =
    params instanceof URLSearchParams ? params : new URLSearchParams(params);
  const queryString = searchParams.toString();

  const requestId = crypto.randomUUID();

  const response = await fetch(
    `${baseUrl}${url}${queryString ? `?${queryString}` : ""}`,
    {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        "X-Request-Id": requestId,
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    },
  );

  if (!response.ok) {
    throw new PaymentApiError(
      response.status,
      `Request failed with status ${response.status}`,
      requestId,
    );
  }

  return response.json();
};
