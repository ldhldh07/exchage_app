import { apiClient } from "@/shared/lib/apiClient";
import { API_ROUTES } from "@/shared/config";
import type { WalletSummaryResponse } from "../models/wallet.schema";

export const getWallets = () =>
  apiClient<WalletSummaryResponse>(API_ROUTES.wallets);
