import { describe, expect, it } from "vitest";
import { isValidCurrency, isValidSearchInput } from "./api/payments";

describe("App - Step 9: isValidPaymentId", () => {
  it("accept a well-formed payment Id", () => {
    expect(isValidSearchInput("pay_134_1")).toBe(true);
  });

  it("reject an empty string", () => {
    expect(isValidSearchInput("")).toBe(false);
  });
});

describe("App - Step 10: isValidCurrency", () => {
  it("accepts a whitelisted currency", () => {
    expect(isValidCurrency("USD")).toBe(true);
  });
  it("rejects a currency outside the whitelist", () => {
    expect(isValidCurrency("XXX")).toBe(false);
  });
});
