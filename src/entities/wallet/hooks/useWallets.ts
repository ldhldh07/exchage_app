"use client";

import { useQuery } from "@tanstack/react-query";
import { getWallets } from "../api/getWallets";
import { mapWalletResponse } from "../lib/mapper";

export const walletKeys = {
  all: ["wallets"] as const,
  summary: () => [...walletKeys.all, "summary"] as const,
};

export const useWallets = () => {
  return useQuery({
    queryKey: walletKeys.summary(),
    queryFn: getWallets,
    staleTime: 1000 * 30, // 30초
    select: mapWalletResponse,
  });
};
