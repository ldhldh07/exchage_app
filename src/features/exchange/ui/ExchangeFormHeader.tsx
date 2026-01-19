"use client";

import { useDropdown } from "@/shared/hooks";
import { type Currency } from "@/shared/config";
import { CurrencySelect } from "@/entities/exchange-rate";
import { useExchangeFormContext } from "../context/ExchangeFormContext";

export function ExchangeFormHeader() {
  const { formState, setCurrency, isPending } = useExchangeFormContext();
  const { isOpen, dropdownRef, toggle, close } = useDropdown();

  const handleToggle = () => {
    if (!isPending) toggle();
  };

  const handleSelect = (currency: Currency) => {
    setCurrency(currency);
    close();
  };

  return (
    <CurrencySelect
      ref={dropdownRef}
      selectedCurrency={formState.currency}
      isOpen={isOpen}
      disabled={isPending}
      onToggle={handleToggle}
      onSelect={handleSelect}
    />
  );
}
