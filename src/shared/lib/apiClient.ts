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
      window.location.href = ROUTES.login;
    }

    throw error;
  }

  return result.data;
}
