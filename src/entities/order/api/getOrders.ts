"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { getAuthToken } from "@/shared/lib/auth";
import { OrderListApiResponseSchema, type OrderResponse } from "../models/schema";

interface GetOrdersResult {
  success: boolean;
  data?: OrderResponse[];
  error?: string;
}

export async function getOrders(): Promise<GetOrdersResult> {
  try {
    const authResult = await getAuthToken();
    if (!authResult.success) {
      return { success: false, error: authResult.error };
    }

    const response = await fetch(API_ENDPOINTS.order.getOrders, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authResult.token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return { success: false, error: "주문 내역을 불러오는데 실패했습니다." };
    }

    const json = await response.json();
    const parsed = OrderListApiResponseSchema.safeParse(json);

    if (!parsed.success) {
      return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
    }

    return { success: true, data: parsed.data.data };
  } catch {
    return { success: false, error: "네트워크 오류가 발생했습니다." };
  }
}
