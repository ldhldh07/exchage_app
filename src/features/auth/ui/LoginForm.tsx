"use client";

import { useSearchParams } from "next/navigation";
import { useLoginForm } from "../hooks/useLoginForm";
import { LoginCard, LoginInput } from "@/entities/auth";
import { Button } from "@/shared/ui";

export function LoginForm() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/";

  const { formAction, register, csrfToken, isPending, isDisabled, errorMessage } = useLoginForm();

  return (
    <LoginCard>
      <form
        action={formAction}
        className="w-[560px] flex flex-col items-start gap-[32px] rounded-[20px] border border-[#D0D6DB] bg-[#F7F8F9] py-6 px-8"
      >
        <input type="hidden" name="csrfToken" value={csrfToken ?? ""} />
        <input type="hidden" name="from" value={from} />
        <LoginInput
          {...register("email")}
          label="이메일 주소를 입력해주세요."
          type="email"
          placeholder="test@test.com"
          disabled={isDisabled}
          error={errorMessage}
        />
        <Button type="submit" disabled={isDisabled} isLoading={isPending}>
          로그인 하기
        </Button>
      </form>
    </LoginCard>
  );
}
