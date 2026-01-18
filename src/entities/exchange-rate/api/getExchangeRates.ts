"use server";

import { cookies } from "next/headers";
import { ExchangeRateListResponseSchema, type ExchangeRateResponse } from "../models/schema";

const API_BASE_URL = "https://exchange-example.switchflow.biz";

interface GetExchangeRatesResult {
  success: boolean;
  data?: ExchangeRateResponse[];
  error?: string;
}

export async function getExchangeRates(): Promise<GetExchangeRatesResult> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
      return { success: false, error: "인증이 필요합니다." };
    }

    const response = await fetch(`${API_BASE_URL}/exchange-rates/latest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { success: false, error: "환율 정보를 불러오는데 실패했습니다." };
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
