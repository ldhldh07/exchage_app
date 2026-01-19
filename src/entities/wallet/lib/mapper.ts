import type { WalletSummaryResponse } from "../models/wallet.schema";
import type { WalletCardData } from "../models/wallet.type";

export const mapWalletResponse = (data: WalletSummaryResponse): WalletCardData => {
  return {
    wallets: data.wallets.map((wallet) => ({
      id: wallet.walletId,
      currency: wallet.currency,
      balance: wallet.balance,
    })),
    totalKrwBalance: data.totalKrwBalance,
  };
};
