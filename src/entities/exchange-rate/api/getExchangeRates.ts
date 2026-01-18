"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { getAuthToken } from "@/shared/lib/auth";
import { ExchangeRateListResponseSchema, type ExchangeRateResponse } from "../models/exchange-rate.schema";

interface GetExchangeRatesResult {
  success: boolean;
  data?: ExchangeRateResponse[];
  error?: string;
}

export async function getExchangeRates(): Promise<GetExchangeRatesResult> {
  try {
    const authResult = await getAuthToken();
    if (!authResult.success) {
      return { success: false, error: authResult.error };
    }

    const response = await fetch(API_ENDPOINTS.exchangeRates.latest, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authResult.token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.message || "환율 정보를 불러오는데 실패했습니다." };
    }

    const json = await response.json();
    const parsed = ExchangeRateListResponseSchema.safeParse(json);

    if (!parsed.success) {
      return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
    }

    return { success: true, data: parsed.data.data };
  } catch {
    return { success: false, error: "네트워크 오류가 발생했습니다." };
  }
}
