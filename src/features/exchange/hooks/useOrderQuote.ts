"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo, useRef } from "react";
import { getOrderQuote, type OrderQuoteRequest } from "@/entities/order";
import { getCurrencyMinAmount, type OrderType } from "@/shared/config";
import type { ExchangeFormData } from "./useExchangeForm";

export const orderQuoteKeys = {
  all: ["order-quote"] as const,
  byOrderType: (orderType: OrderType) => [...orderQuoteKeys.all, orderType] as const,
  quote: (orderType: OrderType, params: OrderQuoteRequest) => 
    [...orderQuoteKeys.byOrderType(orderType), params] as const,
};

export const useOrderQuote = (formState: ExchangeFormData) => {
  const { currency, orderType, amount } = formState;
  
  const prevOrderTypeRef = useRef(orderType);
  const lastQuoteRef = useRef<{ krwAmount: number; appliedRate: number } | null>(null);

  const minAmount = getCurrencyMinAmount(currency);

  const quoteParams: OrderQuoteRequest | null = useMemo(() => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount < minAmount) {
      return null;
    }

    return {
      fromCurrency: orderType === "buy" ? "KRW" : currency,
      toCurrency: orderType === "buy" ? currency : "KRW",
      forexAmount: numAmount,
    };
  }, [currency, orderType, amount, minAmount]);

  if (prevOrderTypeRef.current !== orderType) {
    lastQuoteRef.current = null;
    prevOrderTypeRef.current = orderType;
  }

  if (quoteParams === null) lastQuoteRef.current = null;

  const query = useQuery({
    queryKey: orderQuoteKeys.quote(orderType, quoteParams!),
    queryFn: () => getOrderQuote(quoteParams!),
    enabled: quoteParams !== null,
    staleTime: 1000 * 30, // 30초
    placeholderData: () => {
      if (lastQuoteRef.current) {
        return { success: true, data: lastQuoteRef.current };
      }
      return undefined;
    },
  });

  const currentQuote = query.data?.success ? query.data.data : null;
  if (currentQuote) {
    lastQuoteRef.current = currentQuote;
  }

  const quote = quoteParams === null ? null : currentQuote;

  return {
    quote,
    isLoading: query.isLoading,
    error: query.data?.error || (query.error ? "견적 조회 실패" : null),
  };
};
