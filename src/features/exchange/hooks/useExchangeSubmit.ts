"use client";

import { useState, useTransition, useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { exchangeRateKeys } from "@/entities/exchange-rate";
import { walletKeys } from "@/entities/wallet";
import { type OrderQuote } from "@/entities/order";
import { ERROR_CODES, withRetryResult } from "@/shared/lib";
import { createOrderAction, type CreateOrderState } from "../server/createOrderAction";
import type { ExchangeFormData } from "./useExchangeForm";

interface UseExchangeSubmitParams {
  formState: ExchangeFormData;
  quote: OrderQuote | null | undefined;
  exchangeRateId: number | undefined;
  onSuccess?: () => void;
}

interface UseExchangeSubmitResult {
  submit: (data: ExchangeFormData) => void;
  isPending: boolean;
  success: boolean;
  serverError: string | null;
  retryCount: number;
}

const RETRYABLE_ERRORS = [
  ERROR_CODES.NETWORK_ERROR,
  ERROR_CODES.TIMEOUT,
  ERROR_CODES.SERVICE_UNAVAILABLE,
] as const;

const isRetryableError = (result: CreateOrderState): boolean => {
  if (!result.errorCode) return false;
  return RETRYABLE_ERRORS.includes(result.errorCode as typeof RETRYABLE_ERRORS[number]);
};

export const useExchangeSubmit = ({ 
  formState, 
  quote, 
  exchangeRateId,
  onSuccess 
}: UseExchangeSubmitParams): UseExchangeSubmitResult => {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setServerError(null);
    setRetryCount(0);
  }, [formState.amount, formState.currency, formState.orderType]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const submit = useCallback(
    (data: ExchangeFormData) => {
      if (!quote || !exchangeRateId) return;

      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setServerError(null);
      setSuccess(false);
      setRetryCount(0);

      startTransition(async () => {
        const orderRequest = {
          exchangeRateId,
          fromCurrency: data.orderType === "buy" ? "KRW" : data.currency,
          toCurrency: data.orderType === "buy" ? data.currency : "KRW",
          forexAmount: parseFloat(data.amount),
        };

        const { result } = await withRetryResult(
          () => createOrderAction(orderRequest),
          {
            maxRetries: 3,
            delayBase: 1000,
            shouldRetry: isRetryableError,
            onRetry: (attempt) => setRetryCount(attempt),
            signal: abortControllerRef.current?.signal,
          }
        );

        setRetryCount(0);

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
    [quote, exchangeRateId, queryClient, onSuccess]
  );

  return {
    submit,
    isPending,
    success,
    serverError,
    retryCount,
  };
};
