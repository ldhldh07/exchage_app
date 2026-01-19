"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { ResponseParseError } from "@/shared/lib";
import { OrderApiResponseSchema, type OrderRequest, type OrderApiResponse } from "../models/schema";

export async function postOrder(request: OrderRequest): Promise<void> {
  const result = await fetchWithAuth<OrderApiResponse>(API_ENDPOINTS.order.postOrder, {
    method: "POST",
    body: JSON.stringify(request),
  });

  const parsed = OrderApiResponseSchema.safeParse(result);

  if (!parsed.success) throw new ResponseParseError();
}
