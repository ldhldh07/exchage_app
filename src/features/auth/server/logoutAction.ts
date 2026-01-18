"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/shared/config";

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("memberId");

  redirect(ROUTES.login);
}
