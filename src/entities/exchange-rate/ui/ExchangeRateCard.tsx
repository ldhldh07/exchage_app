import { formatRate, formatPercentage } from "@/shared/lib";
import { ArrowUpIcon, ArrowDownIcon } from "@/shared/ui";
import type { ExchangeRateResponse, Currency } from "../models/exchange-rate.schema";

const CURRENCY_LABELS: Record<Currency, { name: string }> = {
  USD: { name: "미국 달러" },
  JPY: { name: "일본 엔화" },
  KRW: { name: "대한민국 원" },
};

interface ExchangeRateCardListProps {
  rates: ExchangeRateResponse[];
}

export function ExchangeRateCardList({ rates }: Readonly<ExchangeRateCardListProps>) {
  return (
    <div className="flex gap-5">
      {rates.map((rate) => (
        <ExchangeRateCard key={rate.exchangeRateId} rate={rate} />
      ))}
    </div>
  );
}

interface ExchangeRateCardProps {
  rate: ExchangeRateResponse;
}

export function ExchangeRateCard({ rate }: Readonly<ExchangeRateCardProps>) {
  const currencyInfo = CURRENCY_LABELS[rate.currency];
  const isPositive = rate.changePercentage >= 0;


  return (
    <div className="flex w-[304px] justify-between bg-white border border-gray-300 rounded-xl py-6 px-8">
      <div className="flex flex-col w-[160px] items-start justify-between gap-2">
        <p className="text-h4 text-gray-600">{rate.currency}</p>
        <div className="flex flex-col gap-1 whitespace-nowrap">
          <p className="text-h3">
            {formatRate(rate.rate)} KRW
          </p>
          <p
            className={`flex items-center gap-1 text-[16px] font-normal ${isPositive ? "text-[#FE5050]" : "text-[#3B6EFF]"}`}
          >
            {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {formatPercentage(rate.changePercentage)}
          </p>
        </div>
      </div>
      <span className="text-h5 text-gray-600">{currencyInfo.name}</span>
    </div>
  );
}
