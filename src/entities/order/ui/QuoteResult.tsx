import { formatKrw } from "@/shared/lib";
import { type OrderType } from "@/shared/config";
import { type OrderQuote } from "./OrderForm";

export interface QuoteResultProps {
  orderType: OrderType;
  quote?: OrderQuote | null;
}

export function QuoteResult({ orderType, quote }: Readonly<QuoteResultProps>) {
  const isBuy = orderType === "buy";

  return (
    <div className="flex flex-col gap-3 mb-page-bottom">
      <div className="text-label text-gray-600">필요 원화</div>
      <div className="bg-gray-100 h-[75px] flex items-center border border-gray-500 rounded-xl p-6">
        {quote ? (
          <div className="flex-1 flex gap-2.5">
            <span className="text-right text-gray-600 flex-1 text-lg font-semibold">
              {formatKrw(quote.krwAmount)}
            </span>
            <span className={`font-bold text-xl ${isBuy ? "text-red-500" : "text-blue-500"}`}>
              원 {isBuy ? "필요해요" : "받을 수 있어요"}
            </span>
          </div>
        ) : (
          <span className="text-lg font-semibold invisible">0</span>
        )}
      </div>
    </div >
  );
}
