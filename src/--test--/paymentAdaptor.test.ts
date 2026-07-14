import { describe, expect, it } from "vitest";
import paymentAdaptor from "../adaptors/paymentAdaptor";

describe("payment adaptor", () => {
  it("maps a raw API response to PaymentListItem shape", () => {
    const mockResponse = {
      payments: [
        {
          id: "pay_123",
          customerName: "John Doe",
          amount: 150,
          currency: "USD",
          status: "completed",
          date: "2024-01-15T10:30:00Z",
          customerAddress: "...",
          description: "...",
          clientId: "cli_1",
        },
      ],
      total: 1,
      page: 1,
      pageSize: 5,
    };

    const result = paymentAdaptor(mockResponse);

    expect(result).toEqual({
      payments: [
        {
          id: "pay_123",
          customerName: "John Doe",
          amount: 150,
          currency: "USD",
          status: "completed",
          date: "2024-01-15T10:30:00Z",
        },
      ],
      total: 1,
      page: 1,
      pageSize: 5,
      totalPages: 1,
    });
  });
});
