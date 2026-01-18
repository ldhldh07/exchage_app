import { ButtonHTMLAttributes } from "react";

type LogoutButtonUIProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">;

export function LogoutButtonUI({ children, ...props }: Readonly<LogoutButtonUIProps>) {
  return (
    <button
      className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
