import { ButtonHTMLAttributes } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  isLoading?: boolean;
}

export function Button({
  isLoading = false,
  type = "button",
  disabled,
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      className="w-[496px] bg-cta text-button leading-button font-bold text-white transition-colors hover:bg-[#111827] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
      style={{ padding: "24px 10px", borderRadius: "12px" }}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}
