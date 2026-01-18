"use client";

import { useWallets, WalletCard, WalletCardSkeleton } from "@/entities/wallet";

export function WalletInfo() {
  const { data, isLoading } = useWallets();

  if (isLoading) {
    return <WalletCardSkeleton />;
  }

  if (!data?.success || !data.data) {
    return (
      <div className="flex flex-col min-h-[508px] bg-gray-000 border border-gray-300 rounded-xl py-6 px-8 items-center justify-center">
        <p className="text-red-500">{data?.error || "지갑 정보를 불러오는데 실패했습니다."}</p>
      </div>
    );
  }

  return <WalletCard data={data.data} />;
}
