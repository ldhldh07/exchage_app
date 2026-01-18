"use client";

import { OrderHistoryTable } from "@/widgets/order-history";

export default function HistoryPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">환전 내역</h1>
      <OrderHistoryTable />
    </div>
  );
}
