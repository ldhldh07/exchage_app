import { ButtonHTMLAttributes } from "react";

type LogoutButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "style">;

export function LogoutButton({ children, ...props }: Readonly<LogoutButtonProps>) {
  return (
    <button
      className="px-3 py-2 text-xl font-semibold text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors"
      {...props}
    >
      {children}
    </button>
  );
}
