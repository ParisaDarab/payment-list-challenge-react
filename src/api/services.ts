// src/api/services.ts
import { API_URL } from "../constants";
import { ServiceConfig } from "./serviceCall";

export const services = {
  payments: {
    search: {
      baseUrl: API_URL,
      method: "GET",
    },
  },
} as const satisfies Record<string, Record<string, ServiceConfig>>;
