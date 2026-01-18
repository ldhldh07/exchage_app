"use client";

import {
  useExchangeRates,
  ExchangeRateCardList,
  ExchangeRateCardListSkeleton,
} from "@/entities/exchange-rate";

export function ExchangeRateList() {
  const { data, isLoading } = useExchangeRates();

  if (isLoading) {
    return <ExchangeRateCardListSkeleton />;
  }

  if (!data?.success || !data.data) {
    return (
      <div className="flex gap-5">
        <div className="flex flex-1 justify-center items-center py-8 text-red-500">
          {data?.error || "환율 정보를 불러오는데 실패했습니다."}
        </div>
      </div>
    );
  }

  return <ExchangeRateCardList rates={data.data} />;
}
