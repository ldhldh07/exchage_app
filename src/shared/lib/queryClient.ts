import { QueryClient } from "@tanstack/react-query";
import { AppError, ERROR_CODES } from "./errors";

export const queryClient = new QueryClient();

/**
 * useQuery의 retry 옵션에 사용하는 함수
 */
export const shouldRetryQuery = (failureCount: number, error: Error): boolean => {
  // 인증 에러면 리트라이 안 함
  if (AppError.hasCode(error, ERROR_CODES.UNAUTHORIZED)) return false;
  // 네트워크 에러면 3번까지 리트라이
  if (AppError.isNetwork(error)) return failureCount < 3;
  // 나머지는 리트라이 안 함
  return false;
};
