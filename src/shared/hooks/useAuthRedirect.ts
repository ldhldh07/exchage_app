"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config";
import { ERROR_CODES } from "@/shared/lib";

interface UseAuthRedirectParams {
  errorCode?: string;
}

export function useAuthRedirect({ errorCode }: UseAuthRedirectParams) {
  const router = useRouter();

  useEffect(() => {
    if (errorCode === ERROR_CODES.UNAUTHORIZED) {
      router.replace(ROUTES.login);
    }
  }, [errorCode, router]);
}
