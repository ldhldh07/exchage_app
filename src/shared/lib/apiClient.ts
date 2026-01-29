import { ROUTES } from "@/shared/config";
import { AppError } from "./errors";

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; errorCode: string; message: string };

export async function apiClient<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  const result: ApiResponse<T> = await response.json();

  if (!result.success) {
    const error = AppError.fromCode(result.errorCode, result.message, response.status);

    if (AppError.isUnauthorized(error)) {
      const from = window.location.pathname + window.location.search;
      window.location.href = `${ROUTES.login}?from=${encodeURIComponent(from)}`;
    }

    throw error;
  }

  return result.data;
}

export const API_ROUTES = {
  exchangeRates: "/api/exchange-rates",
  wallets: "/api/wallets",
  orders: "/api/orders",
  orderQuote: "/api/orders/quote",
} as const;
