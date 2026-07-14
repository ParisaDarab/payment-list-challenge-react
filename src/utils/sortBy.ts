import { I18N } from "../constants/i18n";
import { PaymentsResponse } from "../types/payment";

export const sortDataBy = (sortBy: string, data: PaymentsResponse) => {
  const dataList = data.payments;
  let payments;
  switch (sortBy) {
    case I18N.HIGHER_AMOUNT:
      payments = dataList.sort((a, b) => b.amount - a.amount);
      return {
        ...data,
        payments,
      };

    case I18N.LOWER_AMOUNT:
      payments = dataList.sort((a, b) => a.amount - b.amount);
      return {
        ...data,
        payments,
      };
    default:
      return data;
  }
};
