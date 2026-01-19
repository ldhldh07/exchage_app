import { Button } from "@/shared/ui";
import type { ReactNode } from "react";

export interface OrderQuote {
  krwAmount: number;
  appliedRate: number;
}

export interface OrderFormProps {
  isPending: boolean;
  isValid: boolean;
  hasQuote: boolean;
  serverError?: string | null;
  retryCount?: number;
  onSubmit: () => void;
  children: ReactNode;
}

export function OrderForm({
  isPending,
  isValid,
  hasQuote,
  serverError,
  retryCount = 0,
  onSubmit,
  children,
}: Readonly<OrderFormProps>) {
  const isRetrying = retryCount > 0;
  const buttonText = isRetrying ? `재시도 중... (${retryCount}/3)` : "환전하기";

  return (
    <div className="flex flex-col justify-between h-[787px] bg-gray-000 border border-gray-300 rounded-xl py-6 px-8">
      <div className="space-y-8">{children}</div>

      <div className="flex flex-col gap-1">
        <p
          className={`text-sm font-semibold text-right h-5 ${
            serverError ? "text-red-500" : "invisible"
          }`}
        >
          {serverError || "placeholder"}
        </p>
        <Button
          fullWidth
          isLoading={isPending}
          disabled={!isValid || !hasQuote}
          onClick={onSubmit}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}


