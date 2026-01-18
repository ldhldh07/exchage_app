"use client";

import { PageTitle } from "@/shared/ui";
import { OrderHistoryWidget } from "@/widgets/order-history";

export default function HistoryPage() {
  return (
    <div className="flex flex-col gap-6 mb-20">
      <PageTitle title="환전 내역" subtitle="환전 내역을 확인하실 수 있어요." />
      <OrderHistoryWidget />
    </div>
  );
}
