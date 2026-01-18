"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import {
  OrderQuoteApiResponseSchema,
  type OrderQuoteRequest,
  type OrderQuoteResponse,
  type OrderQuoteApiResponse,
} from "../models/schema";

interface GetOrderQuoteResult {
  success: boolean;
  data?: OrderQuoteResponse;
  error?: string;
  errorCode?: string;
}

export async function getOrderQuote(request: OrderQuoteRequest): Promise<GetOrderQuoteResult> {
  const params = new URLSearchParams({
    fromCurrency: request.fromCurrency,
    toCurrency: request.toCurrency,
    forexAmount: request.forexAmount.toString(),
  });

  const result = await fetchWithAuth<OrderQuoteApiResponse>(
    `${API_ENDPOINTS.order.getQuote}?${params}`
  );

  if (!result.success) {
    return { ...result, error: result.error || "견적 조회에 실패했습니다." };
  }

  const parsed = OrderQuoteApiResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
  }

  return { success: true, data: parsed.data.data };
}
