"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config";
import { AppError, ERROR_CODES } from "@/shared/lib";

interface UseAuthRedirectParams {
  error: Error | null;
}

export function useAuthRedirect({ error }: UseAuthRedirectParams) {
  const router = useRouter();

  useEffect(() => {
    if (AppError.hasCode(error, ERROR_CODES.UNAUTHORIZED)) {
      router.replace(ROUTES.login);
    }
  }, [error, router]);
}
