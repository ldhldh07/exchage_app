"use client";

import { useQuery } from "@tanstack/react-query";
import { getExchangeRates } from "../api/getExchangeRates";
import { mapExchangeRateResponse } from "../lib/mapper";
import { exchangeRateKeys } from "../models/exchange-rate.keys";

export const useExchangeRates = () => {
  return useQuery({
    queryKey: exchangeRateKeys.latest(),
    queryFn: getExchangeRates,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 60,
    select: mapExchangeRateResponse,
  });
};
