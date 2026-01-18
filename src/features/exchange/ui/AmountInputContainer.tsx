"use client";

import { getCurrencyUnit } from "@/shared/config";
import { AmountInput } from "@/entities/order";
import { useExchangeFormContext } from "../context/ExchangeFormContext";

export function AmountInputContainer() {
  const { formState, setAmount, isPending } = useExchangeFormContext();

  const isBuy = formState.orderType === "buy";
  const label = isBuy ? "매수 금액" : "매도 금액";
  const unit = getCurrencyUnit(formState.currency);
  const suffix = isBuy ? `${unit} 사기` : `${unit} 팔기`;

  const handleChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <AmountInput
      label={label}
      value={formState.amount}
      suffix={suffix}
      disabled={isPending}
      onChange={handleChange}
    />
  );
}
