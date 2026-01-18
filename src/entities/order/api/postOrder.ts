"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { getAuthToken } from "@/shared/lib/auth";
import { ERROR_CODES, getErrorMessage, type ErrorCode } from "@/shared/lib";
import { OrderApiResponseSchema, type OrderRequest } from "../models/schema";

interface PostOrderResult {
  success: boolean;
  error?: string;
  errorCode?: ErrorCode;
}

export async function postOrder(request: OrderRequest): Promise<PostOrderResult> {
  try {
    const authResult = await getAuthToken();
    if (!authResult.success) {
      return { success: false, error: authResult.error };
    }

    const response = await fetch(API_ENDPOINTS.order.create, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authResult.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    const json = await response.json();

    if (!response.ok) {
      const errorCode = json.code as ErrorCode;
      return {
        success: false,
        error: getErrorMessage(errorCode, json.message || "환전 주문에 실패했습니다."),
        errorCode,
      };
    }

    const parsed = OrderApiResponseSchema.safeParse(json);

    if (!parsed.success) {
      return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
    }

    return { success: true };
  } catch {
    return { success: false, error: "네트워크 오류가 발생했습니다." };
  }
}
