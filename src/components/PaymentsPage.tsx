import {
  ChangeEvent,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { Spinner, Title, Container, ErrorBox } from "./components";
import { usePayments } from "../hooks/usePayments";
import { CustomTable } from "./table";
import { I18N } from "../constants/i18n";
import { getErrorMessage } from "../utils/getErrorMessage";
import { SearchForm } from "./SearchForm";

interface PaymentFilters {
  search: string;
  currency: string;
  page: number;
  pageSize: number;
}

const DEBOUNCE_DELAY_MS = 500;

export const PaymentsPage = () => {
  const [filters, setFilters] = useState<PaymentFilters>({
    search: "",
    currency: "",
    page: 1,
    pageSize: 5,
  });
  const [searchInput, setSearchInput] = useState("");
  const { isLoading, data, error } = usePayments(filters);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    clearTimeout(debounceRef.current);
    setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
  };

  const onClearFilters = () => {
    clearTimeout(debounceRef.current);
    setFilters((prev) => ({ ...prev, search: "", currency: "", page: 1 }));
    setSearchInput("");
  };

  useEffect(() => {
    debounceRef.current = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }, DEBOUNCE_DELAY_MS);

    return () => clearTimeout(debounceRef.current);
  }, [searchInput]);

  const onSelectCurrency = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilters((prev) => ({
      ...prev,
      currency: value === I18N.CURRENCIES ? "" : value,
      page: 1,
    }));
  };

  const handlePagination = (e: MouseEvent<HTMLButtonElement>) => {
    const direction = e.currentTarget.dataset.direction;
    if (
      direction === I18N.NEXT_BUTTON_LABEL &&
      data &&
      data.totalPages > filters.page
    ) {
      setFilters((prev) => ({ ...prev, page: Number(prev.page) + 1 }));
    }
    if (direction === I18N.PREVIOUS_BUTTON_LABEL && filters.page > 1) {
      setFilters((prev) => ({ ...prev, page: Number(prev.page) - 1 }));
    }
  };

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <SearchForm
        searchInput={searchInput}
        onSearchInputChange={onSearchInputChange}
        onSearchSubmit={onSearchSubmit}
        onClearFilters={onClearFilters}
        currency={filters.currency}
        onSelectCurrency={onSelectCurrency}
      />

      {error && (
        <ErrorBox role="alert" aria-live="assertive">
          {getErrorMessage(error)}
        </ErrorBox>
      )}

      {isLoading && <Spinner />}

      {data && (
        <CustomTable
          data={data}
          onHandlePagination={handlePagination}
          currentPage={filters.page}
        />
      )}
    </Container>
  );
};
