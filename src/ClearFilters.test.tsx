import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { I18N } from "./constants/i18n";
import App from "./App";

it("clear filters resets both the search input and the currency dropdown", async () => {
  render(<App />);

  const searchInput = screen.getByRole("searchbox", {
    name: I18N.SEARCH_LABEL,
  });
  const currencyDropdown = screen.getByRole("combobox", {
    name: I18N.CURRENCY_FILTER_LABEL,
  });
  const clearButton = screen.getByRole("button", {
    name: I18N.CLEAR_FILTERS,
  });

  fireEvent.change(searchInput, { target: { value: "pay_134_1" } });
  fireEvent.change(currencyDropdown, { target: { value: "USD" } });

  expect(searchInput).toHaveValue("pay_134_1");
  expect(currencyDropdown).toHaveValue("USD");

  fireEvent.click(clearButton);

  expect(searchInput).toHaveValue("");
  expect(currencyDropdown).toHaveValue("");
});
