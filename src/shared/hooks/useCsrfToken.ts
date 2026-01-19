"use client";

import { useState, useEffect } from "react";
import { ApiError, AppError } from "@/shared/lib";

interface UseCsrfTokenResult {
  token: string | null;
  error: ApiError | null;
  isLoading: boolean;
}

export const useCsrfToken = (): UseCsrfTokenResult => {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const loadCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf", {
          method: "GET",
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new ApiError(
            "보안 토큰을 불러오지 못했습니다.",
            "CSRF_TOKEN_FETCH_FAILED",
            response.status,
          );
        }
        const data = await response.json();
        setToken(data.csrfToken);
        setIsLoading(false);
      } catch (error) {
        if (controller.signal.aborted) return;

        const apiError = AppError.isApi(error)
          ? error
          : new ApiError("보안 토큰을 불러오지 못했습니다.", "CSRF_TOKEN_FETCH_FAILED");
        setError(apiError);
        setIsLoading(false);
      }
    };

    loadCsrfToken();

    return () => controller.abort();
  }, []);

  return { token, error, isLoading };
};
