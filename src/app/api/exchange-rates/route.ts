import { API_ENDPOINTS } from "@/shared/config";
import { ExchangeRateListResponseSchema } from "@/entities/exchange-rate/models/exchange-rate.schema";
import { fetchWithAuthAndValidate } from "../_lib/apiHandler";

export async function GET() {
  return fetchWithAuthAndValidate(API_ENDPOINTS.exchangeRates.latest, ExchangeRateListResponseSchema);
}
