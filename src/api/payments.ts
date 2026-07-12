import paymentAdaptor from "../adaptors/paymentAdaptor";
import { API_URL, VALID_CURRENCIES } from "../constants";
import { Currency, PaymentFilters, PaymentsResponse } from "../types/payment";
import { I18N } from "../constants/i18n";
import { ValidationError } from "../error/validationError";
import { PaymentApiError } from "../error/paymentApiError";

const SEARCH_INPUT_PATTERN = /^[a-zA-Z0-9À-ÿ'\-_. ]{1,50}$/;

export function isValidSearchInput(value: string): boolean {
  return SEARCH_INPUT_PATTERN.test(value);
}

export function isValidCurrency(value: string): value is Currency {
  return VALID_CURRENCIES.includes(value as Currency);
}

// Search and retrieve payments with filtering and pagination support.
// GET  /api/payments;
// Params  search=pay_134&currency=USD&page=1&pageSize=5
// Response 200 {"payments": [
//     {
//       "id": "pay_123456789",
//       "customerName": "John Doe",
//       "amount": 150.00,
//       "customerAddress": "123 Main St, City, Country",
//       "currency": "USD",
//       "status": "completed",
//       "date": "2024-01-15T10:30:00Z",
//       "description": "Payment for services",
//       "clientId": "cli_123"
//     }
//   ],
//   "total": 25,
//   "page": 1,
//   "pageSize": 5
// }

export async function searchPayments(filters: PaymentFilters) {
  const params = new URLSearchParams();

  if (filters.search) {
    if (!isValidSearchInput(filters.search)) {
      throw new ValidationError(I18N.VALIDATION_ERROR);
    }
    params.set(I18N.SEARCH, filters.search);
  }

  if (filters.currency) {
    if (!isValidCurrency(filters.currency)) {
      throw new ValidationError(I18N.VALIDATION_ERROR);
    }
    params.set(I18N.CURRENCY, filters.currency);
  }

  params.set("page", String(filters.page));
  params.set("pageSize", String(filters.pageSize));

  const response = await fetch(`${API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new PaymentApiError(
      response.status,
      `Request failed with status ${response.status}`,
    );
  }

  const data: PaymentsResponse = await response.json();
  return paymentAdaptor(data);
}
