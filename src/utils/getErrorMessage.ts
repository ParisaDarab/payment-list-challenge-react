// src/utils/getErrorMessage.ts
import { ValidationError } from "../error/validationError";
import { PaymentApiError } from "../error/paymentApiError";
import { I18N } from "../constants/i18n";

export function getErrorMessage(error: unknown): string {
  if (error instanceof ValidationError) {
    return error.message;
  }
  if (error instanceof PaymentApiError) {
    if (error.status === 404) return I18N.PAYMENT_NOT_FOUND;
    return I18N.INTERNAL_SERVER_ERROR;
  }
  return I18N.SOMETHING_WENT_WRONG;
}
