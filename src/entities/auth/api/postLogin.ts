import { API_ENDPOINTS } from "@/shared/config";
import type { LoginFormData } from "../models/auth.schema";

export interface LoginResponse {
  memberId: number;
  token: string;
}

export interface PostLoginSuccess {
  success: true;
  data: LoginResponse;
}

export interface PostLoginError {
  success: false;
  error: string;
}

export async function postLogin(
  formData: LoginFormData,
): Promise<PostLoginSuccess | PostLoginError> {
  const params = new URLSearchParams();
  params.append("email", formData.email);

  const response = await fetch(API_ENDPOINTS.auth.login, {
    method: "POST",
    body: params,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    return {
      success: false,
      error: errorData.message ?? "로그인에 실패했습니다.",
    };
  }

  const data = await response.json();

  return {
    success: true,
    data: {
      memberId: data.data.memberId,
      token: data.data.token,
    },
  };
}
