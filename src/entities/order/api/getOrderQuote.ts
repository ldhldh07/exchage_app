import { apiClient } from "@/shared/lib/apiClient";
import { API_ROUTES } from "@/shared/config";
import type { OrderQuoteRequest, OrderQuoteResponse } from "../models/schema";

export const getOrderQuote = (request: OrderQuoteRequest) => {
  const params = new URLSearchParams({
    fromCurrency: request.fromCurrency,
    toCurrency: request.toCurrency,
    forexAmount: request.forexAmount.toString(),
  });

  return apiClient<OrderQuoteResponse>(`${API_ROUTES.orderQuote}?${params}`);
};
