"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Edit3, FileText, Image as ImageIcon, ShieldCheck, Sparkles } from "lucide-react";
import TeacherRequestForm from "./TeacherRequestForm";

type TeacherRequestData = {
  status: "pending" | "approved" | "rejected";
  admin_note: string | null;
  full_name: string | null;
  photo_url: string | null;
  gov_id_url: string | null;
  certification_url: string | null;
  cv_url: string | null;
  motivation: string | null;
};

function SummaryCard({
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

function FileSummary({
  label,
  url,
  icon,
}: {
  label: string;
  url: string | null;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
      <div className="flex items-center gap-2 text-white">
        <span className="rounded-xl border border-white/10 bg-white/[0.03] p-2">
          {icon}
        </span>
        <p className="text-sm font-semibold">{label}</p>
      </div>
      <p className="mt-3 text-sm text-slate-300">
        {url ? "Uploaded and ready for review." : "No file was saved for this field."}
      </p>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex max-w-full rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/[0.08]"
        >
          Open file
        </a>
      ) : null}
    </div>
  );
}

export default function TeacherRequestEditor({
  request,
  initialFullName,
}: {
  request: TeacherRequestData;
  initialFullName: string;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const name =
    request.full_name?.trim() ||
    initialFullName.trim() ||
    "Teacher";

  if (isEditing) {
    return (
      <TeacherRequestForm
        initialFullName={name}
        initialPhotoUrl={request.photo_url}
        initialGovIdUrl={request.gov_id_url}
        initialCvUrl={request.cv_url}
        initialCertificationUrl={request.certification_url}
        initialMotivation={request.motivation ?? ""}
        submitMode="edit"
        submitLabel="Save edits"
        submittingLabel="Saving edits..."
        onCancel={() => setIsEditing(false)}
        onSaved={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-[1.75rem] border border-amber-400/20 bg-amber-500/10 p-5 shadow-2xl shadow-amber-950/20">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-200">
          <Sparkles size={13} />
          Waiting for review
        </div>
        <div className="mt-4 space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Your teacher request is in the queue
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-slate-200/90 sm:text-base">
            You cannot use the teacher dashboard yet. If you need to fix a detail,
            you can edit the request while it is still pending.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.08]"
        >
          <Edit3 size={16} />
          Edit request
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SummaryCard label="Submitted name" value={name} />
        <SummaryCard label="CV link" value={request.cv_url ?? "Not provided"} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FileSummary label="Profile picture" url={request.photo_url} icon={<ImageIcon size={18} />} />
        <FileSummary label="Government ID" url={request.gov_id_url} icon={<ShieldCheck size={18} />} />
        <FileSummary label="Certification" url={request.certification_url} icon={<ShieldCheck size={18} />} />
        <FileSummary label="Resume / CV" url={request.cv_url} icon={<FileText size={18} />} />
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Motivation
        </p>
        <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-200">
          {request.motivation ?? "No motivation was saved with the request."}
        </p>
      </div>

      {request.admin_note ? (
        <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            Admin note
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-7 text-slate-200">
            {request.admin_note}
          </p>
        </div>
      ) : null}
    </div>
  );
}
