import { forwardRef } from "react";
import { ChevronDownIcon } from "@/shared/ui";
import { CURRENCY_INFO, EXCHANGEABLE_CURRENCIES, type Currency } from "@/shared/config";


interface CurrencySelectProps {
  selectedCurrency: Currency;
  isOpen: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onSelect: (currency: Currency) => void;
}

export const CurrencySelect = forwardRef<HTMLDivElement, CurrencySelectProps>(
  function CurrencySelect(
    { selectedCurrency, isOpen, disabled, onToggle, onSelect },
    ref
  ) {
    const currentInfo = CURRENCY_INFO[selectedCurrency];
    const FlagComponent = currentInfo.flag;

    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={onToggle}
          disabled={disabled}
          className="flex items-center gap-2 text-gray-900 cursor-pointer disabled:cursor-not-allowed"
        >
          {FlagComponent && <FlagComponent size={24} />}
          <div className="flex gap-1">
            <span className="text-h3 text-cta-pressed">{currentInfo.code} 환전하기</span>
            <ChevronDownIcon
              size={28}
              className={`text-cta-pressed transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-[10px] z-10 py-2">
            {EXCHANGEABLE_CURRENCIES.map((code) => (
              <CurrencySelectItem
                key={code}
                currency={code}
                isSelected={code === selectedCurrency}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

interface CurrencySelectItemProps {
  currency: Currency;
  isSelected: boolean;
  onSelect: (currency: Currency) => void;
}

function CurrencySelectItem({ currency, isSelected, onSelect }: Readonly<CurrencySelectItemProps>) {
  const { name, code, flag: FlagComponent } = CURRENCY_INFO[currency];

  return (
    <button
      type="button"
      onClick={() => onSelect(currency)}
      className={`w-[140px] flex items-center gap-3 px-4 py-2 hover:bg-cta-pressed transition-colors cursor-pointer ${isSelected ? "bg-cta-second-pressed" : ""
        }`}
    >
      {FlagComponent && <FlagComponent size={20} />}
      <span className="text-p1">{name} {code}</span>
    </button>
  );
}
