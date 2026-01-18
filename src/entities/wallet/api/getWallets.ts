"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { WalletApiResponseSchema, type WalletSummaryResponse, type WalletApiResponse } from "../models/wallet.schema";

interface GetWalletsResult {
  success: boolean;
  data?: WalletSummaryResponse;
  error?: string;
  errorCode?: string;
}

export async function getWallets(): Promise<GetWalletsResult> {
  const result = await fetchWithAuth<WalletApiResponse>(API_ENDPOINTS.wallet.getWallets);

  if (!result.success) {
    return { ...result, error: result.error || "지갑 정보를 불러오는데 실패했습니다." };
  }

  const parsed = WalletApiResponseSchema.safeParse(result.data);

  if (!parsed.success) {
    return { success: false, error: "응답 데이터 형식이 올바르지 않습니다." };
  }

  return { success: true, data: parsed.data.data };
}
