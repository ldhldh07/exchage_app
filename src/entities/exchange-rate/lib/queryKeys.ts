export const exchangeRateKeys = {
  all: ["exchange-rates"] as const,
  latest: () => [...exchangeRateKeys.all, "latest"] as const,
};
