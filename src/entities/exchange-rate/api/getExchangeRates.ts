"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { ResponseParseError } from "@/shared/lib";
import { ExchangeRateListResponseSchema, type ExchangeRateResponse, type ExchangeRateListResponse } from "../models/exchange-rate.schema";

export async function getExchangeRates(): Promise<ExchangeRateResponse[]> {
  const result = await fetchWithAuth<ExchangeRateListResponse>(
    API_ENDPOINTS.exchangeRates.latest,
    { cache: "no-store" }
  );

  const parsed = ExchangeRateListResponseSchema.safeParse(result);

  if (!parsed.success) {
    throw new ResponseParseError();
  }

  return parsed.data.data;
}
