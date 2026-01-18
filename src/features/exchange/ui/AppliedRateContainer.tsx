"use client";

import { AppliedRate } from "@/entities/order";
import { useExchangeFormContext } from "../context/ExchangeFormContext";

export function AppliedRateContainer() {
  const { formState, quote, currentRate } = useExchangeFormContext();

  return (
    <AppliedRate
      currency={formState.currency}
      rate={quote?.appliedRate ?? currentRate ?? 0}
    />
  );
}
