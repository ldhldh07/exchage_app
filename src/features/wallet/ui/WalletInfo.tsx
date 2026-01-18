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

  return <WalletCard data={data.data} />;
}
