"use client";

import { useLoginForm } from "../hooks/useLoginForm";
import { LoginCard, LoginInput } from "@/entities/auth";
import { Button } from "@/shared/ui";

export function LoginForm() {
  const {
    formRef,
    formAction,
    register,
    handleSubmit,
    onSubmit,
    csrfToken,
    isDisabled,
    errorMessage,
  } = useLoginForm();

  return (
    <LoginCard>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={handleSubmit(onSubmit)}
        className="w-[560px] flex flex-col items-start gap-[32px] rounded-[20px] border border-[#D0D6DB] bg-[#F7F8F9]"
        style={{ padding: "24px 32px" }}
      >
        <input type="hidden" name="csrfToken" value={csrfToken ?? ""} />
        <LoginInput
          {...register("email")}
          label="이메일 주소를 입력해주세요."
          type="email"
          placeholder="test@test.com"
          disabled={isDisabled}
          error={errorMessage}
        />
        <Button type="submit" isLoading={isDisabled} loadingText="로그인 중입니다.">
          로그인 하기
        </Button>
      </form>
    </LoginCard>
  );
}
