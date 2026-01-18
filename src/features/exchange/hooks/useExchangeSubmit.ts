"use client";

import { useState, useTransition, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useExchangeRates, exchangeRateKeys } from "@/entities/exchange-rate";
import { walletKeys } from "@/entities/wallet";
import { ERROR_CODES } from "@/shared/lib";
import { createOrderAction } from "../server/createOrderAction";
import type { ExchangeFormData } from "./useExchangeForm";

interface OrderQuote {
  krwAmount: number;
  appliedRate: number;
}

interface UseExchangeSubmitParams {
  formState: ExchangeFormData;
  quote: OrderQuote | null | undefined;
  onSuccess?: () => void;
}

interface UseExchangeSubmitResult {
  submit: (data: ExchangeFormData) => void;
  isPending: boolean;
  success: boolean;
  serverError: string | null;
  getRateForCurrency: (currency: string) => number | undefined;
}

export const useExchangeSubmit = ({ formState, quote, onSuccess }: UseExchangeSubmitParams): UseExchangeSubmitResult => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const { data: ratesData } = useExchangeRates();

  useEffect(() => {
    setServerError(null);
  }, [formState.amount, formState.currency, formState.orderType]);

  const getCurrentRate = useCallback(
    (currency: string) => ratesData?.data?.find((r) => r.currency === currency),
    [ratesData?.data]
  );

  const submit = useCallback(
    (data: ExchangeFormData) => {
      const currentRateData = getCurrentRate(data.currency);

      if (!quote || !currentRateData) return;

      setServerError(null);
      setSuccess(false);

      startTransition(async () => {
        const result = await createOrderAction({
          exchangeRateId: currentRateData.id,
          fromCurrency: data.orderType === "buy" ? "KRW" : data.currency,
          toCurrency: data.orderType === "buy" ? data.currency : "KRW",
          forexAmount: parseFloat(data.amount),
        });

        if (result.success) {
          setSuccess(true);
          onSuccess?.();
          queryClient.invalidateQueries({ queryKey: walletKeys.all });
          queryClient.invalidateQueries({ queryKey: exchangeRateKeys.all });
        } else {
          setServerError(result.error || "환전에 실패했습니다.");
          if (result.errorCode === ERROR_CODES.EXCHANGE_RATE_MISMATCH) {
            queryClient.invalidateQueries({ queryKey: exchangeRateKeys.all });
          }
        }
      });
    },
    [quote, getCurrentRate, queryClient, onSuccess]
  );

  const getRateForCurrency = useCallback(
    (currency: string) => getCurrentRate(currency)?.rate,
    [getCurrentRate]
  );

  return {
    submit,
    isPending,
    success,
    serverError,
    getRateForCurrency,
  };
};
