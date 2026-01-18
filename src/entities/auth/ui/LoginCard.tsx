import { WifiIcon } from "@/shared/ui/WifiIcon";
import { forwardRef, ReactNode } from "react";

interface LoginCardProps {
  children: ReactNode;
}

export function LoginCard({ children }: Readonly<LoginCardProps>) {
  return (
    <div className="w-full max-w-[560px] text-center">
      <div className="mb-6">
        <WifiIcon />
      </div>

      <h2 className="text-title leading-title font-bold text-brand-700 mb-2">반갑습니다.</h2>
      <p className="text-subtitle leading-subtitle font-medium text-brand-600 mb-8">
        로그인 정보를 입력해주세요.
      </p>

      {children}
    </div>
  );
}

interface LoginInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "className" | "style"
> {
  label: string;
  error?: string;
}

export const LoginInput = forwardRef<HTMLInputElement, Readonly<LoginInputProps>>(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div className="w-[496px] text-left">
        <label className="block text-[20px] leading-[1.33] font-medium text-brand-600 mb-[10px]">
          {label}
        </label>
        <input
          ref={ref}
          className="w-full h-[75px] border border-brand-700 bg-white text-[20px] leading-[1.33] font-semibold text-brand-600 outline-none transition-all placeholder:text-brand-600 focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/15 disabled:bg-gray-50 disabled:cursor-not-allowed"
          style={{ padding: "24px", borderRadius: "12px" }}
          {...inputProps}
        />
        {error && <span className="block text-xs text-red-500 mt-2">{error}</span>}
      </div>
    );
  },
);

LoginInput.displayName = "LoginInput";
