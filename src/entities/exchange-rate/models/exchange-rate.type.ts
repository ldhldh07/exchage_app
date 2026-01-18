import type { Currency } from "@/shared/config/currency";

export type { Currency };

export interface ExchangeRateItem {
  id: number;
  currency: Currency;
  rate: number;
  changePercentage: number;
}
