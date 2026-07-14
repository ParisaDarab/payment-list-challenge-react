// src/error/paymentApiError.ts
import { ApiError } from "./apiError";

export class PaymentApiError extends ApiError {
  constructor(status: number, message: string, requestId?: string) {
    super(status, message, requestId);
    this.name = "PaymentApiError";
  }
}
