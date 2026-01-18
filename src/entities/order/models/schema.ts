import { z } from "zod";
import { CurrencySchema } from "@/entities/exchange-rate";

// 주문 요청
export const OrderRequestSchema = z.object({
  exchangeRateId: z.number(),
  fromCurrency: CurrencySchema,
  toCurrency: CurrencySchema,
  forexAmount: z.number().min(0.01),
});

export type OrderRequest = z.infer<typeof OrderRequestSchema>;

// 주문 응답
export const OrderResponseSchema = z.object({
  orderId: z.number(),
  fromCurrency: CurrencySchema,
  fromAmount: z.number(),
  toCurrency: CurrencySchema,
  toAmount: z.number(),
  appliedRate: z.number(),
  orderedAt: z.string(),
});

export type OrderResponse = z.infer<typeof OrderResponseSchema>;

export const OrderListApiResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.array(OrderResponseSchema),
});

export type OrderListApiResponse = z.infer<typeof OrderListApiResponseSchema>;

// 견적 요청
export const OrderQuoteRequestSchema = z.object({
  fromCurrency: CurrencySchema,
  toCurrency: CurrencySchema,
  forexAmount: z.number().min(0.01),
});

export type OrderQuoteRequest = z.infer<typeof OrderQuoteRequestSchema>;

// 견적 응답
export const OrderQuoteResponseSchema = z.object({
  krwAmount: z.number(),
  appliedRate: z.number(),
});

export type OrderQuoteResponse = z.infer<typeof OrderQuoteResponseSchema>;

export const OrderQuoteApiResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: OrderQuoteResponseSchema,
});

export type OrderQuoteApiResponse = z.infer<typeof OrderQuoteApiResponseSchema>;

// 주문 실행 응답
export const OrderApiResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.unknown().optional(),
});

export type OrderApiResponse = z.infer<typeof OrderApiResponseSchema>;
