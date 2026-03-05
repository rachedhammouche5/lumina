"use client";

import { useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignupPageView() {
  const supabase = createClient();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    if (data.session && !rememberMe) {
      await supabase.auth.signOut({ scope: "global" });
    }

    setSuccess("Account created. Check your email to confirm your signup.");
    setLoading(false);
  }

  async function signUpWithGoogle() {
    setError("");
    setSuccess("");
    setGoogleLoading(true);

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options:{
        redirectTo:`${window.location.origin}/auth/callback`,
      }
    });

    if (googleError) {
      setError(googleError.message);
      setGoogleLoading(false);
    }
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/95 shadow-[0_25px_80px_rgba(2,6,23,0.55)]">
      <div className="grid grid-cols-1 md:grid-cols-[44%_56%]">
        <div className="relative hidden md:block">
          <img
            src="/png/auth.jpg"
            alt="Authentication visual"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-slate-950/35 to-orange-500/20" />
          <div className="absolute top-5 left-5 right-5">
            <p className="text-sm font-semibold tracking-wide text-orange-300">
              LUMINA
            </p>
            <p className="mt-1 text-lg font-semibold leading-snug text-white">
              Build your personalized learning journey.
            </p>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <h2 className="text-2xl font-black tracking-tight text-white">
            Create account
          </h2>

          <form className="mt-4 space-y-3" onSubmit={onSubmit}>
            <div>
              <label className="mb-1 block text-xs text-slate-300">Name</label>
              <div className="relative">
                <User
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={clsx(
                    "w-full rounded-lg border border-slate-700 bg-slate-800 px-10 py-2 text-sm text-white outline-none",
                    "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
                  )}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300">Email</label>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clsx(
                    "w-full rounded-lg border border-slate-700 bg-slate-800 px-10 py-2 text-sm text-white outline-none",
                    "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
                  )}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={clsx(
                    "w-full rounded-lg border border-slate-700 bg-slate-800 px-10 py-2 pr-10 text-sm text-white outline-none",
                    "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300">
                Confirm password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={clsx(
                    "w-full rounded-lg border border-slate-700 bg-slate-800 px-10 py-2 pr-10 text-sm text-white outline-none",
                    "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
                  )}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((v) => !v)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-600 bg-slate-800 accent-orange-500"
              />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full cursor-pointer rounded-lg py-2 font-semibold text-white transition-all disabled:cursor-not-allowed",
                loading
                  ? "cursor-not-allowed bg-slate-700 text-slate-300"
                  : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
              )}
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <button
            type="button"
            onClick={signUpWithGoogle}
            disabled={googleLoading}
            className={clsx(
              "mt-2 flex w-full items-center justify-center cursor-pointer gap-2 rounded-lg border border-slate-700 bg-slate-800 py-2 text-sm font-semibold text-white transition-all",
              "hover:border-slate-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70",
            )}
          >
            <GoogleIcon />
            {googleLoading ? "Redirecting..." : "Sign up with Google"}
          </button>


          <p className="mt-2 text-sm text-slate-300">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-orange-400 hover:underline">
              Login
            </Link>
          </p>

          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          {success ? <p className="mt-3 text-sm text-emerald-400">{success}</p> : null}
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.6 14.5 2.7 12 2.7 6.9 2.7 2.8 6.9 2.8 12s4.1 9.3 9.2 9.3c5.3 0 8.8-3.7 8.8-8.9 0-.6-.1-1.1-.2-1.5H12z"
      />
      <path
        fill="#34A853"
        d="M2.8 7.4l3.2 2.3c.9-1.8 2.7-3 5-3 1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.6 14.5 2.7 12 2.7c-3.6 0-6.7 2-8.3 4.7z"
      />
      <path
        fill="#FBBC05"
        d="M12 21.3c2.4 0 4.5-.8 6-2.3l-2.8-2.2c-.8.6-1.8 1-3.2 1-2.7 0-4.9-1.8-5.7-4.3l-3.3 2.6c1.6 3.1 4.8 5.2 9 5.2z"
      />
      <path
        fill="#4285F4"
        d="M20.8 12.4c0-.6-.1-1.1-.2-1.5H12v3.9h5.4c-.3 1.5-1.2 2.6-2.2 3.4l2.8 2.2c1.7-1.6 2.8-4 2.8-8z"
      />
    </svg>
  );
}
