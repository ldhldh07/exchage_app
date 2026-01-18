import { memo, type ReactNode, type RefObject } from "react";
import { Skeleton, LoadingSpinner } from "@/shared/ui";
import { formatDateTime, formatForex, formatKrw, formatRate } from "@/shared/lib";

interface OrderHistoryTableProps {
  orders: OrderHistoryRowData[];
  hasMore?: boolean;
  loadingRef?: RefObject<HTMLTableRowElement | null>;
}

export function OrderHistoryTable({ 
  orders, 
  hasMore, 
  loadingRef 
}: Readonly<OrderHistoryTableProps>) {
  return (
    <TableContainer>
      {orders.map((order) => (
        <OrderHistoryRow key={order.orderId} order={order} />
      ))}
      {hasMore && (
        <tr ref={loadingRef}>
          <td colSpan={5} className="py-4">
            <div className="flex justify-center">
              <LoadingSpinner />
            </div>
          </td>
        </tr>
      )}
    </TableContainer>
  );
}

function TableContainer({ children }: { children: ReactNode }) {
  return (
    <div className="py-4 bg-white border border-gray-300 rounded-2xl">
      <table className="w-full">
        <TableHeader />
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}


function TableHeader() {
  return (
    <thead className="bg-gray-50 border-y border-gray-200">
      <tr>
        <th className="h-page-bottom pl-10 pr-4 text-start text-p2 text-gray-600">
          거래ID
        </th>
        <th className="h-page-bottom w-[180px] px-4 text-start text-p2 text-gray-600">
          거래 일시
        </th>
        <th className="h-page-bottom px-4 text-end text-p2 text-gray-600">
          매수 금액
        </th>
        <th className="h-page-bottom px-4 text-end text-p2 text-gray-600">
          체결 환율
        </th>
        <th className="h-page-bottom pl-4 pr-10 text-end text-p2 text-gray-600">
          매도 금액
        </th>
      </tr>
    </thead>
  );
}


export interface OrderHistoryRowData {
  orderId: number;
  orderedAt: string;
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  appliedRate: number;
}

interface OrderHistoryRowProps {
  order: OrderHistoryRowData;
}


const OrderHistoryRow = memo(function OrderHistoryRow({ 
  order 
}: Readonly<OrderHistoryRowProps>) {
  const buyAmount = order.fromAmount;
  const sellAmount = order.toAmount;
  const isBuyKrw = order.fromCurrency === "KRW";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="ml-6 py-3.5 pr-4 pl-10 h-[48px] text-p2 text-gray-700">
        {order.orderId}
      </td>
      <td className="w-[180px] py-3.5 px-4 h-[48px] text-p2 text-gray-700">
        {formatDateTime(order.orderedAt)}
      </td>
      <td className="py-3.5 px-4 h-[48px] text-end text-p2 text-gray-700">
        {isBuyKrw ? formatKrw(buyAmount) : formatForex(buyAmount)}
      </td>
      <td className="py-3.5 px-4 h-[48px] text-end text-p2 text-gray-700">
        {formatRate(order.appliedRate)}
      </td>
      <td className="mr-6 py-3.5 pl-4 pr-10 h-[48px] text-end text-p2 text-gray-700">
        {isBuyKrw ? formatForex(sellAmount) : formatKrw(sellAmount)}
      </td>
    </tr>
  );
});

export function OrderHistoryTableSkeleton() {
  return (
    <TableContainer>
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </TableContainer>
  );
}

function SkeletonRow() {
  return (
    <tr className="border-b border-gray-100">
      <td className="py-3.5 pl-10 pr-10 h-[48px]"><Skeleton className="h-4 w-8" /></td>
      <td className="py-3.5 w-[180px] px-4 h-[48px]"><Skeleton className="h-4 w-32" /></td>
      <td className="py-3.5 px-4 h-[48px]"><Skeleton className="h-4 w-16 ml-auto" /></td>
      <td className="py-3.5 px-4 h-[48px]"><Skeleton className="h-4 w-20 ml-auto" /></td>
      <td className="py-3.5 pl-4 pr-10 h-[48px]"><Skeleton className="h-4 w-20 ml-auto" /></td>
    </tr>
  );
}