"use client";

import { Suspense } from "react";
import { ExchangeRateHeader } from "@/entities/exchange-rate";
import { ExchangeRateList } from "@/features/exchange-rate";
import { WalletInfo } from "@/features/wallet";
import { Loader } from "@/shared/ui";

export function ExchangeRateInfo() {
  return (
    <section>
      <ExchangeRateHeader />
      <div className="flex flex-col gap-6 mx-20 mb-12.5">
        <Suspense fallback={<Loader />}>
          <ExchangeRateList />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <WalletInfo />
        </Suspense>
      </div>
    </section>
  );
}
