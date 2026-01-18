export const API_BASE_URL = "https://exchange-example.switchflow.biz";

export const API_ENDPOINTS = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
  },
  exchangeRates: {
    latest: `${API_BASE_URL}/exchange-rates/latest`,
  },
  wallet: {
    getWallets: `${API_BASE_URL}/wallets`,
    balance: (memberId: number) => `${API_BASE_URL}/wallet/${memberId}/balance`,
  },
  order: {
    getOrders: `${API_BASE_URL}/orders`,
    getQuote: `${API_BASE_URL}/orders/quote`,
    create: `${API_BASE_URL}/orders`,
  },
} as const;
