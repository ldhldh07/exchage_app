import { getAuthToken } from "./auth";
import { AppError, UnauthorizedError, NetworkError, ERROR_CODES } from "./errors";

const ERROR_CODE_VALUES = Object.values(ERROR_CODES);

/**
 * 네트워크 에러를 처리하는 fetch wrapper
 */
const safeFetch = (url: string, options?: RequestInit): Promise<Response> =>
  fetch(url, options).catch(() => {
    throw new NetworkError();
  });

/**
 * 인증 토큰을 가져오고 없으면 에러 throw
 */
const getTokenOrThrow = async (): Promise<string> => {
  const result = await getAuthToken();
  if (!result.success) {
    throw new UnauthorizedError(result.error, "NO_TOKEN");
  }
  return result.token;
};

/**
 * 응답을 파싱하고 에러면 throw
 */
const parseResponseOrThrow = async <T>(response: Response): Promise<T> => {
  const json = await response.json();

  if (!response.ok || (json.code && ERROR_CODE_VALUES.includes(json.code))) {
    throw AppError.fromCode(
      json.code || "UNKNOWN_ERROR",
      json.message || "요청에 실패했습니다.",
      response.status,
      json.data
    );
  }

  return json as T;
};

export const fetchWithAuth = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const token = await getTokenOrThrow();

  const response = await safeFetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  return parseResponseOrThrow<T>(response);
};
