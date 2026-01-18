"use client";

import { useQuery } from "@tanstack/react-query";
import { getExchangeRates } from "../api/getExchangeRates";
import { mapExchangeRateResponse } from "../lib/mapper";
import { useAuthRedirect } from "@/shared/hooks";

export const exchangeRateKeys = {
  all: ["exchange-rates"] as const,
  latest: () => [...exchangeRateKeys.all, "latest"] as const,
};

export const useExchangeRates = () => {
  const query = useQuery({
    queryKey: exchangeRateKeys.latest(),
    queryFn: getExchangeRates,
    staleTime: 1000 * 60, // 1분
    refetchInterval: 1000 * 60, // 1분마다 자동 갱신
    select: mapExchangeRateResponse,
  });

  useAuthRedirect({ errorCode: query.data?.errorCode });

  return query;
};
