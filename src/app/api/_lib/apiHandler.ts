import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { z } from "zod";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/lib/errors";

export type ApiRouteResponse<T> =
  | { success: true; data: T }
  | { success: false; errorCode: string; message: string };

type ApiSchema<T> = z.ZodType<{ code: string; message: string; data: T }>;

export async function fetchWithAuthAndValidate<T>(
  endpoint: string,
  schema: ApiSchema<T>,
  options?: RequestInit,
): Promise<NextResponse<ApiRouteResponse<T>>> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      {
        success: false,
        errorCode: ERROR_CODES.UNAUTHORIZED,
        message: ERROR_MESSAGES.UNAUTHORIZED,
      },
      { status: 401 },
    );
  }

  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
      cache: "no-store",
    });

    const rawData = await response.json();

    const isHttpError = !response.ok;
    const isApiError = rawData.code && rawData.code !== "OK";

    if (isHttpError || isApiError) {
      const isAuthError = response.status === 401 || rawData.code === ERROR_CODES.UNAUTHORIZED;
      if (isAuthError) {
        cookieStore.delete("accessToken");
        cookieStore.delete("memberId");
      }

      return NextResponse.json(
        {
          success: false,
          errorCode: rawData.code || ERROR_CODES.UNKNOWN_ERROR,
          message: rawData.message || "요청 실패",
        },
        { status: response.status },
      );
    }

    const parsed = schema.safeParse(rawData);

    if (!parsed.success) {
      console.error("API Response validation failed:", parsed.error.errors);
      return NextResponse.json(
        {
          success: false,
          errorCode: ERROR_CODES.RESPONSE_PARSE_ERROR,
          message: ERROR_MESSAGES.RESPONSE_PARSE_ERROR,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, data: parsed.data.data });
  } catch (error) {
    console.error("API request failed:", error);
    return NextResponse.json(
      {
        success: false,
        errorCode: ERROR_CODES.NETWORK_ERROR,
        message: ERROR_MESSAGES.NETWORK_ERROR,
      },
      { status: 500 },
    );
  }
}

export async function getAuthToken(): Promise<
  | { success: true; token: string; cookieStore: Awaited<ReturnType<typeof cookies>> }
  | { success: false; response: NextResponse }
> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          errorCode: ERROR_CODES.UNAUTHORIZED,
          message: ERROR_MESSAGES.UNAUTHORIZED,
        },
        { status: 401 },
      ),
    };
  }

  return { success: true, token, cookieStore };
}

export function clearAuthCookies(cookieStore: Awaited<ReturnType<typeof cookies>>): void {
  cookieStore.delete("accessToken");
  cookieStore.delete("memberId");
}
