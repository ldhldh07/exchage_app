import { getAuthToken } from "./auth";
import { ERROR_CODES } from "./errors";

interface FetchWithAuthSuccess<T> {
  success: true;
  data: T;
}

interface FetchWithAuthError {
  success: false;
  error: string;
  errorCode?: string;
}

type FetchWithAuthResult<T> = FetchWithAuthSuccess<T> | FetchWithAuthError;

const ERROR_CODE_VALUES = Object.values(ERROR_CODES);

export async function fetchWithAuth<T>(
  url: string,
  options?: RequestInit
): Promise<FetchWithAuthResult<T>> {
  try {
    const authResult = await getAuthToken();
    if (!authResult.success) {
      return { success: false, error: authResult.error, errorCode: "UNAUTHORIZED" };
    }

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${authResult.token}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const json = await response.json();

    if (!response.ok || (json.code && ERROR_CODE_VALUES.includes(json.code))) {
      return {
        success: false,
        error: json.message || "요청에 실패했습니다.",
        errorCode: json.code,
      };
    }

    return { success: true, data: json as T };
  } catch {
    return { success: false, error: "네트워크 오류가 발생했습니다." };
  }
}
