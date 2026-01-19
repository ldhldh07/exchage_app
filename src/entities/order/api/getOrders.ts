"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { ResponseParseError } from "@/shared/lib";
import { OrderListApiResponseSchema, type OrderResponse, type OrderListApiResponse } from "../models/schema";

export async function getOrders(): Promise<OrderResponse[]> {
  const result = await fetchWithAuth<OrderListApiResponse>(API_ENDPOINTS.order.getOrders);

  const parsed = OrderListApiResponseSchema.safeParse(result);

  if (!parsed.success) throw new ResponseParseError();

  return parsed.data.data;
}
