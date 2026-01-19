"use client";

import { useWallets, WalletCard, WalletCardSkeleton } from "@/entities/wallet";

export function WalletInfo() {
  const { data, isLoading, error } = useWallets();

  if (isLoading) {
    return <WalletCardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="flex flex-col min-h-[508px] bg-gray-000 border border-gray-300 rounded-xl py-6 px-8 gap-8">
        <h2 className="text-h2 text-gray-800">내 지갑</h2>
        <div className="flex flex-1 items-center justify-center text-red-500">
          {error?.message || "지갑 정보를 불러오는데 실패했습니다."}
        </div>
      </div>
    );
  }

  return <WalletCard data={data} />;
}
