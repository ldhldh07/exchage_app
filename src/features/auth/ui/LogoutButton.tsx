"use client";

import { LogoutButtonUI } from "@/entities/auth";
import { logoutAction } from "../server/logoutAction";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <LogoutButtonUI type="submit">Log out</LogoutButtonUI>
    </form>
  );
}
