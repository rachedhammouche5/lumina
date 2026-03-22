"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Input from "../Input";
import Button from "../Button";

export default function SignupPageView() {
  const router = useRouter();
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
  const [teacher, setTeacher] = useState(false);
  const [mounted, setMounted] = useState(false);

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
    if (data.session) {
      const res = await fetch("/auth/finalize-signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ teacher }),
      });

      if (!res.ok) {
        setError("Account created, but setup failed.");
        setLoading(false);
        return;
      }

      const payload = (await res.json()) as { nextPath?: string };
      router.replace(payload.nextPath ?? `/${data.user?.id}`);
      router.refresh();
      setLoading(false);
      return;
    }

    // setSuccess("Account created. Check your email to confirm your signup.");
    setLoading(false);
  }

  async function signUpWithGoogle() {
    setError("");
    setSuccess("");
    setGoogleLoading(true);
    const callbackUrl = new URL("/auth/callback", window.location.origin);
    if (teacher) {
      callbackUrl.searchParams.set("wants_teacher", "1");
    }

    const { error: googleError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl.toString(),
      },
    });

    if (googleError) {
      setError(googleError.message);
      setGoogleLoading(false);
    }
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={`w-full overflow-hidden rounded-2xl border border-slate-600 bg-linear-to-br from-slate-700 to-slate-900 shadow-2xl shadow-slate-800/70 transition-all duration-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-[44%_56%]">
        <div
          className={`relative hidden md:block transition-all duration-500 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"}`}
        >
          <img
            src="/orangecyan.jpg"
            alt="Authentication visual"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-slate-950/35 to-orange-500/20" />
          <div className="absolute top-5 left-5 right-5"></div>
        </div>

        <div
          className={`p-5 sm:p-6 transition-all duration-500 ${mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3"}`}
        >
          <h2 className="text-2xl font-black tracking-tight text-white">
            Create account
          </h2>

          <form className="mt-4 space-y-3" onSubmit={onSubmit}>
            <div>
              <label className="mb-1 block text-xs text-slate-300">Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                icon={<User size={16} />}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300">Email</label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail size={16} />}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300">
                Password
              </label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock size={16} />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-slate-400 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-300">
                Confirm password
              </label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                icon={<Lock size={16} />}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    className="text-slate-400 hover:text-white"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                }
                required
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="flex items-center gap-2 text-sm text-slate-300"
              />
              Remember me
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={teacher}
                onChange={(e) => setTeacher(e.target.checked)}
              />
              I want to become a teacher
            </label>

            <Button
              type="submit"
              disabled={loading}
              className="w-full disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </Button>
          </form>

          <Button
            type="button"
            variant="ghost"
            onClick={signUpWithGoogle}
            disabled={googleLoading}
            className="mt-2 flex w-full items-center justify-center gap-2 border border-slate-700 bg-slate-800 py-2 text-sm font-semibold text-white hover:border-slate-500 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <GoogleIcon />
            {googleLoading ? "Redirecting..." : "Sign up with Google"}
          </Button>

          <p className="mt-2 text-sm text-slate-300 text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-orange-400 hover:underline"
            >
              Login
            </Link>
          </p>

          {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
          {success ? (
            <p className="mt-3 text-sm text-emerald-400">{success}</p>
          ) : null}
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
