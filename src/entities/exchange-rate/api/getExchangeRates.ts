import { apiClient } from "@/shared/lib/apiClient";
import { API_ROUTES } from "@/shared/config";
import type { ExchangeRateResponse } from "../models/exchange-rate.schema";

export const getExchangeRates = () =>
  apiClient<ExchangeRateResponse[]>(API_ROUTES.exchangeRates);
