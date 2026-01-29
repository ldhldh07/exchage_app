"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/getOrders";
import { orderKeys } from "../models/order.keys";

export const useOrders = () => {
  return useQuery({
    queryKey: orderKeys.list(),
    queryFn: getOrders,
    staleTime: 1000 * 30,
  });
};
