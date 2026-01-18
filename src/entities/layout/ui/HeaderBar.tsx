import Link from "next/link";
import { WifiIcon } from "@/shared/ui";
import type { ReactNode } from "react";

export interface NavItem {
  href: string;
  label: string;
  isActive: boolean;
}

export interface HeaderBarProps {
  navItems: NavItem[];
  children?: ReactNode;
}

export function HeaderBar({ navItems, children }: Readonly<HeaderBarProps>) {
  return (
    <header className="flex items-center justify-between py-4 px-6 border-b border-gray-200 bg-white">
      <Link href="/" className="flex items-center gap-2">
        <WifiIcon className="w-6 h-6" />
        <span className="font-bold text-2xl text-black">Exchange app</span>
      </Link>

      <nav className="flex items-center gap-8">
        {navItems.map((item) => (
          <NavLink key={item.href} href={item.href} isActive={item.isActive}>
            {item.label}
          </NavLink>
        ))}
        {children}
      </nav>
    </header>
  );
}

interface NavLinkProps {
  href: string;
  isActive: boolean;
  children: ReactNode;
}

function NavLink({ href, isActive, children }: Readonly<NavLinkProps>) {
  return (
    <Link
      href={href}
      className={`text-xl font-bold transition-colors ${isActive ? "text-cta-pressed" : "text-[#8899AA] hover:text-cta"
        }`}
    >
      {children}
    </Link>
  );
}
