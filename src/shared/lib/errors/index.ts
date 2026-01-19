// Classes
export {
  BaseError,
  ApiError,
  UnauthorizedError,
  NotFoundError,
  BadRequestError,
  DomainError,
  InsufficientBalanceError,
  ExchangeRateMismatchError,
  NetworkError,
  TimeoutError,
  ServiceUnavailableError,
  ValidationError,
  ResponseParseError,
} from "./errors";

// Namespace
export { AppError } from "./errors";

// Error Codes
export {
  API_ERROR_CODES,
  NETWORK_ERROR_CODES,
  DOMAIN_ERROR_CODES,
  ERROR_CODES,
  ERROR_MESSAGES,
  UNAUTHORIZED_REASON_MESSAGES,
  getErrorMessage,
  getUnauthorizedMessage,
  type ApiErrorCode,
  type NetworkErrorCode,
  type DomainErrorCode,
  type ErrorCode,
  type UnauthorizedReason,
} from "./errorCodes";
