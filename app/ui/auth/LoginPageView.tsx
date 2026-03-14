"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginPageView() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Invalid email or password. Please try again.");
      setLoading(false);
      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const role = user?.app_metadata?.role;

    if (role === "student") router.replace("/student");
    else if (role === "teacher" || role === "teacher_pending") {
      router.replace(`/${user?.id}`);
    } else if (role === "admin") router.replace("/admin");
    else router.replace("/");

    setLoading(false);
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
              Learn smarter with adaptive guidance.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-7">
          <h2 className="text-3xl font-black tracking-tight text-white">
            Welcome back
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            We are happy to see you again :)
          </p>

          <form className="mt-6 space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-1 block text-sm text-slate-300">Email</label>
              <div className="relative">
                <Mail
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clsx(
                    "w-full rounded-lg border border-slate-700 bg-slate-800 px-10 py-2.5 text-white outline-none",
                    "focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
                  )}
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">
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
                    "w-full rounded-lg border border-slate-700 bg-slate-800 px-10 py-2.5 pr-10 text-white outline-none",
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

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full cursor-pointer rounded-lg py-2.5 font-semibold text-white transition-all disabled:cursor-not-allowed",
                loading
                  ? "cursor-not-allowed bg-slate-700 text-slate-300"
                  : "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
              )}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-3 text-sm text-slate-300 text-center ">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-orange-400 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
