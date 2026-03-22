import Link from "next/link";
import type { ReactNode } from "react";

import { requireTeacherAccess } from "@/features/utils/auth/requireUserAccess";

export default async function TeacherLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { supabase, role, userId } = await requireTeacherAccess();

  const { data: requestRow, error: requestError } = await supabase
    .from("teacher_requests")
    .select("status,admin_note")
    .eq("user_id", userId)
    .maybeSingle();

  if (requestError) {
    console.error("Teacher request fetch error:", requestError.message);
  }

  const isPending = role === "teacher_pending";
  const isRejected = isPending && requestRow?.status === "rejected";
  const rejectionReason =
    requestRow?.admin_note?.trim() || "No explanation was provided by admin.";

  return (
    <main className="min-h-screen bg-slate-950 px-4 pt-24 pb-16">
      <div className="mx-auto flex w-full max-w-6xl gap-6">
        <aside className="h-fit w-full max-w-xs rounded-xl border border-slate-700 bg-slate-900 p-4">
          <h1 className="mb-4 text-xl font-bold text-white">Teacher Dashboard</h1>

          {isPending ? (
            <button
              disabled
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-left font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Manage Skills
            </button>
          ) : (
            <Link
              href="/teacher/skills"
              className="block w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-left font-semibold text-white transition hover:bg-slate-700"
            >
              Manage Skills
            </Link>
          )}
        </aside>

        <section className="flex-1 space-y-5 rounded-xl border border-slate-700 bg-slate-900 p-6">
          {isRejected ? (
            <div className="rounded-lg border border-red-400/40 bg-red-500/10 px-4 py-3 text-red-200">
              <p className="font-semibold">Your teacher request was rejected.</p>
              <p className="mt-1 text-sm">
                Reason: <span className="font-medium">{rejectionReason}</span>
              </p>
              <Link href="/teacher/apply" className="mt-2 inline-block text-sm underline">
                Submit a new application
              </Link>
            </div>
          ) : isPending ? (
            <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-amber-200">
              Your teacher application is pending admin approval. Actions are
              disabled until approval.
            </div>
          ) : null}

          {children}
        </section>
      </div>
    </main>
  );
}
