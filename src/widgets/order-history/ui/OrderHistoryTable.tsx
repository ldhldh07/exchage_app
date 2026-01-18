"use client";

import { useOrders, type OrderResponse } from "@/entities/order";
import { LoadingSpinner } from "@/shared/ui";

const formatCurrency = (value: number, currency: string) => {
  if (currency === "KRW") {
    return `₩ ${value.toLocaleString("ko-KR")}`;
  }
  return `${currency === "USD" ? "$" : "¥"} ${value.toLocaleString("ko-KR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  })}`;
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function OrderRow({ order }: { order: OrderResponse }) {
  const isBuy = order.fromCurrency === "KRW";

  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-4 text-sm text-gray-500">
        {formatDate(order.orderedAt)}
      </td>
      <td className="py-4 px-4">
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded ${
            isBuy
              ? "bg-red-100 text-red-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {isBuy ? "매수" : "매도"}
        </span>
      </td>
      <td className="py-4 px-4 text-sm">
        <span className="font-medium">{order.toCurrency}</span>
      </td>
      <td className="py-4 px-4 text-sm text-right">
        {formatCurrency(order.fromAmount, order.fromCurrency)}
      </td>
      <td className="py-4 px-4 text-sm text-right">
        {formatCurrency(order.toAmount, order.toCurrency)}
      </td>
      <td className="py-4 px-4 text-sm text-right text-gray-500">
        {order.appliedRate.toLocaleString("ko-KR", { maximumFractionDigits: 2 })}
      </td>
    </tr>
  );
}

export function OrderHistoryTable() {
  const { data, isLoading, error } = useOrders();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !data?.success || !data.data) {
    return (
      <div className="text-center py-16 text-red-500">
        {data?.error || "환전 내역을 불러오는데 실패했습니다."}
      </div>
    );
  }

  const orders = data.data;

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        아직 환전 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              일시
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              구분
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              통화
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              지출
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              수령
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              적용 환율
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.orderId} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
