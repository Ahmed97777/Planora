"use client";

import { useSignInContext } from "./SignInContext";

export default function ToggleAuthMode() {
  const { isSignIn, setIsSignIn } = useSignInContext();

  return (
    <div className="mt-6 text-center">
      <p className="text-primary-300 text-sm">
        {isSignIn ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => setIsSignIn(!isSignIn)}
          className="text-accent-500 hover:text-accent-400 font-semibold cursor-pointer"
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </button>
      </p>
    </div>
  );
}
