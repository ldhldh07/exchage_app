import { Button } from "@/shared/ui";
import type { ReactNode } from "react";

export type OrderType = "buy" | "sell";

export interface OrderQuote {
  krwAmount: number;
  appliedRate: number;
}

export interface OrderFormProps {
  isPending: boolean;
  isValid: boolean;
  hasQuote: boolean;
  onSubmit: () => void;
  children: ReactNode;
}

export function OrderForm({
  isPending,
  isValid,
  hasQuote,
  onSubmit,
  children,
}: Readonly<OrderFormProps>) {
  return (
    <div className="flex flex-col justify-between h-[787px] bg-gray-000 border border-gray-300 rounded-xl py-6 px-8">
      <div className="space-y-8">
        {children}
      </div>

      <Button
        fullWidth
        isLoading={isPending}
        disabled={!isValid || !hasQuote}
        onClick={onSubmit}
      >
        환전하기
      </Button>
    </div>
  );
}


