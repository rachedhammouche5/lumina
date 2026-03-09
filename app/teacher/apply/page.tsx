"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TeacherApplyPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [motivation, setMotivation] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/auth/teacher-request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        fullName,
        cvUrl,
        motivation,
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(payload?.error ?? "Failed to submit teacher request.");
      setSubmitting(false);
      return;
    }

    const payload = (await response.json()) as { nextPath?: string };
    setSubmitted(true);
    setSubmitting(false);
    router.replace(payload.nextPath ?? "/teacher");
    router.refresh();
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-24 flex items-center justify-center">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900/95 p-6 sm:p-8 shadow-[0_25px_80px_rgba(2,6,23,0.55)]">
        <h1 className="text-2xl font-black tracking-tight text-white">
          Teacher Application
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          Fill this form to request teacher access. Your account stays student
          until an admin approves your request.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Full name
            </label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              CV URL
            </label>
            <input
              type="url"
              placeholder="https://..."
              value={cvUrl}
              onChange={(event) => setCvUrl(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-300">
              Motivation
            </label>
            <textarea
              rows={5}
              placeholder="Tell us why you want to become a teacher..."
              value={motivation}
              onChange={(event) => setMotivation(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20"
              
            />
          </div>

          <button
            type="submit"
            disabled={submitting || submitted}
            className="w-full cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 py-2.5 font-semibold text-white hover:from-orange-600 hover:to-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Submitting..." : submitted ? "Submitted" : "Submit Application"}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-red-400">{error}</p> : null}
        {/* {submitted ? (
          <p className="mt-4 text-sm text-emerald-400">
            Application submitted successfully. It is now pending admin review.
            <span className="ml-1">
              <Link href="/teacher" className="font-semibold underline">
                Go to teacher dashboard
              </Link>
            </span>
          </p>
        ) : null} */}
      </section>
    </main>
  );
}
