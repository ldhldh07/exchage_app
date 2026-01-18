import { z } from "zod";

export const CurrencySchema = z.enum(["KRW", "USD", "JPY"]);
export type Currency = z.infer<typeof CurrencySchema>;

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
