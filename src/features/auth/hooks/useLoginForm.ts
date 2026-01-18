"use client";

import { useRef, useActionState } from "react";
import { useForm, UseFormRegister, UseFormHandleSubmit } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginAction, type LoginState } from "../server/loginAction";
import { loginSchema, type LoginFormData } from "@/entities/auth";
import { useCsrfToken } from "@/shared/hooks";

interface UseLoginFormResult {
  formRef: React.RefObject<HTMLFormElement | null>;
  formAction: (payload: FormData) => void;
  register: UseFormRegister<LoginFormData>;
  handleSubmit: UseFormHandleSubmit<LoginFormData>;
  onSubmit: () => void;
  csrfToken: string | null;
  isPending: boolean;
  isDisabled: boolean;
  errorMessage: string | undefined;
}

export const useLoginForm = (): UseLoginFormResult => {
  const formRef = useRef<HTMLFormElement>(null);

  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, {});
  const { token: csrfToken, error: csrfError, isLoading: isCsrfLoading } = useCsrfToken();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const errorMessage = csrfError?.message ?? errors.email?.message ?? state.error;

  const isDisabled = isPending || isCsrfLoading;

  const onSubmit = () => formRef.current?.requestSubmit();

  return {
    formRef,
    formAction,
    register,
    handleSubmit,
    onSubmit,
    csrfToken,
    isPending,
    isDisabled,
    errorMessage,
  };
};
