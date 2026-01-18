import { formatBalance } from "@/shared/lib";
import { getCurrencySymbol } from "@/shared/config";
import { Skeleton } from "@/shared/ui";
import type { WalletItem, WalletCardData } from "../models/wallet.type";

interface WalletCardProps {
  data: WalletCardData;
}

export function WalletCard({ data }: Readonly<WalletCardProps>) {
  return (
    <div className="flex flex-col min-h-[508px] bg-gray-000 border border-gray-300 rounded-xl py-6 px-8 gap-8">
      <h2 className="text-h2 text-gray-800">내 지갑</h2>

      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col flex-1">
          {data.wallets.map((wallet) => (
            <WalletRow key={wallet.id} wallet={wallet} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="border-t border-gray-300" />
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-[20px] font-medium">총 보유 자산</span>
            <span className="text-blue-500 font-bold text-[20px]">
              ₩ {data.totalKrwBalance.toLocaleString("ko-KR")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface WalletRowProps {
  wallet: WalletItem;
}

function WalletRow({ wallet }: Readonly<WalletRowProps>) {
  const symbol = getCurrencySymbol(wallet.currency);

  return (
    <div className="flex items-center justify-between gap-3 text-gray-600 text-[20px]">
      <span className="font-medium">{wallet.currency}</span>
      <span className="font-semibold">
        {symbol} {formatBalance(wallet.balance, wallet.currency === "KRW")}
      </span>
    </div>
  );
}

export function WalletCardSkeleton() {
  return (
    <div className="flex flex-col min-h-[508px] bg-gray-000 border border-gray-300 rounded-xl py-6 px-8 gap-8">
      <Skeleton className="h-8 w-24" />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col flex-1 gap-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-32" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="border-t border-gray-300" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}