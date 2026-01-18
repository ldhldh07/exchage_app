import { Currency } from "@/shared/config";
import { formatKrw } from "@/shared/lib";

export interface AppliedRateProps {
  currency: Currency;
  rate: number;
}

export function AppliedRate({ currency, rate }: Readonly<AppliedRateProps>) {
  return (
    <>
      <div className="w-full h-px bg-gray-400"></div>
      <div className="flex justify-between text-sm text-gray-500">
        <span className="text-label">적용 환율</span>
        <span className="text-xl font-semibold">1 {currency} = {formatKrw(rate)} 원</span>
      </div>
    </>
  );
}
