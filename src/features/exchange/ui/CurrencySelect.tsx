"use client";

import { useDropdown } from "@/shared/hooks";
import {
  type Currency,
  EXCHANGEABLE_CURRENCIES,
  getCurrencyInfo,
} from "@/shared/config";
import { useExchangeFormContext } from "../context/ExchangeFormContext";

export function CurrencySelect() {
  const { formState, setCurrency, isPending } = useExchangeFormContext();
  const { isOpen, dropdownRef, toggle, close } = useDropdown();

  const selectedInfo = getCurrencyInfo(formState.currency);
  const FlagComponent = selectedInfo.flag;

  const handleSelect = (currency: Currency) => {
    setCurrency(currency);
    close();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !isPending && toggle()}
        disabled={isPending}
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        {FlagComponent && <FlagComponent size={20} />}
        <span>{selectedInfo.name} {formState.currency}</span>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          {EXCHANGEABLE_CURRENCIES.map((currencyCode) => {
            const info = getCurrencyInfo(currencyCode);
            const OptionFlag = info.flag;
            return (
              <button
                key={currencyCode}
                type="button"
                onClick={() => handleSelect(currencyCode)}
                className={`w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-gray-50 transition-colors cursor-pointer ${currencyCode === formState.currency ? "bg-blue-50 text-blue-600" : "text-gray-900"
                  }`}
              >
                {OptionFlag && <OptionFlag size={20} />}
                <span className="font-medium">{info.name} {currencyCode}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
