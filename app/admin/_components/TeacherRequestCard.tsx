"use client";

import type { TeacherRequest, TeacherRequestStatus } from "../types";
import { reviewTeacherRequest } from "@/features/users/actions/reviewTeacherRequests";
import { deleteTeacherRequest } from "@/features/users/actions/deleteTeacherRequest";
import { Trash2 } from "lucide-react";

type TeacherRequestCardProps = {
  request: TeacherRequest;
};

function statusClasses(status: TeacherRequestStatus) {
  switch (status) {
    case "approved":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
    case "rejected":
      return "border-rose-400/30 bg-rose-500/10 text-rose-200";
    default:
      return "border-amber-400/30 bg-amber-500/10 text-amber-200";
  }
}

function DocLink({ href, label }: { href: string | null; label: string }) {
  if (!href) return <span className="text-slate-500">-</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-sm font-medium text-sky-300 underline decoration-sky-300/40 underline-offset-2 hover:text-sky-200"
    >
      {label}
    </a>
  );
}

export default function TeacherRequestCard({ request }: TeacherRequestCardProps) {
  const isRequestPending = request.status === "pending";

  return (
    <tr className="border-t border-white/10">
      <td className="py-4 pr-4 align-top">
        <div className="font-semibold text-white">{request.full_name ?? "Unnamed"}</div>
        <div className="mt-1 text-xs text-slate-500">{request.user_id}</div>
      </td>
      <td className="py-4 pr-4 align-top text-sm text-slate-300">{request.email}</td>
      <td className="py-4 pr-4 align-top text-sm text-slate-300">
        <span className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${statusClasses(request.status)}`}>
          {request.status}
        </span>
      </td>
      <td className="py-4 pr-4 align-top text-sm text-slate-300">
        {new Date(request.created_at).toLocaleDateString()}
      </td>
      <td className="py-4 pr-4 align-top text-sm">
        <div className="flex flex-col gap-1 text-slate-300">
          <DocLink href={request.cv_url} label="CV" />
          <DocLink href={request.photo_url} label="Photo" />
          <DocLink href={request.certification_url} label="Cert" />
          <DocLink href={request.gov_id_url} label="ID" />
        </div>
      </td>
      <td className="py-4 pr-4 align-top text-sm text-slate-300">
        <p className="line-clamp-3 whitespace-pre-wrap">{request.motivation ?? "-"}</p>
      </td>
      <td className="py-4 align-top">
        <div className="space-y-2">
          {isRequestPending ? (
            <form action={reviewTeacherRequest} className="space-y-2">
              <input type="hidden" name="requestUserId" value={request.user_id} />
              <input
                name="adminNote"
                placeholder="Note"
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none placeholder:text-slate-500 disabled:opacity-50"
                required
              />
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  name="decision"
                  value="approved"
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide disabled:opacity-50 ${statusClasses("approved")}`}
                >
                  Approve
                </button>
                <button
                  type="submit"
                  name="decision"
                  value="rejected"
                  className={`rounded-xl border px-3 py-2 text-xs font-semibold uppercase tracking-wide disabled:opacity-50 ${statusClasses("rejected")}`}
                >
                  Reject
                </button>
              </div>
            </form>
          ) : (
            <div className="text-xs leading-5 text-slate-400">
              <p>{request.admin_note ? `Note: ${request.admin_note}` : "Reviewed."}</p>
            </div>
          )}

          <form action={deleteTeacherRequest}>
            <input type="hidden" name="requestUserId" value={request.user_id} />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <Trash2 size={14} />
              Remove
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
} 
