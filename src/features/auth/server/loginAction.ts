"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { postLogin } from "@/entities/auth";
import { ROUTES } from "@/shared/config";
import { validateLoginForm } from "../lib/validateLoginForm";

export interface LoginState {
  error?: string;
  success?: boolean;
}

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const cookieStore = await cookies();
  const csrfCookie = cookieStore.get("csrfToken")?.value;
  const csrfFromForm = formData.get("csrfToken");

  if (!csrfCookie || !csrfFromForm || csrfCookie !== csrfFromForm) {
    return { error: "잘못된 요청입니다. 다시 시도해주세요." };
  }

  const validated = validateLoginForm(formData);
  if (!validated.success) {
    return { error: validated.error.errors[0].message };
  }

  const loginResult = await postLogin(validated.data);
  if (!loginResult.success) {
    return { error: loginResult.error };
  }

  cookieStore.set("accessToken", loginResult.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set("memberId", String(loginResult.data.memberId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.delete("csrfToken");

  const from = (formData.get("from") as string) || ROUTES.home;
  redirect(from);
}
