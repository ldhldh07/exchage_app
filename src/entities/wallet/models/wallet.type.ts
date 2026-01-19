import type { Currency } from "@/shared/config";

export interface WalletItem {
  id: number;
  currency: Currency;
  balance: number;
}

export interface WalletCardData {
  wallets: WalletItem[];
  totalKrwBalance: number;
}
