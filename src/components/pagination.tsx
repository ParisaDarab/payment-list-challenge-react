import { P, PaginationButton } from "./components";
import { I18N } from "../constants/i18n";
import { MouseEvent } from "react";

export interface paginationProps {
  currentPage: string | number;
  onHandlePagination: (e: MouseEvent<HTMLButtonElement>) => void;
  nextButtonDisable?: boolean;
  previousButtonDisable?: boolean;
}

export const Pagination = ({
  currentPage,
  onHandlePagination,
  nextButtonDisable,
  previousButtonDisable,
}: paginationProps) => {
  return (
    <div className="flex justify-between items-center  text-center min-w-max border rounded-b-lg p-3">
      <PaginationButton
        data-direction="previous"
        onClick={onHandlePagination}
        disabled={previousButtonDisable}
      >
        {I18N.PREVIOUS_BUTTON}
      </PaginationButton>
      <P className="text-[#1f2937]">Page {currentPage}</P>
      <PaginationButton
        data-direction="next"
        onClick={onHandlePagination}
        disabled={nextButtonDisable}
      >
        {I18N.NEXT_BUTTON}
      </PaginationButton>
    </div>
  );
};
