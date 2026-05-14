"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import Input from "@/app/ui/Input";
import Button from "@/app/ui/Button";
import { sendPasswordResetEmail } from "@/app/actions/forgot-password";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await sendPasswordResetEmail(email);

    if (result.error) {
      setError(result.error);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-slate-600 bg-gradient-to-br from-slate-700 to-slate-900 shadow-2xl p-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-6"
          >
            <ArrowLeft size={14} /> Back to login
          </Link>

          <h1 className="text-2xl font-black text-white">Forgot password?</h1>
          <p className="mt-1 text-sm text-slate-400">
            Enter your email and we&apos;ll send you a reset link.
          </p>

          {sent ? (
            <div className="mt-6 rounded-lg bg-green-900/40 border border-green-700 p-4 text-green-300 text-sm">
              Reset link sent! Check your inbox and click the link to set a new password.
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <label className="mb-1 block text-sm text-slate-300">Email</label>
                <Input
                  type="email"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={<Mail size={16} />}
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
                {loading ? "Sending..." : "Send reset link"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
