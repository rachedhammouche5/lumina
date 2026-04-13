"use client";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase/client";
import { useState } from "react";

type LogoutButtonProps = {
  className?: string;
  onLoggedOut?: () => void;
};

export default function LogoutButton({
  className = "",
  onLoggedOut,
}: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setErrorMsg(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signOut({ scope: "global" });
    if (error) {
      console.error("logout failed :", error.message);
      setErrorMsg("logout failed. Please try again...");
      setLoading(false);
      return;
    }
    router.replace("/");
    router.refresh();
    onLoggedOut?.();
  };
  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loading}
        className="flex w-full items-center justify-start rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-left text-sm font-semibold text-rose-100 transition hover:border-rose-300/40 hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
      {errorMsg && <p className="mt-2 text-sm text-rose-200">{errorMsg}</p>}
    </div>
  );
}
