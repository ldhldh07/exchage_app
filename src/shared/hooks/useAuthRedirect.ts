"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config";
import { AppError } from "@/shared/lib";

interface UseAuthRedirectParams {
  error: Error | null;
}

export function useAuthRedirect({ error }: UseAuthRedirectParams) {
  const router = useRouter();

  useEffect(() => {
    if (AppError.isUnauthorized(error)) {
      router.replace(ROUTES.login);
    }
  }, [error, router]);
}
