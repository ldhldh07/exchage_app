"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { getAuthToken } from "@/shared/lib/auth";
import {
  OrderQuoteApiResponseSchema,
  type OrderQuoteRequest,
  type OrderQuoteResponse,
} from "../models/schema";

interface GetOrderQuoteResult {
  success: boolean;
  data?: OrderQuoteResponse;
  error?: string;
}

export async function getOrderQuote(request: OrderQuoteRequest): Promise<GetOrderQuoteResult> {
  try {
    const authResult = await getAuthToken();
    if (!authResult.success) {
      return { success: false, error: authResult.error };
    }

    const params = new URLSearchParams({
      fromCurrency: request.fromCurrency,
      toCurrency: request.toCurrency,
      forexAmount: request.forexAmount.toString(),
    });

    const response = await fetch(`${API_ENDPOINTS.order.getQuote}?${params}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authResult.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { success: false, error: "견적 조회에 실패했습니다." };
    }

    const json = await response.json();
    const parsed = OrderQuoteApiResponseSchema.safeParse(json);

    if (!parsed.success) {
      return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
    }

    return { success: true, data: parsed.data.data };
  } catch {
    return { success: false, error: "네트워크 오류가 발생했습니다." };
  }
}
