"use client";

import { Suspense } from "react";
import { ExchangeRateHeader } from "@/entities/exchange-rate";
import { ExchangeRateList } from "@/features/exchange-rate";
import { Loader } from "@/shared/ui";

export function ExchangeRateInfo() {
  return (
    <section>
      <ExchangeRateHeader />
      <div className="flex gap-6 mx-20 mb-12.5">
        <Suspense fallback={<Loader />}>
          <ExchangeRateList />
        </Suspense>
      </div>
    </section>
  );
}
