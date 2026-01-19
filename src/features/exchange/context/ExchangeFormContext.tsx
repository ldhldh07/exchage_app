"use client";

import { createContext, useContext, useRef, useMemo, useEffect, useCallback, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useExchangeForm, type ExchangeFormData } from "../hooks/useExchangeForm";
import { useOrderQuote, orderQuoteKeys } from "../hooks/useOrderQuote";
import { useExchangeSubmit } from "../hooks/useExchangeSubmit";
import { useUrlParam } from "@/shared/hooks";
import { validateCurrency, validateOrderType, type Currency, type OrderType } from "@/shared/config";
import type { UseFormReturn } from "react-hook-form";

interface OrderQuote {
  krwAmount: number;
  appliedRate: number;
}

interface ExchangeFormState {
  form: UseFormReturn<ExchangeFormData>;
  formState: {
    currency: Currency;
    orderType: OrderType;
    amount: string;
  };
  isValid: boolean;
  errors: {
    amount?: { message?: string };
  };
  quote?: OrderQuote | null;
  isQuoteLoading: boolean;
  isPending: boolean;
  success: boolean;
  serverError: string | null;
  retryCount: number;
  currentRate?: number;
}

interface ExchangeFormActions {
  setCurrency: (currency: Currency) => void;
  setOrderType: (type: OrderType) => void;
  setAmount: (amount: string) => void;
  handleSubmit: () => void;
}

const ExchangeFormStateContext = createContext<ExchangeFormState | null>(null);
const ExchangeFormActionsContext = createContext<ExchangeFormActions | null>(null);

export function useExchangeFormState() {
  const context = useContext(ExchangeFormStateContext);
  if (!context) {
    throw new Error("useExchangeFormState must be used within ExchangeFormProvider");
  }
  return context;
}

export function useExchangeFormActions() {
  const context = useContext(ExchangeFormActionsContext);
  if (!context) {
    throw new Error("useExchangeFormActions must be used within ExchangeFormProvider");
  }
  return context;
}

export function useExchangeFormContext() {
  const state = useExchangeFormState();
  const actions = useExchangeFormActions();
  return { ...state, ...actions };
}

interface ExchangeFormProviderProps {
  children: ReactNode;
}

export function ExchangeFormProvider({ children }: Readonly<ExchangeFormProviderProps>) {
  const queryClient = useQueryClient();
  
  const [urlCurrency, setUrlCurrency] = useUrlParam<Currency>("currency", {
    defaultValue: "USD",
    validate: validateCurrency,
  });
  const [urlOrderType, setUrlOrderType] = useUrlParam<OrderType>("type", {
    defaultValue: "buy",
    validate: validateOrderType,
  });
  
  const { form, formState, setCurrency: setFormCurrency, setOrderType: setFormOrderType, setAmount, reset, isValid, errors } =
    useExchangeForm({ initialCurrency: urlCurrency, initialOrderType: urlOrderType });

  const setCurrency = useCallback(
    (currency: Currency) => {
      setFormCurrency(currency);
      setUrlCurrency(currency);
    },
    [setFormCurrency, setUrlCurrency]
  );

  const setOrderType = useCallback(
    (orderType: OrderType) => {
      setFormOrderType(orderType);
      setUrlOrderType(orderType);
    },
    [setFormOrderType, setUrlOrderType]
  );

  const prevOrderTypeRef = useRef(formState.orderType);
  const prevCurrencyRef = useRef(formState.currency);

  useEffect(() => {
    if (prevOrderTypeRef.current !== formState.orderType) {
      setAmount("");
      queryClient.removeQueries({ queryKey: orderQuoteKeys.all });
      prevOrderTypeRef.current = formState.orderType;
    }
  }, [formState.orderType, queryClient, setAmount]);

  useEffect(() => {
    if (prevCurrencyRef.current !== formState.currency) {
      setAmount("");
      queryClient.removeQueries({ queryKey: orderQuoteKeys.all });
      prevCurrencyRef.current = formState.currency;
    }
  }, [formState.currency, queryClient, setAmount]);

  const { quote, isLoading: isQuoteLoading } = useOrderQuote(formState);

  const { submit, isPending, success, serverError, retryCount, getRateForCurrency } = useExchangeSubmit({
    formState,
    quote,
    onSuccess: reset,
  });

  const currentRate = getRateForCurrency(formState.currency);

  const handleSubmit = form.handleSubmit(submit);

  const actionsRef = useRef<ExchangeFormActions>({
    setCurrency,
    setOrderType,
    setAmount,
    handleSubmit,
  });

  actionsRef.current = {
    setCurrency,
    setOrderType,
    setAmount,
    handleSubmit,
  };

  const actions = useMemo<ExchangeFormActions>(
    () => ({
      setCurrency: (...args) => actionsRef.current.setCurrency(...args),
      setOrderType: (...args) => actionsRef.current.setOrderType(...args),
      setAmount: (...args) => actionsRef.current.setAmount(...args),
      handleSubmit: () => actionsRef.current.handleSubmit(),
    }),
    []
  );

  const state: ExchangeFormState = {
    form,
    formState,
    isValid,
    errors,
    quote,
    isQuoteLoading,
    isPending,
    success,
    serverError,
    retryCount,
    currentRate,
  };

  return (
    <ExchangeFormActionsContext.Provider value={actions}>
      <ExchangeFormStateContext.Provider value={state}>
        {children}
      </ExchangeFormStateContext.Provider>
    </ExchangeFormActionsContext.Provider>
  );
}
