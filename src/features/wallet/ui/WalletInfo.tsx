"use client";

import { useWallets, WalletCard } from "@/entities/wallet";
import { Loader } from "@/shared/ui";

export function WalletInfo() {
  const { data, isLoading } = useWallets();

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.success || !data.data) {
    return (
      <div className="text-center py-8 text-red-500">
        {data?.error || "지갑 정보를 불러오는데 실패했습니다."}
      </div>
    );
  }

  const walletCardData = {
    wallets: data.data.wallets.map((wallet) => ({
      id: wallet.walletId,
      currency: wallet.currency,
      balance: wallet.balance,
    })),
    totalKrwBalance: data.data.totalKrwBalance,
  };

  return <WalletCard data={walletCardData} />;
}
