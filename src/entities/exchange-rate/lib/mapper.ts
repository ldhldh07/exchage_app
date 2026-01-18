import type { ExchangeRateResponse } from "../models/exchange-rate.schema";
import type { ExchangeRateItem } from "../models/exchange-rate.type";

interface MapExchangeRateResult {
  success: boolean;
  data?: ExchangeRateItem[];
  error?: string;
}

interface GetExchangeRatesResult {
  success: boolean;
  data?: ExchangeRateResponse[];
  error?: string;
}

export const mapExchangeRateResponse = (result: GetExchangeRatesResult): MapExchangeRateResult => {
  if (!result.success || !result.data) {
    return { success: false, error: result.error };
  }

  return {
    success: true,
    data: result.data
      .filter((rate) => rate.currency !== "KRW")
      .map((rate) => ({
        id: rate.exchangeRateId,
        currency: rate.currency,
        rate: rate.rate,
        changePercentage: rate.changePercentage,
      })),
  };
};
