"use client";

import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/config";
import { HeaderBar } from "@/entities/layout";
import { LogoutButtonContainer } from "@/features/auth";

export function Header() {
  const pathname = usePathname();

  const navItems = [
    { href: ROUTES.home, label: "환전 하기", isActive: pathname === ROUTES.home },
    { href: ROUTES.history, label: "환전 내역", isActive: pathname === ROUTES.history },
  ];

  return (
    <HeaderBar navItems={navItems}>
      <LogoutButtonContainer />
    </HeaderBar>
  );
}
