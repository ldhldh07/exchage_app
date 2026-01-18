"use client";

import { useExchangeRates, ExchangeRateCardList } from "@/entities/exchange-rate";
import { Loader } from "@/shared/ui";

export function ExchangeRateList() {
  const { data, isLoading } = useExchangeRates();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.success) {
    return (
      <div className="text-center py-8 text-red-500">
        {data?.error || "환율 정보를 불러오는데 실패했습니다."}
      </div>
    );
  }

  const foreignRates = data.data?.filter((rate) => rate.currency !== "KRW") ?? [];

  return <ExchangeRateCardList rates={foreignRates} />;
}
