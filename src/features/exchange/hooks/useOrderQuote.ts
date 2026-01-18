"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getOrderQuote, type OrderQuoteRequest } from "@/entities/order";
import type { ExchangeFormState } from "./useExchangeForm";

export const orderQuoteKeys = {
  all: ["order-quote"] as const,
  quote: (params: OrderQuoteRequest) => [...orderQuoteKeys.all, params] as const,
};

export const useOrderQuote = (formState: ExchangeFormState) => {
  const { currency, orderType, amount } = formState;

  const quoteParams: OrderQuoteRequest | null = useMemo(() => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      return null;
    }

    return {
      fromCurrency: orderType === "buy" ? "KRW" : currency,
      toCurrency: orderType === "buy" ? currency : "KRW",
      forexAmount: numAmount,
    };
  }, [currency, orderType, amount]);

  const query = useQuery({
    queryKey: orderQuoteKeys.quote(quoteParams!),
    queryFn: () => getOrderQuote(quoteParams!),
    enabled: quoteParams !== null,
    staleTime: 1000 * 30, // 30초
  });

  return {
    quote: query.data?.success ? query.data.data : null,
    isLoading: query.isLoading,
    error: query.data?.error || (query.error ? "견적 조회 실패" : null),
  };
};
