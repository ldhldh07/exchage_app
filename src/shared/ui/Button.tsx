import { ButtonHTMLAttributes } from "react";
import { LoadingSpinner } from "./LoadingSpinner";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style"> {
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  isLoading = false,
  fullWidth = false,
  type = "button",
  disabled,
  children,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      type={type}
      className={`${fullWidth ? "w-full" : "w-[496px]"} bg-cta cursor-pointer text-button leading-button font-bold text-white transition-colors hover:bg-[#111827] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center`}
      style={{ padding: "24px 10px", borderRadius: "12px" }}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </button>
  );
}
