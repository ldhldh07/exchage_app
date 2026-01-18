"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { OrderListApiResponseSchema, type OrderResponse, type OrderListApiResponse } from "../models/schema";

interface GetOrdersResult {
  success: boolean;
  data?: OrderResponse[];
  error?: string;
  errorCode?: string;
}

export async function getOrders(): Promise<GetOrdersResult> {
  const result = await fetchWithAuth<OrderListApiResponse>(API_ENDPOINTS.order.getOrders);

  if (!result.success) {
    return { ...result, error: result.error || "주문 내역을 불러오는데 실패했습니다." };
  }

  const parsed = OrderListApiResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
  }

  return { success: true, data: parsed.data.data };
}
