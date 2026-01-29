import { NextRequest, NextResponse } from "next/server";
import { API_ENDPOINTS } from "@/shared/config";
import { OrderQuoteApiResponseSchema } from "@/entities/order/models/schema";
import { ERROR_CODES, ERROR_MESSAGES } from "@/shared/lib/errors";
import { getAuthToken, clearAuthCookies } from "../../_lib/apiHandler";

export async function GET(request: NextRequest) {
  const auth = await getAuthToken();
  if (!auth.success) return auth.response;

  const { token, cookieStore } = auth;
  const searchParams = request.nextUrl.searchParams;

  const fromCurrency = searchParams.get("fromCurrency");
  const toCurrency = searchParams.get("toCurrency");
  const forexAmount = searchParams.get("forexAmount");

  if (!fromCurrency || !toCurrency || !forexAmount) {
    return NextResponse.json(
      {
        success: false,
        errorCode: ERROR_CODES.MISSING_PARAMETER,
        message: ERROR_MESSAGES.MISSING_PARAMETER,
      },
      { status: 400 },
    );
  }

  try {
    const params = new URLSearchParams({ fromCurrency, toCurrency, forexAmount });
    const response = await fetch(`${API_ENDPOINTS.order.getQuote}?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    const rawData = await response.json();

    const isHttpError = !response.ok;
    const isApiError = rawData.code && rawData.code !== "OK";

    if (isHttpError || isApiError) {
      const isAuthError = response.status === 401 || rawData.code === ERROR_CODES.UNAUTHORIZED;
      if (isAuthError) {
        clearAuthCookies(cookieStore);
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

    const parsed = OrderQuoteApiResponseSchema.safeParse(rawData);

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
