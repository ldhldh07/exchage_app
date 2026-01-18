"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type ParamValidator<T> = (value: string | null) => T | null;

interface UseUrlParamOptions<T> {
  defaultValue: T;
  validate?: ParamValidator<T>;
}

export function useUrlParam<T extends string>(
  key: string,
  options: UseUrlParamOptions<T>
): [T, (value: T) => void] {
  const { defaultValue, validate } = options;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const rawValue = searchParams.get(key);
  
  const value: T = validate
    ? (validate(rawValue) ?? defaultValue)
    : (rawValue as T) ?? defaultValue;

  const setValue = useCallback(
    (newValue: T) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, newValue);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname, key]
  );

  return [value, setValue];
}
