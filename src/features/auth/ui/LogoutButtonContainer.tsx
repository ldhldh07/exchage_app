"use client";

import { LogoutButton } from "@/entities/auth";
import { logoutAction } from "../server/logoutAction";

export function LogoutButtonContainer() {
  return (
    <form action={logoutAction}>
      <LogoutButton type="submit">Log out</LogoutButton>
    </form>
  );
}
