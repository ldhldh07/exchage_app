"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { ExchangeRateListResponseSchema, type ExchangeRateResponse, type ExchangeRateListResponse } from "../models/exchange-rate.schema";

interface GetExchangeRatesResult {
  success: boolean;
  data?: ExchangeRateResponse[];
  error?: string;
  errorCode?: string;
}

export async function getExchangeRates(): Promise<GetExchangeRatesResult> {
  const result = await fetchWithAuth<ExchangeRateListResponse>(
    API_ENDPOINTS.exchangeRates.latest,
    { cache: "no-store" }
  );

  if (!result.success) {
    return { ...result, error: result.error || "환율 정보를 불러오는데 실패했습니다." };
  }

  const parsed = ExchangeRateListResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
  }

  return { success: true, data: parsed.data.data };
}
