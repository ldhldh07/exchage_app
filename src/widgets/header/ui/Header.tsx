"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WifiIcon } from "@/shared/ui";
import { ROUTES } from "@/shared/config";
import { LogoutButton } from "@/features/auth";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: ROUTES.home, label: "환전 하기" },
    { href: ROUTES.history, label: "환전 내역" },
  ];

  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-2">
        <WifiIcon className="w-6 h-6" />
        <span className="font-semibold text-gray-800">Exchange app</span>
      </div>

      <nav className="flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm font-medium transition-colors ${
              pathname === item.href
                ? "text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {item.label}
          </Link>
        ))}

        <LogoutButton />
      </nav>
    </header>
  );
}
