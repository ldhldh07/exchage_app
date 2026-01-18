export type Currency = "KRW" | "USD" | "JPY";

export interface ExchangeRateItem {
  id: number;
  currency: Currency;
  rate: number;
  changePercentage: number;
}
