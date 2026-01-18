import { loginSchema } from "@/entities/auth";

export function validateLoginForm(formData: FormData) {
  return loginSchema.safeParse({ email: formData.get("email") });
}
