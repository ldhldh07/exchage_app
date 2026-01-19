"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/getOrders";
import { useAuthRedirect } from "@/shared/hooks";
import { shouldRetryQuery } from "@/shared/lib";

export const orderKeys = {
  all: ["orders"] as const,
  list: () => [...orderKeys.all, "list"] as const,
};

export const useOrders = () => {
  const query = useQuery({
    queryKey: orderKeys.list(),
    queryFn: getOrders,
    staleTime: 1000 * 60, // 1분
    retry: shouldRetryQuery,
  });

  useAuthRedirect({ error: query.error });

  return query;
};
