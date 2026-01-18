"use client";

import { QuoteResult } from "@/entities/order";
import { useExchangeFormContext } from "../context/ExchangeFormContext";

export function QuoteResultContainer() {
  const { formState, quote } = useExchangeFormContext();

  return <QuoteResult orderType={formState.orderType} quote={quote} />;
}
