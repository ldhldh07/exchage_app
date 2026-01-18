"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { getErrorMessage, type ErrorCode } from "@/shared/lib";
import { OrderApiResponseSchema, type OrderRequest, type OrderApiResponse } from "../models/schema";

interface PostOrderResult {
  success: boolean;
  error?: string;
  errorCode?: string;
}

export async function postOrder(request: OrderRequest): Promise<PostOrderResult> {
  const result = await fetchWithAuth<OrderApiResponse>(API_ENDPOINTS.order.postOrder, {
    method: "POST",
    body: JSON.stringify(request),
  });

  if (!result.success) {
    return {
      ...result,
      error: getErrorMessage(result.errorCode as ErrorCode, result.error || "환전 주문에 실패했습니다."),
    };
  }

  const parsed = OrderApiResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
  }

  return { success: true };
}
