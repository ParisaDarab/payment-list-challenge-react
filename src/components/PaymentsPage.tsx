import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { Spinner, Title, Container, ErrorBox } from "./components";
import { usePayments } from "../hooks/usePayments";
import { PaymentTable } from "./table";
import { I18N } from "../constants/i18n";
import { getErrorMessage } from "../utils/getErrorMessage";
import { SearchForm } from "./SearchForm";

interface PaymentFilters {
  search: string;
  currency: string;
  page: number;
  pageSize: number;
}

export const PaymentsPage = () => {
  const [filters, setFilters] = useState<PaymentFilters>({
    search: "",
    currency: "",
    page: 1,
    pageSize: 5,
  });

  // local input value, separate from the filters actually sent to the API
  const [searchInput, setSearchInput] = useState("");
  const [currency, setCurrency] = useState("");
  const { isLoading, data, error } = usePayments(filters);

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, search: searchInput, currency, page: 1 }));
  };

  const onClearFilters = () => {
    setFilters((prev) => {
      return { ...prev, search: "", currency: "" };
    });
    setSearchInput("");
    setCurrency("");
  };

  const onSelectCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === I18N.FILTER_KEYS.CURRENCIES) {
      setCurrency("");
    } else setCurrency(e.target.value);
  };

  const handlePagination = (e: MouseEvent<HTMLButtonElement>) => {
    const direction = e.currentTarget.dataset.direction;
    if (
      direction === I18N.BUTTONS.NEXT_BUTTON &&
      data &&
      data.totalPages > filters.page
    ) {
      setFilters((prev) => {
        return { ...prev, page: Number(prev.page) + 1 };
      });
    }
    if (direction === I18N.BUTTONS.PREVIOUS_BUTTON && filters.page > 1) {
      setFilters((prev) => {
        return { ...prev, page: Number(prev.page) - 1 };
      });
    }
  };

  return (
    <Container>
      <Title>{I18N.APP.PAGE_TITLE}</Title>

      <SearchForm
        searchInput={searchInput}
        onSearchInputChange={onSearchInputChange}
        onSearchSubmit={onSearchSubmit}
        onClearFilters={onClearFilters}
        currency={currency}
        onSelectCurrency={onSelectCurrency}
      />

      {error && (
        <ErrorBox role="alert" aria-live="assertive">
          {getErrorMessage(error)}
        </ErrorBox>
      )}

      {isLoading && <Spinner />}

      {data && (
        <PaymentTable
          data={data}
          onHandlePagination={handlePagination}
          currentPage={filters.page}
        />
      )}
    </Container>
  );
};
