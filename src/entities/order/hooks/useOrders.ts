"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/getOrders";
import { orderKeys } from "../models/order.keys";
import { useAuthRedirect } from "@/shared/hooks";
import { shouldRetryQuery } from "@/shared/lib";

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
