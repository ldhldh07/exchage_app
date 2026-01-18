"use client";

import { ExchangeRateHeader } from "@/entities/exchange-rate";
import { ExchangeRateList } from "@/features/exchange-rate";
import { WalletInfo } from "@/features/wallet";
import { ExchangeForm } from "@/widgets/exchange-form";

export function ExchangeRateInfo() {
  return (
    <section>
      <ExchangeRateHeader />
      <div className="flex gap-6 mx-20 mb-12.5">
        <div className="flex-1 flex flex-col gap-6">
          <ExchangeRateList />
          <WalletInfo />
        </div>
        <div className="flex-1">
          <ExchangeForm />
        </div>
      </div>
    </section>
  );
}
