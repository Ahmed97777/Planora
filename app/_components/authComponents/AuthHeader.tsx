"use client";

import { useRouter } from "next/navigation";
import PlanoraBrand from "@/app/_components/PlanoraBrand";
import { useSignInContext } from "./SignInContext";

export default function AuthHeader() {
  const { isSignIn } = useSignInContext();
  const router = useRouter();

  return (
    <div className="text-center mb-8">
      <button onClick={() => router.push("/")} className="cursor-pointer">
        <PlanoraBrand size="text-5xl" />
      </button>

      <p className="text-primary-300 mt-2">
        {isSignIn
          ? "Welcome back! Sign in to continue"
          : "Create your account to get started"}
      </p>
    </div>
  );
}
