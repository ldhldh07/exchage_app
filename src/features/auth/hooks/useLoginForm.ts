"use client";

import { useActionState } from "react";
import { useForm, UseFormRegister } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction, type LoginState } from "../server/loginAction";
import { loginSchema, type LoginFormData } from "@/entities/auth";
import { useCsrfToken } from "@/shared/hooks";

interface UseLoginFormResult {
  formAction: (payload: FormData) => void;
  register: UseFormRegister<LoginFormData>;
  csrfToken: string | null;
  isPending: boolean;
  isDisabled: boolean;
  errorMessage: string | undefined;
}

export const useLoginForm = (): UseLoginFormResult => {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, {});
  const { token: csrfToken, error: csrfError, isLoading: isCsrfLoading } = useCsrfToken();

  const {
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const errorMessage = csrfError?.message ?? errors.email?.message ?? state.error;

  const isDisabled = isPending || isCsrfLoading;

  return {
    formAction,
    register,
    csrfToken,
    isPending,
    isDisabled,
    errorMessage,
  };
};
