import type { ZodIssue } from "zod";
import { DOMAIN_ERROR_CODES, ERROR_CODES, type UnauthorizedReason } from "./errorCodes";

const DOMAIN_ERROR_CODE_VALUES = Object.values(DOMAIN_ERROR_CODES);
export class BaseError extends Error {
  readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
  }
}

// ============================================
// API Errors
// ============================================

export class ApiError extends BaseError {
  readonly statusCode?: number;
  readonly data?: unknown;

  constructor(message: string, code: string, statusCode?: number, data?: unknown) {
    super(message, code);
    this.statusCode = statusCode;
    this.data = data;
  }
}

export { type UnauthorizedReason } from "./errorCodes";

export class UnauthorizedError extends ApiError {
  readonly reason: UnauthorizedReason;

  constructor(message = "로그인이 필요한 서비스입니다.", reason: UnauthorizedReason = "TOKEN_INVALID") {
    super(message, "UNAUTHORIZED", 401);
    this.reason = reason;
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "요청한 URL을 찾을 수 없어요.") {
    super(message, "NOT_FOUND", 404);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "잘못된 요청입니다.", data?: unknown) {
    super(message, "BAD_REQUEST", 400, data);
  }
}

// ============================================
// Domain Errors
// ============================================

export class DomainError extends BaseError {
  constructor(message: string, code: string) {
    super(message, code);
  }
}

export class InsufficientBalanceError extends DomainError {
  constructor(message = "지갑의 잔액이 부족합니다.") {
    super(message, "WALLET_INSUFFICIENT_BALANCE");
  }
}

export class ExchangeRateMismatchError extends DomainError {
  constructor(message = "환율이 변동되었습니다. 다시 시도해주세요.") {
    super(message, "EXCHANGE_RATE_MISMATCH");
  }
}

// ============================================
// Network Errors
// ============================================

export class NetworkError extends BaseError {
  constructor(message = "네트워크 오류가 발생했습니다.", code = "NETWORK_ERROR") {
    super(message, code);
  }
}

export class TimeoutError extends NetworkError {
  constructor(message = "요청 시간이 초과되었습니다.") {
    super(message, "TIMEOUT");
  }
}

export class ServiceUnavailableError extends NetworkError {
  constructor(message = "서비스를 일시적으로 사용할 수 없습니다.") {
    super(message, "SERVICE_UNAVAILABLE");
  }
}

// ============================================
// Client Errors
// ============================================

export class ValidationError extends Error {
  readonly issues: ZodIssue[];

  constructor(message: string, issues: ZodIssue[]) {
    super(message);
    this.name = "ValidationError";
    this.issues = issues;
  }
}

export class ResponseParseError extends BaseError {
  constructor(message = "응답 데이터 형식이 올바르지 않습니다.") {
    super(message, "RESPONSE_PARSE_ERROR");
  }
}

export const AppError = {
  // Classes
  Base: BaseError,
  Api: ApiError,
  Unauthorized: UnauthorizedError,
  NotFound: NotFoundError,
  BadRequest: BadRequestError,
  Domain: DomainError,
  InsufficientBalance: InsufficientBalanceError,
  ExchangeRateMismatch: ExchangeRateMismatchError,
  Network: NetworkError,
  Timeout: TimeoutError,
  ServiceUnavailable: ServiceUnavailableError,
  ResponseParse: ResponseParseError,

  // Type Guards
  is: (error: unknown): error is BaseError =>
    error instanceof BaseError ||
    (error instanceof Error && error.name === "BaseError"),
  isApi: (error: unknown): error is ApiError =>
    error instanceof ApiError ||
    (error instanceof Error && error.name === "ApiError"),
  isDomain: (error: unknown): error is DomainError =>
    error instanceof DomainError ||
    (error instanceof Error && error.name === "DomainError"),
  isNetwork: (error: unknown): error is NetworkError =>
    error instanceof NetworkError ||
    (error instanceof Error &&
      ["NetworkError", "TimeoutError", "ServiceUnavailableError"].includes(error.name)),
  isUnauthorized: (error: unknown): error is UnauthorizedError =>
    error instanceof UnauthorizedError ||
    (error instanceof Error && error.name === "UnauthorizedError"),
  isInsufficientBalance: (error: unknown): error is InsufficientBalanceError =>
    error instanceof InsufficientBalanceError ||
    (error instanceof Error && error.name === "InsufficientBalanceError"),
  isExchangeRateMismatch: (error: unknown): error is ExchangeRateMismatchError =>
    error instanceof ExchangeRateMismatchError ||
    (error instanceof Error && error.name === "ExchangeRateMismatchError"),
  isResponseParse: (error: unknown): error is ResponseParseError =>
    error instanceof ResponseParseError ||
    (error instanceof Error && error.name === "ResponseParseError"),

  hasCode: (error: unknown, code: string): error is BaseError =>
    (error instanceof BaseError && error.code === code) ||
    (error instanceof Error && error.name.includes(code)),

  fromCode: (
    code: string,
    message: string,
    statusCode?: number,
    data?: unknown
  ): Error => {
    // API 에러
    switch (code) {
      case ERROR_CODES.UNAUTHORIZED:
        return new UnauthorizedError(message, "TOKEN_EXPIRED");
      case ERROR_CODES.VALIDATION_ERROR:
      case ERROR_CODES.MISSING_PARAMETER:
      case ERROR_CODES.BAD_REQUEST:
        return new BadRequestError(message, data);
      case ERROR_CODES.NOT_FOUND:
        return new NotFoundError(message);
    }

    // 도메인 에러
    if (DOMAIN_ERROR_CODE_VALUES.includes(code as (typeof DOMAIN_ERROR_CODE_VALUES)[number])) {
      switch (code) {
        case DOMAIN_ERROR_CODES.WALLET_INSUFFICIENT_BALANCE:
          return new InsufficientBalanceError(message);
        case DOMAIN_ERROR_CODES.EXCHANGE_RATE_MISMATCH:
          return new ExchangeRateMismatchError(message);
        default:
          return new DomainError(message, code);
      }
    }

    // 기본 API 에러
    return new ApiError(message, code, statusCode, data);
  },
} as const;
