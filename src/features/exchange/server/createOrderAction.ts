"use server";

import { postOrder, type OrderRequest } from "@/entities/order";
import {
  getErrorMessage,
  getUnauthorizedMessage,
  type ErrorCode,
  type UnauthorizedReason,
  AppError,
  UnauthorizedError,
} from "@/shared/lib";

export interface CreateOrderState {
  success: boolean;
  error?: string;
  errorCode?: string;
  errorReason?: UnauthorizedReason;
}

export async function createOrderAction(request: OrderRequest): Promise<CreateOrderState> {
  try {
    await postOrder(request);
    return { success: true };
  } catch (error) {
    if (AppError.isUnauthorized(error)) {
      const unauthorizedError = error as UnauthorizedError;
      return {
        success: false,
        error: getUnauthorizedMessage(unauthorizedError.reason),
        errorCode: error.code,
        errorReason: unauthorizedError.reason,
      };
    }
    if (AppError.is(error)) {
      return {
        success: false,
        error: getErrorMessage(error.code as ErrorCode, error.message),
        errorCode: error.code,
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : "환전 주문에 실패했습니다.",
    };
  }
}
