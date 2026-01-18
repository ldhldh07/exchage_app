"use client";

import { PageTitle } from "@/shared/ui";
import { OrderHistoryTable } from "@/widgets/order-history";

export default function HistoryPage() {
  return (
    <div>
      <PageTitle title="환전 내역" subtitle="환전 내역을 확인하실 수 있어요." />
      <OrderHistoryTable />
    </div>
  );
}
