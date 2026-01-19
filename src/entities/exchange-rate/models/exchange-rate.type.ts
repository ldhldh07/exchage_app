import type { Currency } from "@/shared/config";

export interface ExchangeRateItem {
  id: number;
  currency: Currency;
  rate: number;
  changePercentage: number;
}
