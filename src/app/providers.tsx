"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as JotaiProvider } from "jotai";
import { ReactNode } from "react";
import { queryClient } from "@/shared/lib";

interface ProvidersProps {
  readonly children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>{children}</JotaiProvider>
    </QueryClientProvider>
  );
}
