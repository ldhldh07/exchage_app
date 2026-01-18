export type Currency = "KRW" | "USD" | "JPY";

export interface WalletItem {
  id: number;
  currency: Currency;
  balance: number;
}

export interface WalletCardData {
  wallets: WalletItem[];
  totalKrwBalance: number;
}
