import { cookies } from "next/headers";

interface GetAuthTokenResult {
  success: true;
  token: string;
}

interface GetAuthTokenError {
  success: false;
  error: string;
}

export async function getAuthToken(): Promise<GetAuthTokenResult | GetAuthTokenError> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return { success: false, error: "인증이 필요합니다." };
  }

  return { success: true, token };
}
