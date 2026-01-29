import { Suspense } from "react";
import { LoginForm } from "@/features/auth/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-[1440px] h-[1080px] flex items-center justify-center">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
