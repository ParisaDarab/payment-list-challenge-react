import { I18N } from "../constants/i18n";
import {
  Table,
  TableBodyWrapper,
  TableCell,
  TableHead,
  TableRow,
  StatusBadge,
} from "./components";
import { PaymentsResponse } from "../types/payment";
import { Pagination, paginationProps } from "./pagination";
import { formatDate } from "../utils/formatDate";

interface PaymentTableProps extends paginationProps {
  data: PaymentsResponse;
}

export const PaymentTable = ({
  data,
  onHandlePagination,
  currentPage,
}: PaymentTableProps) => {
  const nextButtonDisable = data.totalPages == currentPage;
  const previousButtonDisable = currentPage == 1;

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{I18N.TABLE_HEADER_PAYMENT_ID}</TableCell>
            <TableCell>{I18N.TABLE_HEADER_DATE}</TableCell>
            <TableCell>{I18N.TABLE_HEADER_AMOUNT}</TableCell>
            <TableCell>{I18N.TABLE_HEADER_CUSTOMER}</TableCell>
            <TableCell>{I18N.TABLE_HEADER_CURRENCY}</TableCell>
            <TableCell>{I18N.TABLE_HEADER_STATUS}</TableCell>
          </TableRow>
        </TableHead>
        <TableBodyWrapper>
          {data.payments.length > 0
            ? data.payments.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{formatDate(item.date)}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell>{item.customerName}</TableCell>
                    <TableCell>{item.currency}</TableCell>
                    <TableCell>
                      <StatusBadge $status={item.status}>
                        {item.status}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                );
              })
            : ""}
        </TableBodyWrapper>
      </Table>
      <Pagination
        nextButtonDisable={nextButtonDisable}
        previousButtonDisable={previousButtonDisable}
        currentPage={currentPage}
        onHandlePagination={onHandlePagination}
      />
    </>
  );
};
