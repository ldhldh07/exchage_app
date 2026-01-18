"use server";

import { postOrder, type OrderRequest } from "@/entities/order";

export interface CreateOrderState {
  success?: boolean;
  error?: string;
  errorCode?: string;
}

export async function createOrderAction(request: OrderRequest): Promise<CreateOrderState> {
  const result = await postOrder(request);

  if (!result.success) {
    return {
      success: false,
      error: result.error,
      errorCode: result.errorCode,
    };
  }

  return { success: true };
}
