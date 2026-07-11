import { Payment, PaymentsResponse } from "../types/payment";

const paymentAdaptor = (response: PaymentsResponse) => {
  const { payments, total, page, pageSize } = response;
  const newPaymentList = payments.map((payment: Payment) => ({
    id: payment.id,
    customerName: payment.customerName,
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
    date: payment.date,
  }));
  const totalPages = Math.ceil(total / pageSize);
  return {
    payments: newPaymentList,
    total,
    page,
    pageSize,
    totalPages,
  };
};

export default paymentAdaptor;
