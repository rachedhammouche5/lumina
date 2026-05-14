"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import Input from "@/app/ui/Input";
import Button from "@/app/ui/Button";
import { validateStrongPassword } from "@/app/ui/auth/passwordPolicy";

type PageState = "loading" | "ready" | "success" | "invalid";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading…</p>
      </main>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pageState, setPageState] = useState<PageState>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (!tokenHash || type !== "recovery") {
      setPageState("invalid");
      return;
    }

    const supabase = createClient();

    supabase.auth
      .verifyOtp({ token_hash: tokenHash, type: "recovery" })
      .then(({ error: verifyError }) => {
        if (verifyError) {
          console.error("[reset-password] verifyOtp failed:", verifyError.message);
          setPageState("invalid");
        } else {
          setPageState("ready");
        }
      });
  }, [searchParams]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const policyError = validateStrongPassword(password);
    if (policyError) {
      setError(policyError);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });

    if (updateError) {
      setError(updateError.message);
      setLoading(false);
      return;
    }

    setPageState("success");
    setLoading(false);

    setTimeout(() => router.replace("/student"), 2000);
  }

  if (pageState === "loading") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Verifying reset link…</p>
      </main>
    );
  }

  if (pageState === "invalid") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-red-700 bg-slate-900 p-8 text-center">
          <h1 className="text-xl font-bold text-white mb-2">Invalid or expired link</h1>
          <p className="text-slate-400 text-sm mb-6">
            This reset link is no longer valid. Please request a new one.
          </p>
          <Button onClick={() => router.replace("/forgot-password")} size="m" className="w-full">
            Request new link
          </Button>
        </div>
      </main>
    );
  }

  if (pageState === "success") {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-green-700 bg-slate-900 p-8 text-center">
          <h1 className="text-xl font-bold text-white mb-2">Password updated!</h1>
          <p className="text-slate-400 text-sm">Taking you to your dashboard…</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl p-8">
          <h1 className="text-2xl font-black text-white">Set new password</h1>
          <p className="mt-1 text-sm text-slate-400">
            Choose a strong password for your account.
          </p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-1 block text-sm text-slate-300">New password</label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="p-1 text-slate-400 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">Confirm password</label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock size={16} />}
                required
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              size="m"
              className="w-full py-2.5 font-semibold"
              disabled={loading}
            >
              {loading ? "Updating…" : "Update password"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
