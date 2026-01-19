"use server";

import { API_ENDPOINTS } from "@/shared/config";
import { fetchWithAuth } from "@/shared/lib/fetchWithAuth";
import { ResponseParseError } from "@/shared/lib";
import { WalletApiResponseSchema, type WalletSummaryResponse, type WalletApiResponse } from "../models/wallet.schema";

export async function getWallets(): Promise<WalletSummaryResponse> {
  const result = await fetchWithAuth<WalletApiResponse>(API_ENDPOINTS.wallet.getWallets);

  const parsed = WalletApiResponseSchema.safeParse(result);

  if (!parsed.success) throw new ResponseParseError();

  return parsed.data.data;
}
