import type { WalletSummaryResponse } from "../models/wallet.schema";
import type { WalletCardData } from "../models/wallet.type";

interface MapWalletResult {
  success: boolean;
  data?: WalletCardData;
  error?: string;
  errorCode?: string;
}

interface GetWalletsResult {
  success: boolean;
  data?: WalletSummaryResponse;
  error?: string;
  errorCode?: string;
}

export const mapWalletResponse = (result: GetWalletsResult): MapWalletResult => {
  if (!result.success || !result.data) {
    return { success: false, error: result.error, errorCode: result.errorCode };
  }

  return {
    success: true,
    data: {
      wallets: result.data.wallets.map((wallet) => ({
        id: wallet.walletId,
        currency: wallet.currency,
        balance: wallet.balance,
      })),
      totalKrwBalance: result.data.totalKrwBalance,
    },
  };
};
