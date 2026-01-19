"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { ResponseParseError } from "@/shared/lib";
import {
  OrderQuoteApiResponseSchema,
  type OrderQuoteRequest,
  type OrderQuoteResponse,
  type OrderQuoteApiResponse,
} from "../models/schema";

export async function getOrderQuote(request: OrderQuoteRequest): Promise<OrderQuoteResponse> {
  const params = new URLSearchParams({
    fromCurrency: request.fromCurrency,
    toCurrency: request.toCurrency,
    forexAmount: request.forexAmount.toString(),
  });

  const result = await fetchWithAuth<OrderQuoteApiResponse>(
    `${API_ENDPOINTS.order.getQuote}?${params}`
  );

  const parsed = OrderQuoteApiResponseSchema.safeParse(result);

  if (!parsed.success) throw new ResponseParseError();

  return parsed.data.data;
}
