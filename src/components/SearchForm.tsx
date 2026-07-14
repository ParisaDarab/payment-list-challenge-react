import { ChangeEvent, FormEvent } from "react";
import { I18N } from "../constants/i18n";
import { VALID_CURRENCIES } from "../constants";
import { ClearButton, SearchButton, SearchInput, Select } from "./components";

interface SearchFormProps {
  searchInput: string;
  currency: string;
  onSearchInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (e: FormEvent) => void;
  onClearFilters: () => void;
  onSelectCurrency: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const SearchForm = ({
  searchInput,
  currency,
  onSearchInputChange,
  onSearchSubmit,
  onClearFilters,
  onSelectCurrency,
}: SearchFormProps) => {
  return (
    <form onSubmit={onSearchSubmit} className="mb-4">
      <div className="flex gap-3">
        <SearchInput
          type="search"
          value={searchInput}
          onChange={onSearchInputChange}
          aria-label={I18N.SEARCH_LABEL}
          placeholder={I18N.SEARCH_PLACEHOLDER}
        />
        <Select
          value={currency}
          onChange={onSelectCurrency}
          aria-label={I18N.CURRENCY_FILTER_LABEL}
        >
          <option value="">{I18N.CURRENCIES_OPTION}</option>
          {VALID_CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </Select>
        <SearchButton type="submit">{I18N.SEARCH_BUTTON}</SearchButton>
        <ClearButton type="button" onClick={onClearFilters}>
          {I18N.CLEAR_FILTERS}
        </ClearButton>
      </div>
    </form>
  );
};
