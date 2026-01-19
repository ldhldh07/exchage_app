import { z } from "zod";
import { CurrencySchema } from "@/shared/config";

export const ExchangeRateResponseSchema = z.object({
  exchangeRateId: z.number(),
  currency: CurrencySchema,
  rate: z.number(),
  changePercentage: z.number(),
  applyDateTime: z.string(),
});

export type ExchangeRateResponse = z.infer<typeof ExchangeRateResponseSchema>;

export const ExchangeRateListResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.array(ExchangeRateResponseSchema),
});

export type ExchangeRateListResponse = z.infer<typeof ExchangeRateListResponseSchema>;
