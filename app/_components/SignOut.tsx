"use client";

import { createClient } from "@/utils/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const supabase = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/auth");
  };

  return (
    <button
      className="flex items-center gap-2 cursor-pointer text-red-500 hover:opacity-80 transition-opacity"
      onClick={handleSignOut}
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  );
}
