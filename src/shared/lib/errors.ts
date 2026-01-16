import { ZodIssue } from "zod";

/**
 * Zod 스키마 검증 실패 시 발생하는 에러
 */
export class ValidationError extends Error {
  public readonly issues: ZodIssue[];

  constructor(message: string, issues: ZodIssue[]) {
    super(message);
    this.name = "ValidationError";
    this.issues = issues;
  }
}

/**
 * API 응답 에러
 */
export class ApiError extends Error {
  public readonly code: string;
  public readonly statusCode?: number;
  public readonly data?: unknown;

  constructor(message: string, code: string, statusCode?: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.statusCode = statusCode;
    this.data = data;
  }
}
