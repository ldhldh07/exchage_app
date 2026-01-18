interface AmountInputProps {
  label: string;
  value: string;
  suffix: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onChange: (value: string) => void;
}

export function AmountInput({
  label,
  value,
  suffix,
  placeholder = "0",
  disabled,
  error,
  onChange,
}: Readonly<AmountInputProps>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const hasError = !!error;

  return (
    <div className="flex flex-col gap-1">
      <label className="text-label text-gray-500">{label}</label>
      <div
        className={`bg-white h-[75px] flex items-center gap-3 rounded-xl p-6 transition-colors ${
          hasError
            ? "border-2 border-red-500"
            : "border border-gray-700 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
        }`}
      >
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-right text-xl font-semibold text-gray-600 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <span className="text-gray-600 text-xl font-medium whitespace-nowrap">{suffix}</span>
      </div>
      <p className={`text-sm text-right h-5 ${hasError ? "text-red-500" : "invisible"}`}>
        {error || "placeholder"}
      </p>
    </div>
  );
}
