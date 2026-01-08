import { ArrowRight } from "lucide-react";
import { useSignInContext } from "../SignInContext";

export default function SubmitForm({ loading }: { loading: boolean }) {
  const { isSignIn } = useSignInContext();
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 bg-accent-500 text-primary-900 py-3 rounded-sm font-semibold hover:bg-accent-600 disabled:opacity-50 cursor-pointer"
    >
      {loading ? (
        <div className="spinner-mini" />
      ) : (
        <>
          <span>{isSignIn ? "Sign In" : "Create Account"}</span>
          <ArrowRight size={18} />
        </>
      )}
    </button>
  );
}
