"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Enrollment } from "@/app/actions/enrollement";
import { CheckCircle2, LogIn, Loader2 } from "lucide-react";

export default function EnrollButton({
  skillId,
  isLoggedIn,
  isEnrolled,
  setIsEnrolled,
}: {
  skillId: string;
  isLoggedIn: boolean;
  isEnrolled: boolean;
  setIsEnrolled: (value: boolean) => void;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  if (isEnrolled) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-1.5 text-sm font-semibold text-emerald-300">
        <CheckCircle2 size={14} />
        Enrolled
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <button
        onClick={() => router.push("/login")}
        className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/10 px-4 py-1.5 text-sm font-semibold text-indigo-200 transition hover:border-indigo-400/60 hover:bg-indigo-500/20"
      >
        <LogIn size={14} />
        Log in to enroll
      </button>
    );
  }

  async function handleEnroll() {
    setIsPending(true);
    const result = await Enrollment(skillId);
    if ("error" in result) {
      console.error(result.error);
    } else {
      setIsEnrolled(true);
      router.refresh();
    }
    setIsPending(false);
  }

  return (
    <button
      disabled={isPending}
      onClick={handleEnroll}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 px-5 py-1.5 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-orange-500/30 disabled:opacity-60"
    >
      {isPending && <Loader2 size={14} className="animate-spin" />}
      {isPending ? "Enrolling…" : "Enroll now"}
    </button>
  );
}