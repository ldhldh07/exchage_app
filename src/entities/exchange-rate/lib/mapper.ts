import type { ExchangeRateResponse } from "../models/exchange-rate.schema";
import type { ExchangeRateItem } from "../models/exchange-rate.type";

export const mapExchangeRateResponse = (data: ExchangeRateResponse[]): ExchangeRateItem[] => {
  return data
    .filter((rate) => rate.currency !== "KRW")
    .map((rate) => ({
      id: rate.exchangeRateId,
      currency: rate.currency,
      rate: rate.rate,
      changePercentage: rate.changePercentage,
    }));
};
