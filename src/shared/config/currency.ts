import { USFlag, JPFlag } from "@/shared/ui";
import type { Currency } from "@/entities/exchange-rate";
import type { ComponentType, SVGProps } from "react";

export interface CurrencyInfo {
  code: Currency;
  name: string;        
  shortName: string; 
  symbol: string;   
  flag: ComponentType<SVGProps<SVGSVGElement> & { size?: number }> | null;
  label: string;  
}

export const CURRENCY_INFO: Record<Currency, CurrencyInfo> = {
  USD: {
    code: "USD",
    name: "미국 달러",
    shortName: "달러",
    symbol: "$",
    flag: USFlag,
    label: "미국 USD",
  },
  JPY: {
    code: "JPY",
    name: "일본 엔화",
    shortName: "엔",
    symbol: "¥",
    flag: JPFlag,
    label: "일본 JPY",
  },
  KRW: {
    code: "KRW",
    name: "대한민국 원",
    shortName: "원",
    symbol: "₩",
    flag: null,
    label: "한국 KRW",
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

export const getCurrencyShortName = (currency: Currency): string => {
  return CURRENCY_INFO[currency].shortName;
};

export const getCurrencySymbol = (currency: Currency): string => {
  return CURRENCY_INFO[currency].symbol;
};

export const getCurrencyFlag = (currency: Currency) => {
  return CURRENCY_INFO[currency].flag;
};
