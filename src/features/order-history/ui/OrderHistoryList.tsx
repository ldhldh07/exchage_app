"use client";

import {
  useOrders,
  OrderHistoryTable,
  OrderHistoryTableSkeleton,
} from "@/entities/order";
import { useClientPagination, useInfiniteScroll, useScrollToTop } from "@/shared/hooks";
import { ScrollToTopButton } from "@/shared/ui";

const PAGE_SIZE = 10;

export function OrderHistoryList() {
  const { data, isLoading, error } = useOrders();

  const orders = data ?? [];
  const { data: visibleOrders, hasMore, loadMore } = useClientPagination(orders, {
    pageSize: PAGE_SIZE,
  });

  const { targetRef } = useInfiniteScroll<HTMLTableRowElement>({
    onIntersect: loadMore,
    enabled: hasMore,
    threshold: 0.5,
  });

  const { showScrollBtn, scrollToTop } = useScrollToTop({ threshold: 200 });

  if (isLoading) {
    return (
      <div className="px-20 pb-12.5">
        <OrderHistoryTableSkeleton />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-16 text-red-500">
        {error?.message || "환전 내역을 불러오는데 실패했습니다."}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        아직 환전 내역이 없습니다.
      </div>
    );
  }

  return (
    <div className="px-20 pb-12.5">
      <OrderHistoryTable
        orders={visibleOrders}
        hasMore={hasMore}
        loadingRef={targetRef}
      />
      <ScrollToTopButton onClick={scrollToTop} visible={showScrollBtn} />
    </div>
  );
}
