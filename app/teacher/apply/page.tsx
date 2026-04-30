import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  FileText,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import TeacherRequestForm from "./TeacherRequestForm";

type TeacherRequestRow = {
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  full_name: string | null;
  cv_url: string | null;
  motivation: string | null;
};

function StatusCard({
  title,
  description,
  icon,
  tone,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  tone: "pending" | "rejected" | "approved";
}) {
  const toneClasses =
    tone === "approved"
      ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-100"
      : tone === "rejected"
        ? "border-rose-400/20 bg-rose-500/10 text-rose-100"
        : "border-amber-400/20 bg-amber-500/10 text-amber-50";

  return (
    <div className={`rounded-[1.75rem] border p-5 shadow-2xl backdrop-blur-xl ${toneClasses}`}>
      <div className="flex items-start gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-2.5">
          {icon}
        </div>
        <div>
          <h2 className="text-lg font-semibold tracking-tight sm:text-xl">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">{description}</p>
        </div>
      </div>
    </div>
  );
}

function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] overflow-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(56,189,248,0.16),_transparent_28%),linear-gradient(180deg,_#020617_0%,_#07111f_48%,_#020617_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.18] [background-image:linear-gradient(rgba(148,163,184,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.14)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:linear-gradient(180deg,black,transparent_92%)]" />

      <div className="mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[1.02fr_0.98fr] xl:items-start">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-[0_30px_100px_rgba(2,6,23,0.75)] backdrop-blur-xl sm:p-8 xl:sticky xl:top-8">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-sky-500/15 blur-3xl" />

          <div className="relative space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-200">
              <Sparkles size={13} className="text-orange-300" />
              {eyebrow}
            </div>

            <div className="space-y-3">
              <h1 className="max-w-2xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                {title}
              </h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {description}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Step 1
                </p>
                <p className="mt-2 text-sm font-medium text-white">Complete profile</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Step 2
                </p>
                <p className="mt-2 text-sm font-medium text-white">Submit documents</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Step 3
                </p>
                <p className="mt-2 text-sm font-medium text-white">Wait for review</p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2 text-emerald-300">
                  <BadgeCheck size={16} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Verified flow
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-emerald-50/90">
                  Secure uploads and a clean review process.
                </p>
              </div>
              <div className="rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
                <div className="flex items-center gap-2 text-sky-200">
                  <ArrowRight size={16} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Fast approval
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-sky-50/90">
                  Admins can review and respond quickly.
                </p>
              </div>
              <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-4">
                <div className="flex items-center gap-2 text-orange-200">
                  <FileText size={16} />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                    Teacher tools
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-orange-50/90">
                  Unlock the dashboard once approved.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_100px_rgba(2,6,23,0.68)] backdrop-blur-xl sm:p-6">
          {children}
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 break-words text-sm font-medium text-white">{value}</p>
    </div>
  );
}

export default async function TeacherApplyPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const role = getRole(user);
  if (role === "teacher") {
    redirect("/teacher");
  }

  const { data: request, error: requestError } = await supabase
    .from("teacher_requests")
    .select("status,admin_note,full_name,cv_url,motivation")
    .eq("user_id", user.id)
    .maybeSingle();

  if (requestError) {
    console.error("[teacher/apply] Failed to load request state:", requestError.message);
  }

  const requestRow = request as TeacherRequestRow | null;
  const fullName =
    (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
    (typeof user.email === "string" ? user.email.split("@")[0] : "Teacher");

  if (requestRow?.status === "approved") {
    redirect("/teacher");
  }

  if (requestRow?.status === "pending") {
    return (
      <PageShell
        eyebrow="Application submitted"
        title="Your request is waiting in the review queue"
        description="We received your teacher request and it is now under admin review. You’ll unlock the teacher tools as soon as it’s approved."
      >
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-amber-400/20 bg-amber-500/10 p-5 shadow-2xl shadow-amber-950/20">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200">
              <Clock3 size={13} />
              Waiting for review
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Your teacher request is in the queue
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-200/90 sm:text-base">
                You cannot use the teacher dashboard yet. We’ll notify you once
                an admin finishes the review.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoBlock label="Submitted name" value={requestRow.full_name ?? fullName} />
            <InfoBlock label="CV link" value={requestRow.cv_url ?? "Not provided"} />
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Motivation
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-200">
              {requestRow.motivation ?? "No motivation was saved with the request."}
            </p>
          </div>

          <StatusCard
            tone="pending"
            title="Please wait for admin approval"
            description="Your request has been submitted successfully. Once approved, this account will unlock the normal teacher dashboard."
            icon={<Sparkles className="text-amber-200" size={18} />}
          />
        </div>
      </PageShell>
    );
  }

  if (requestRow?.status === "rejected") {
    const reason =
      requestRow.admin_note?.trim() || "Your request was not accepted by the admin team.";

    return (
      <PageShell
        eyebrow="Application reviewed"
        title="This request was not approved"
        description="The admin team reviewed your teacher request and decided not to approve this account at the moment."
      >
        <div className="space-y-5">
          <div className="rounded-[1.75rem] border border-rose-400/20 bg-rose-500/10 p-5 shadow-2xl shadow-rose-950/20">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-rose-200">
              <ShieldAlert size={13} />
              Application rejected
            </div>
            <div className="mt-4 space-y-2">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Your account wasn&apos;t accepted
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-200/90 sm:text-base">
                If you think this was a mistake, contact the admin team and ask
                for a manual review.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Admin note
            </p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-200">
              {reason}
            </p>
          </div>

          <StatusCard
            tone="rejected"
            title="Teacher access is blocked"
            description="This account cannot use the teacher dashboard right now."
            icon={<ShieldAlert className="text-rose-200" size={18} />}
          />
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell
      eyebrow="Teacher onboarding"
      title="Apply for Lumina teacher access"
      description="Complete the form below to request teacher access. The flow is designed to feel polished on desktop and effortless on mobile."
    >
      <div className="space-y-5">
        <div className="flex items-start justify-between gap-3 rounded-[1.75rem] border border-white/10 bg-slate-950/60 p-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Secure submission
            </p>
            <p className="mt-1 text-sm font-medium text-white">
              Your documents are uploaded and reviewed privately.
            </p>
          </div>
          <div className="hidden items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-200 sm:flex">
            <BadgeCheck size={14} />
            Verified process
          </div>
        </div>

        <TeacherRequestForm initialFullName={fullName} />
      </div>
    </PageShell>
  );
}
