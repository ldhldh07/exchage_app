"use client";

import { getCurrencyUnit } from "@/shared/config";
import { AmountInput } from "@/entities/order";
import { useExchangeFormContext } from "../context/ExchangeFormContext";

export function AmountInputContainer() {
  const { formState, errors, setAmount, isPending } = useExchangeFormContext();

  const isBuy = formState.orderType === "buy";
  const label = isBuy ? "매수 금액" : "매도 금액";
  const unit = getCurrencyUnit(formState.currency);
  const suffix = isBuy ? `${unit} 사기` : `${unit} 팔기`;

  const handleChange = (value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const showError = formState.amount.length > 0 ? errors.amount?.message : undefined;

  return (
    <AmountInput
      label={label}
      value={formState.amount}
      suffix={suffix}
      disabled={isPending}
      error={showError}
      onChange={handleChange}
    />
  );
}
