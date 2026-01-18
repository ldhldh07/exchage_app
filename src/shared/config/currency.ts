import { USFlag, JPFlag } from "@/shared/ui";
import type { ComponentType, SVGProps } from "react";

export type Currency = "KRW" | "USD" | "JPY";

export interface CurrencyInfo {
  code: Currency;
  name: string;        
  unit: string; 
  symbol: string;   
  flag: ComponentType<SVGProps<SVGSVGElement> & { size?: number }> | null;
}

export const CURRENCY_INFO: Record<Currency, CurrencyInfo> = {
  USD: {
    code: "USD",
    name: "미국",
    unit: "달러",
    symbol: "$",
    flag: USFlag,
  },
  JPY: {
    code: "JPY",
    name: "일본",
    unit: "엔",
    symbol: "¥",
    flag: JPFlag,
  },
  KRW: {
    code: "KRW",
    name: "대한민국",
    unit : "원",
    symbol: "₩",
    flag: null,
  },
};

// 환전 가능한 통화 목록 (KRW 제외)
export const EXCHANGEABLE_CURRENCIES: Currency[] = ["USD", "JPY"];

// 헬퍼 함수들
export const getCurrencyInfo = (currency: Currency): CurrencyInfo => {
  return CURRENCY_INFO[currency];
};

export const getCurrencyName = (currency: Currency): string => {
  return CURRENCY_INFO[currency].name;
};

export const getCurrencyUnit = (currency: Currency): string => {
  return CURRENCY_INFO[currency].unit;
};

export const getCurrencySymbol = (currency: Currency): string => {
  return CURRENCY_INFO[currency].symbol;
};

export const getCurrencyFlag = (currency: Currency) => {
  return CURRENCY_INFO[currency].flag;
};
