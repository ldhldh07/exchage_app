"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/getOrders";

export const orderKeys = {
  all: ["orders"] as const,
  list: () => [...orderKeys.all, "list"] as const,
};

export const useOrders = () => {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: getOrders,
    staleTime: 1000 * 60, // 1분
  });
};
