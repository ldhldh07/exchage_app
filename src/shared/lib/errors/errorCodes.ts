// API 에러 코드
export const API_ERROR_CODES = {
  BAD_REQUEST: "BAD_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  UNAUTHORIZED: "UNAUTHORIZED",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  MISSING_PARAMETER: "MISSING_PARAMETER",
} as const;

// 도메인 에러 코드
export const DOMAIN_ERROR_CODES = {
  WALLET_INSUFFICIENT_BALANCE: "WALLET_INSUFFICIENT_BALANCE",
  INVALID_DEPOSIT_AMOUNT: "INVALID_DEPOSIT_AMOUNT",
  INVALID_WITHDRAW_AMOUNT: "INVALID_WITHDRAW_AMOUNT",
  CURRENCY_MISMATCH: "CURRENCY_MISMATCH",
  INVALID_AMOUNT_SCALE: "INVALID_AMOUNT_SCALE",
  EXCHANGE_RATE_CURRENCY_MISMATCH: "EXCHANGE_RATE_CURRENCY_MISMATCH",
  EXCHANGE_RATE_MISMATCH: "EXCHANGE_RATE_MISMATCH",
  UNSUPPORTED_FOREX_CONVERSION_CURRENCY: "UNSUPPORTED_FOREX_CONVERSION_CURRENCY",
  INVALID_EXCHANGE_RATE_CURRENCY: "INVALID_EXCHANGE_RATE_CURRENCY",
  UNSUPPORTED_CURRENCY_FOR_KRW_CONVERSION: "UNSUPPORTED_CURRENCY_FOR_KRW_CONVERSION",
} as const;

// 전체 에러 코드
export const ERROR_CODES = {
  ...API_ERROR_CODES,
  ...DOMAIN_ERROR_CODES,
} as const;

// 타입 정의
export type ApiErrorCode = (typeof API_ERROR_CODES)[keyof typeof API_ERROR_CODES];
export type DomainErrorCode = (typeof DOMAIN_ERROR_CODES)[keyof typeof DOMAIN_ERROR_CODES];
export type ErrorCode = (typeof ERROR_CODES)[keyof typeof ERROR_CODES];

// 에러 메시지 매핑
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // API 에러
  BAD_REQUEST: "잘못된 요청입니다.",
  NOT_FOUND: "요청한 URL을 찾을 수 없어요.",
  UNAUTHORIZED: "로그인이 필요한 서비스입니다.",
  VALIDATION_ERROR: "요청 데이터가 이상해요.",
  MISSING_PARAMETER: "필수 요청 파라미터가 누락되었어요.",

  // 도메인 에러
  WALLET_INSUFFICIENT_BALANCE: "지갑의 잔액이 부족합니다.",
  INVALID_DEPOSIT_AMOUNT: "입금 금액이 유효하지 않습니다.",
  INVALID_WITHDRAW_AMOUNT: "출금 금액이 유효하지 않습니다.",
  CURRENCY_MISMATCH: "통화 타입이 일치하지 않습니다.",
  INVALID_AMOUNT_SCALE: "통화 정책에 맞지 않는 소수점 자릿수입니다.",
  EXCHANGE_RATE_CURRENCY_MISMATCH: "환율의 대상 통화가 일치하지 않습니다.",
  EXCHANGE_RATE_MISMATCH: "환율이 변동되었습니다. 다시 시도해주세요.",
  UNSUPPORTED_FOREX_CONVERSION_CURRENCY: "외화 간 직접 변환은 지원하지 않습니다.",
  INVALID_EXCHANGE_RATE_CURRENCY: "환율 정보의 통화는 KRW가 될 수 없습니다.",
  UNSUPPORTED_CURRENCY_FOR_KRW_CONVERSION: "원화 변환은 KRW 통화만 지원합니다.",
};

// 에러 메시지 가져오기 유틸
export const getErrorMessage = (code: string, fallback?: string): string => {
  return ERROR_MESSAGES[code as ErrorCode] || fallback || "알 수 없는 오류가 발생했습니다.";
};
