"use client";

import { FormEvent, ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  Image as ImageIcon,
  Loader2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type FileUploadCardProps = {
  label: string;
  accept: string;
  file: File | null;
  setFile: (file: File | null) => void;
  description: string;
  accent: string;
  icon: ReactNode;
  existingUrl?: string | null;
};

type SubmitMode = "create" | "edit";

const STORAGE_BUCKETS = {
  photo: "teacher-photo",
  govId: "teacher-id",
  cv: "teacher-cv",
  certification: "certification",
} as const;

function filenameFromUrl(url: string) {
  try {
    const pathname = new URL(url).pathname;
    const lastSegment = pathname.split("/").filter(Boolean).pop();
    return lastSegment ? decodeURIComponent(lastSegment) : "Uploaded file";
  } catch {
    return "Uploaded file";
  }
}

function SectionCard({
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
    <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-4 shadow-[0_18px_60px_rgba(2,6,23,0.38)] backdrop-blur-xl sm:p-6">
      <div className="mb-4 border-b border-white/10 pb-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
          {eyebrow}
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
          {title}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{description}</p>
      </div>
      {children}
    </section>
  );
}

function FileUploadCard({
  label,
  accept,
  file,
  setFile,
  description,
  accent,
  icon,
  existingUrl,
}: FileUploadCardProps) {
  return (
    <div className="group rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4 transition duration-200 hover:border-white/20 hover:bg-slate-950/80">
      <div className="flex items-start gap-3">
        <div className={`rounded-2xl border border-white/10 ${accent} p-2.5 text-white`}>
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-3">
            <label className="block text-sm font-semibold text-white">{label}</label>
            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300">
              Required
            </span>
          </div>
          <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
          {existingUrl ? (
            <a
              href={existingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex max-w-full items-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
            >
              Current file: {filenameFromUrl(existingUrl)}
            </a>
          ) : null}
        </div>
      </div>

      <label className="mt-4 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.03] px-4 py-5 text-center transition hover:border-orange-400/40 hover:bg-white/[0.05]">
        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <UploadCloud className="text-orange-300" size={22} />
        <span className="mt-3 text-sm font-medium text-white">
          {file ? file.name : "Click or tap to upload"}
        </span>
        <span className="mt-1 text-xs text-slate-400">
          Drag and drop is supported in most browsers.
        </span>
      </label>
    </div>
  );
}

export default function TeacherApplicationFlow({
  initialFullName,
  initialPhotoUrl = null,
  initialGovIdUrl = null,
  initialCvUrl = null,
  initialCertificationUrl = null,
  initialMotivation = "",
  submitMode = "create",
  submitLabel,
  submittingLabel,
  onCancel,
  onSaved,
}: {
  initialFullName: string;
  initialPhotoUrl?: string | null;
  initialGovIdUrl?: string | null;
  initialCvUrl?: string | null;
  initialCertificationUrl?: string | null;
  initialMotivation?: string;
  submitMode?: SubmitMode;
  submitLabel?: string;
  submittingLabel?: string;
  onCancel?: () => void;
  onSaved?: () => void;
}) {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState(initialFullName);
  const [photoUrl, setPhotoUrl] = useState<string | null>(initialPhotoUrl);
  const [govIdUrl, setGovIdUrl] = useState<string | null>(initialGovIdUrl);
  const [cvUrl, setCvUrl] = useState<string | null>(initialCvUrl);
  const [certificationUrl, setCertificationUrl] = useState<string | null>(
    initialCertificationUrl,
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const [govId, setGovId] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const [certification, setCertification] = useState<File | null>(null);
  const [motivation, setMotivation] = useState(initialMotivation);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const uploadFile = async (file: File, bucket: string) => {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const fileName = `${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        contentType: file.type || "application/octet-stream",
        upsert: false,
      });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return data.publicUrl;
  };

  const uploadOrKeep = async (
    file: File | null,
    existingUrl: string | null,
    bucket: string,
  ) => {
    if (file) {
      return uploadFile(file, bucket);
    }

    if (existingUrl) {
      return existingUrl;
    }

    throw new Error("Please upload all required files.");
  };

  const resetToInitialValues = () => {
    setFullName(initialFullName);
    setPhotoUrl(initialPhotoUrl);
    setGovIdUrl(initialGovIdUrl);
    setCvUrl(initialCvUrl);
    setCertificationUrl(initialCertificationUrl);
    setPhoto(null);
    setGovId(null);
    setCv(null);
    setCertification(null);
    setMotivation(initialMotivation);
    setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !motivation.trim()) {
      return setError("Please complete all required fields.");
    }

    setSubmitting(true);
    setError("");

    try {
      const [nextPhotoUrl, nextGovIdUrl, nextCvUrl, nextCertificationUrl] = await Promise.all([
        uploadOrKeep(photo, photoUrl, STORAGE_BUCKETS.photo),
        uploadOrKeep(govId, govIdUrl, STORAGE_BUCKETS.govId),
        uploadOrKeep(cv, cvUrl, STORAGE_BUCKETS.cv),
        uploadOrKeep(certification, certificationUrl, STORAGE_BUCKETS.certification),
      ]);

      const response = await fetch("/auth/teacher-request", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          cvUrl: nextCvUrl,
          photoUrl: nextPhotoUrl,
          govIdUrl: nextGovIdUrl,
          certificationUrl: nextCertificationUrl,
          motivation: motivation.trim(),
        }),
      });

      if (!response.ok) {
        let message = "Submission failed.";
        try {
          const result = (await response.json()) as { error?: string };
          if (typeof result.error === "string" && result.error.trim()) {
            message = result.error;
          }
        } catch {
          const text = await response.text();
          if (text.trim()) {
            message = text;
          }
        }

        throw new Error(message);
      }
      if (submitMode === "edit") {
        setPhotoUrl(nextPhotoUrl);
        setGovIdUrl(nextGovIdUrl);
        setCvUrl(nextCvUrl);
        setCertificationUrl(nextCertificationUrl);
        setPhoto(null);
        setGovId(null);
        setCv(null);
        setCertification(null);
        onSaved?.();
        router.refresh();
      } else {
        router.push("/teacher/success");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
      <SectionCard
        eyebrow="01. Identity"
        title="Tell us who you are"
        description="Start with the basics. Use the full name that matches your documents and your public profile."
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-white" htmlFor="full-name">
            Full name
          </label>
          <input
            id="full-name"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/15"
          />
        </div>
      </SectionCard>

      <SectionCard
        eyebrow="02. Public profile"
        title="Create a polished first impression"
        description="Upload a clear headshot that students can recognize. This file is public on your teacher profile."
      >
        <FileUploadCard
          label="Profile picture"
          accept="image/*"
          file={photo}
          setFile={setPhoto}
          description="A clean, well-lit headshot works best on the dashboard."
          accent="bg-gradient-to-br from-sky-500/20 to-cyan-500/20"
          icon={<ImageIcon size={18} />}
          existingUrl={photoUrl}
        />
      </SectionCard>

      <SectionCard
        eyebrow="03. Credentials"
        title="Add the documents that support your application"
        description="These files help the admin team verify your teaching background."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FileUploadCard
          label="Resume / CV"
          accept=".pdf"
          file={cv}
          setFile={setCv}
          description="Upload your latest CV in PDF format."
          accent="bg-gradient-to-br from-orange-500/20 to-amber-500/20"
          icon={<FileText size={18} />}
          existingUrl={cvUrl}
        />
        <FileUploadCard
          label="Primary certification"
          accept=".pdf"
          file={certification}
          setFile={setCertification}
          description="Upload your highest degree or a relevant teaching certificate."
          accent="bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20"
          icon={<ShieldCheck size={18} />}
          existingUrl={certificationUrl}
        />
      </div>
      </SectionCard>

      <SectionCard
        eyebrow="04. Verification"
        title="Secure your identity"
        description="Government ID is required for verification and is not shown publicly."
      >
        <FileUploadCard
          label="Government ID"
          accept="image/*"
          file={govId}
          setFile={setGovId}
          description="Upload a clear passport, national ID, or other government-issued photo ID."
          accent="bg-gradient-to-br from-emerald-500/20 to-teal-500/20"
          icon={<ShieldCheck size={18} />}
          existingUrl={govIdUrl}
        />
      </SectionCard>

      <SectionCard
        eyebrow="05. Motivation"
        title="Tell us what drives you to teach"
        description="A short, thoughtful explanation helps the team understand your teaching approach and fit."
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-white" htmlFor="motivation">
            Your motivation
          </label>
          <textarea
            id="motivation"
            rows={6}
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
            placeholder="What drives you to teach? How will you adapt your lessons for Lumina's platform?"
            required
            className="w-full rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3.5 text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-4 focus:ring-orange-500/15"
          />
        </div>
      </SectionCard>

      <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4 sm:p-5">
        {error ? (
          <p className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-200">
            {error}
          </p>
        ) : (
          <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
            <Sparkles className="mt-0.5 shrink-0 text-orange-300" size={16} />
            <p>
              Your application is reviewed privately. You can come back to this page
              later to check the approval status.
            </p>
          </div>
        )}

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {submitMode === "edit" ? (
            <button
              type="button"
              onClick={() => {
                resetToInitialValues();
                onCancel?.();
              }}
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-70"
            >
              Ignore changes
            </button>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 px-4 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(249,115,22,0.28)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                {submittingLabel ?? "Submitting application..."}
              </>
            ) : (
              <>
                <UploadCloud size={18} />
                {submitLabel ?? "Submit application"}
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
