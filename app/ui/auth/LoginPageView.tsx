"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import Input from "@/app/ui/Input";
import Button from "@/app/ui/Button";

export default function LoginPageView() {
  const router = useRouter();
  const supabase = createClient();
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

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

    if (role === "student" && user) router.replace(`/${user.id}`);
    else if (role === "teacher" || role === "teacher_pending") {
      router.replace("/teacher");
    } else if (role === "admin") router.replace("/admin");
    else router.replace("/");

    setLoading(false);
  }

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className={clsx(
        "w-full overflow-hidden rounded-2xl border border-slate-600 bg-linear-to-br from-slate-700 to-slate-900 shadow-2xl shadow-slate-800/70 transition-all duration-300",
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3",
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-[44%_56%]">
        <div
          className={clsx(
            "relative hidden md:block transition-all duration-500",
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3",
          )}
        >
          <img
            src="/orangeline.jpg"
            alt="Authentication visual"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-slate-950/35 to-orange-500/20" />
        </div>

        <div
          className={clsx(
            "p-6 sm:p-7 transition-all duration-500",
            mounted ? "opacity-100 translate-x-0" : "opacity-0 translate-x-3",
          )}
        >
          <h2 className="text-3xl font-black tracking-tight text-white">
            Welcome back.
          </h2>
          <p className="mt-1 text-sm text-slate-300">
            We are happy to see you again :).
          </p>

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

            <div>
              <label className="mb-1 block text-sm text-slate-300">
                Password.
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
                    className="p-1 text-slate-400 hover:text-white"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
                required
              />
            </div>

            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-orange-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="m"
              className={clsx(
                "w-full py-2.5 font-semibold",
                loading ? "cursor-not-allowed bg-slate-700 text-slate-300" : "",
              )}
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </form>

          <p className="mt-3 text-center text-sm text-slate-300 ">
            Don&apos;t have an account?{' '}
            <Link
              href="/signup"
              className="font-semibold text-orange-400 hover:underline"
            >
              Sign Up.
            </Link>
          </p>
          {error ? <p className="text-sm text-red-400">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
