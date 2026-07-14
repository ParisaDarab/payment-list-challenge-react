import { useQuery } from "@tanstack/react-query";
import { searchPayments } from "../api/payments";
import type { PaymentFilters } from "../types/payment";

export function usePayments(filters: PaymentFilters) {
  return useQuery({
    queryKey: ["payments", filters],
    queryFn: () => searchPayments(filters),
  });
}
