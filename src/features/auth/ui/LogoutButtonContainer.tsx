"use client";

import { useQueryClient } from "@tanstack/react-query";
import { LogoutButton } from "@/entities/auth";
import { logoutAction } from "../server/logoutAction";

export function LogoutButtonContainer() {
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    queryClient.clear();
    await logoutAction();
  };

  return (
    <form action={handleLogout}>
      <LogoutButton type="submit">Log out</LogoutButton>
    </form>
  );
}
