"use client";

import { ReactNode } from "react";
import { SignInProvider } from "./SignInContext";

export default function AuthContainer({ children }: { children: ReactNode }) {
  return (
    <SignInProvider>
      <div className="h-full bg-primary-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-primary-900 border border-primary-800 rounded-sm p-8 shadow-xl">
          {children}
        </div>
      </div>
    </SignInProvider>
  );
}
