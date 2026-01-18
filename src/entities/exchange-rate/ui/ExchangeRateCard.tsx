import { formatRate, formatPercentage } from "@/shared/lib";
import { getCurrencyName } from "@/shared/config";
import { ArrowUpIcon, ArrowDownIcon, Skeleton } from "@/shared/ui";
import type { ExchangeRateItem } from "../models/exchange-rate.type";

interface ExchangeRateCardListProps {
  rates: ExchangeRateItem[];
}

export function ExchangeRateCardList({ rates }: Readonly<ExchangeRateCardListProps>) {
  return (
    <div className="flex md:flex-row flex-col gap-5">
      {rates.map((rate) => (
        <ExchangeRateCard key={rate.id} rate={rate} />
      ))}
    </div>
  );
}

interface ExchangeRateCardProps {
  rate: ExchangeRateItem;
}

export function ExchangeRateCard({ rate }: Readonly<ExchangeRateCardProps>) {
  const isPositive = rate.changePercentage >= 0;

  return (
    <div className="flex flex-1 justify-between bg-white border border-gray-300 rounded-xl py-6 px-8">
      <div className="flex flex-col w-[160px] items-start justify-between gap-2">
        <p className="text-h4 text-gray-600">{rate.currency}</p>
        <div className="flex flex-col gap-1 whitespace-nowrap">
          <p className="text-h3">
            {formatRate(rate.rate)} KRW
          </p>
          <p
            className={`flex items-center gap-1 text-[16px] font-normal ${isPositive ? "text-red-500" : "text-[#3B6EFF]"}`}
          >
            {isPositive ? <ArrowUpIcon /> : <ArrowDownIcon />}
            {formatPercentage(rate.changePercentage)}
          </p>
        </div>
      </div>
      <span className="text-h5 text-gray-600 whitespace-nowrap">{getCurrencyName(rate.currency)}</span>
    </div>
  );
}

export function ExchangeRateCardSkeleton() {
  return (
    <div className="flex flex-1 justify-between bg-white border border-gray-300 rounded-xl py-6 px-8">
      <div className="flex flex-col w-[160px] items-start justify-between gap-2">
        <Skeleton className="h-7 w-12" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5.75 w-16" />
        </div>
      </div>
      <Skeleton className="h-5 w-16" />
    </div>
  );
}

export function ExchangeRateCardListSkeleton() {
  return (
    <div className="flex gap-5">
      <ExchangeRateCardSkeleton />
      <ExchangeRateCardSkeleton />
    </div>
  );
}
