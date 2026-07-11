// export const I18N = {
//   // App title
//   APP_TITLE: "Checkout.com",

//   // Page title
//   PAGE_TITLE: "All payments",

//   // Search and filter labels
//   SEARCH_PLACEHOLDER: "Enter payment ID",
//   SEARCH_LABEL: "Search payments",
//   CURRENCY_FILTER_LABEL: "Filter by currency",

//   // Filter options
//   CURRENCIES_OPTION: "Currencies",

//   // Button text
//   SEARCH_BUTTON: "Search",
//   CLEAR_FILTERS: "Clear Filters",

//   // Table headers
//   TABLE_HEADER_PAYMENT_ID: "Payment ID",
//   TABLE_HEADER_DATE: "Date",
//   TABLE_HEADER_AMOUNT: "Amount",
//   TABLE_HEADER_CUSTOMER: "Customer",
//   TABLE_HEADER_CURRENCY: "Currency",
//   TABLE_HEADER_STATUS: "Status",

//   // Pagination
//   PREVIOUS_BUTTON: "◀ Previous",
//   NEXT_BUTTON: "Next ▶",
//   PAGE_LABEL: "Page",

//   // Messages
//   NO_PAYMENTS_FOUND: "No payments found.",
//   PAYMENT_NOT_FOUND: "Payment not found.",
//   INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
//   SOMETHING_WENT_WRONG: "Something went wrong!",

//   // Fallback values
//   EMPTY_CUSTOMER: "—",
//   EMPTY_CURRENCY: "—",
//   //Filters
//   CURRENCY: "currency",
//   SEARCH:"search",
// } as const;

const APP = {
  APP_TITLE: "Checkout.com",
  PAGE_TITLE: "All payments",
} as const;

const SEARCH_FORM = {
  SEARCH_PLACEHOLDER: "Enter payment ID",
  SEARCH_LABEL: "Search payments",
  CURRENCY_FILTER_LABEL: "Filter by currency",
  CURRENCIES_OPTION: "Currencies",
  SEARCH_BUTTON: "Search",
  CLEAR_FILTERS: "Clear Filters",
} as const;

const TABLE = {
  TABLE_HEADER_PAYMENT_ID: "Payment ID",
  TABLE_HEADER_DATE: "Date",
  TABLE_HEADER_AMOUNT: "Amount",
  TABLE_HEADER_CUSTOMER: "Customer",
  TABLE_HEADER_CURRENCY: "Currency",
  TABLE_HEADER_STATUS: "Status",
  TABLE_EMPTY: "There is no item",
} as const;
const BUTTONS = {
  PREVIOUS_BUTTON: "previous",
  NEXT_BUTTON: "next",
} as const;

const PAGINATION = {
  PREVIOUS_BUTTON: "◀ Previous",
  NEXT_BUTTON: "Next ▶",
  PAGE_LABEL: "Page",
} as const;

const MESSAGES = {
  NO_PAYMENTS_FOUND: "No payments found.",
  PAYMENT_NOT_FOUND: "Payment not found.",
  INTERNAL_SERVER_ERROR: "Internal server error. Please try again later.",
  SOMETHING_WENT_WRONG: "Something went wrong!",
  VALIDATION_ERROR: "Please enter a valid value",
} as const;

const FALLBACKS = {
  EMPTY_CUSTOMER: "—",
  EMPTY_CURRENCY: "—",
} as const;

const FILTER_KEYS = {
  CURRENCY: "currency",
  CURRENCIES: "Currencies",
  SEARCH: "search",
} as const;

export const I18N = {
  APP,
  SEARCH_FORM,
  TABLE,
  BUTTONS,
  PAGINATION,
  MESSAGES,
  FALLBACKS,
  FILTER_KEYS,
};
