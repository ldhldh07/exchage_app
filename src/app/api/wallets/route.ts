import { API_ENDPOINTS } from "@/shared/config";
import { WalletApiResponseSchema } from "@/entities/wallet/models/wallet.schema";
import { fetchWithAuthAndValidate } from "../_lib/apiHandler";

export async function GET() {
  return fetchWithAuthAndValidate(API_ENDPOINTS.wallet.getWallets, WalletApiResponseSchema);
}
