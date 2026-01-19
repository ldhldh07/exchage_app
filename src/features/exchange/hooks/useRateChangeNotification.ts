"use client";

import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { orderQuoteKeys } from "./useOrderQuote";
import type { Currency, OrderType } from "@/shared/config";

interface UseRateChangeNotificationParams {
  currency: Currency;
  orderType: OrderType;
  amount: string;
  currentRate: number | undefined;
  hasQuote: boolean;
}

interface UseRateChangeNotificationResult {
  rateChangeMessage: string | null;
}

export const useRateChangeNotification = ({
  currency,
  orderType,
  amount,
  currentRate,
  hasQuote,
}: UseRateChangeNotificationParams): UseRateChangeNotificationResult => {
  const queryClient = useQueryClient();
  const prevRateRef = useRef<number | undefined>(undefined);
  const prevCurrencyRef = useRef<Currency>(currency);
  const [rateChangeMessage, setRateChangeMessage] = useState<string | null>(null);

  useEffect(() => {
    setRateChangeMessage(null);
  }, [amount, currency, orderType]);

  useEffect(() => {
    if (prevCurrencyRef.current !== currency) {
      prevRateRef.current = currentRate;
      prevCurrencyRef.current = currency;
      return;
    }

    if (prevRateRef.current === undefined) {
      prevRateRef.current = currentRate;
      return;
    }

    if (currentRate !== undefined && prevRateRef.current !== currentRate) {
      prevRateRef.current = currentRate;

      if (hasQuote) {
        queryClient.invalidateQueries({ queryKey: orderQuoteKeys.all });
        setRateChangeMessage("환율이 변경되었습니다. 다시 구매버튼을 눌러주세요.");
      }
    }
  }, [currency, currentRate, hasQuote, queryClient]);

  return {
    rateChangeMessage,
  };
};
