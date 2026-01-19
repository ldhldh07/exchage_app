export const walletKeys = {
  all: ["wallets"] as const,
  summary: () => [...walletKeys.all, "summary"] as const,
};
