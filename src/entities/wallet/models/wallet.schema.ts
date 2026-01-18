import { z } from "zod";
import { CurrencySchema } from "@/entities/exchange-rate";

export const WalletResponseSchema = z.object({
  walletId: z.number(),
  currency: CurrencySchema,
  balance: z.number(),
});

export type WalletResponse = z.infer<typeof WalletResponseSchema>;

export const WalletSummaryResponseSchema = z.object({
  totalKrwBalance: z.number(),
  wallets: z.array(WalletResponseSchema),
});

export type WalletSummaryResponse = z.infer<typeof WalletSummaryResponseSchema>;

export const WalletApiResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: WalletSummaryResponseSchema,
});

export type WalletApiResponse = z.infer<typeof WalletApiResponseSchema>;
