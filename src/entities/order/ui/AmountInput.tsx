interface AmountInputProps {
  label: string;
  value: string;
  suffix: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

export function AmountInput({
  label,
  value,
  suffix,
  placeholder = "0",
  disabled,
  onChange,
}: Readonly<AmountInputProps>) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-label text-gray-500">{label}</label>
      <div className="bg-white h-[75px] flex items-center gap-3 border border-gray-700 rounded-xl p-6 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
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
    </div>
  );
}
