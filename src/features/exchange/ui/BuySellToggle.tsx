"use client";

import { useExchangeFormContext } from "../context/ExchangeFormContext";
import type { OrderType } from "../hooks/useExchangeForm";

export function BuySellToggle() {
  const { formState, setOrderType, isPending } = useExchangeFormContext();

  return (
    <div className="flex bg-white rounded-2xl border border-gray-300 p-3 gap-3">
      <ToggleButton
        type="buy"
        isSelected={formState.orderType === "buy"}
        disabled={isPending}
        onClick={() => setOrderType("buy")}
      />
      <ToggleButton
        type="sell"
        isSelected={formState.orderType === "sell"}
        disabled={isPending}
        onClick={() => setOrderType("sell")}
      />
    </div>
  );
}

interface ToggleButtonProps {
  type: OrderType;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
}

function ToggleButton({ type, isSelected, disabled, onClick }: Readonly<ToggleButtonProps>) {
  const isBuy = type === "buy";
  const label = isBuy ? "살래요" : "팔래요";

  const selectedClass = isBuy
    ? "bg-red-500 text-white"
    : "bg-blue-500 text-white";
  const unselectedClass = isBuy
    ? "bg-white text-[#FFA7A7] hover:bg-gray-50"
    : "bg-white text-gray-600 hover:bg-gray-50";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex-1 px-6 py-3 cursor-pointer text-sm font-medium rounded-xl transition-colors ${isSelected ? selectedClass : unselectedClass
        } disabled:cursor-not-allowed`}
    >
      <span className="text-xl font-bold">{label}</span>
    </button>
  );
}
