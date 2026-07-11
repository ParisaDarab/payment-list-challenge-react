import { VALID_CURRENCIES } from "../constants";

export interface Payment {
  id: string;
  customerName: string;
  amount: number;
  customerAddress?: string;
  currency: string;
  status: string;
  date: string;
  description?: string;
  clientId?: string;
}

export interface PaymentsResponse {
  payments: Payment[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PaymentFilters {
  search: string;
  currency: string;
  page: number;
  pageSize: number;
}

export type Currency = (typeof VALID_CURRENCIES)[number];
