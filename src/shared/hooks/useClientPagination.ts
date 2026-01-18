"use client";

import { useState, useMemo, useCallback } from "react";

interface UseClientPaginationOptions {
  pageSize?: number;
}

export function useClientPagination<T>(
  items: T[],
  options?: UseClientPaginationOptions
) {
  const { pageSize = 10 } = options || {};
  const [page, setPage] = useState(1);

  const visibleItems = useMemo(() => {
    return items.slice(0, page * pageSize);
  }, [items, page, pageSize]);

  const hasMore = visibleItems.length < items.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore]);

  const reset = useCallback(() => {
    setPage(1);
  }, []);

  return {
    data: visibleItems,
    hasMore,
    loadMore,
    reset,
    totalCount: items.length,
    visibleCount: visibleItems.length,
  };
}
