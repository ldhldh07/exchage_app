"use client";

import { useQuery } from "@tanstack/react-query";
import { getExchangeRates } from "../api/getExchangeRates";
import { mapExchangeRateResponse } from "../lib/mapper";
import { exchangeRateKeys } from "../models/exchange-rate.keys";
import { useAuthRedirect } from "@/shared/hooks";
import { shouldRetryQuery } from "@/shared/lib";

export const useExchangeRates = () => {
  const query = useQuery({
    queryKey: exchangeRateKeys.latest(),
    queryFn: getExchangeRates,
    staleTime: 1000 * 60, // 1분
    refetchInterval: 1000 * 60, // 1분마다 자동 갱신
    select: mapExchangeRateResponse,
    retry: shouldRetryQuery,
  });

  useAuthRedirect({ error: query.error });

  return query;
};
