"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import type { Currency } from "@/entities/exchange-rate";

const exchangeFormSchema = z.object({
  currency: z.enum(["USD", "JPY", "KRW"]),
  orderType: z.enum(["buy", "sell"]),
  amount: z
    .string()
    .min(1, "금액을 입력해주세요")
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "0보다 큰 금액을 입력해주세요",
    }),
});

export type ExchangeFormData = z.infer<typeof exchangeFormSchema>;
export type OrderType = "buy" | "sell";

const defaultValues: ExchangeFormData = {
  currency: "USD",
  orderType: "buy",
  amount: "",
};

export const useExchangeForm = () => {
  const form = useForm<ExchangeFormData>({
    resolver: zodResolver(exchangeFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { watch, setValue, reset, formState } = form;

  const currency = watch("currency");
  const orderType = watch("orderType");
  const amount = watch("amount");

  const setCurrency = (value: Currency) => setValue("currency", value, { shouldValidate: true });
  const setOrderType = (value: OrderType) => setValue("orderType", value, { shouldValidate: true });
  const setAmount = (value: string) => setValue("amount", value, { shouldValidate: true });

  return {
    form,
    formState: {
      currency,
      orderType,
      amount,
    },
    setCurrency,
    setOrderType,
    setAmount,
    reset: () => reset({ currency, orderType, amount: "" }),
    isValid: formState.isValid,
    errors: formState.errors,
  };
};
