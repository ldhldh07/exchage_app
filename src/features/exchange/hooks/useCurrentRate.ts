"use client";

import { useCallback } from "react";
import { useExchangeRates } from "@/entities/exchange-rate";
import type { Currency } from "@/shared/config";

interface CurrentRateData {
  id: number;
  rate: number;
}

export const useCurrentRate = () => {
  const { data: ratesData } = useExchangeRates();

  const getRateData = useCallback(
    (currency: Currency): CurrentRateData | undefined => {
      const rateItem = ratesData?.find((r) => r.currency === currency);
      if (!rateItem) return undefined;
      return { id: rateItem.id, rate: rateItem.rate };
    },
    [ratesData]
  );

  const getRate = useCallback(
    (currency: Currency): number | undefined => getRateData(currency)?.rate,
    [getRateData]
  );

  return {
    getRateData,
    getRate,
  };
};
