import type { TeacherRequest, TeacherRequestStatus } from "../types";
import { reviewTeacherRequest} from "@/features/users/actions/reviewTeacherRequests";

type TeacherRequestCardProps = {
  request: TeacherRequest;
};

function statusClasses(status: TeacherRequestStatus) {
  if (status === "approved") {
    return "border-emerald-400/40 bg-emerald-500/10 text-emerald-300";
  }

  if (status === "rejected") {
    return "border-red-400/40 bg-red-500/10 text-red-300";
  }

  return "border-amber-400/40 bg-amber-500/10 text-amber-300";
}

export default function TeacherRequestCard({ request }: TeacherRequestCardProps) {
  return (
    <li className="rounded-xl border border-slate-700 bg-slate-900 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-white">
            {request.full_name ?? "No name provided"}
          </h3>
          <div className="flex items-center gap-2">
            <span
              className={`rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${statusClasses(
                request.status,
              )}`}
            >
              {request.status}
            </span>
            <p className="text-xs text-slate-400">
              {new Date(request.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-300">{request.email ?? "No email available"}</p>

        {request.cv_url ? (
          <a
            href={request.cv_url}
            target="_blank"
            rel="noreferrer"
            className="inline-block text-sm font-semibold text-amber-300 underline underline-offset-2"
          >
            Open CV
          </a>
        ) : (
          <p className="text-sm text-slate-400">No CV link provided.</p>
        )}

        <div className="rounded-lg border border-slate-700 bg-slate-950/70 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">Motivation</p>
          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-200">
            {request.motivation ?? "No motivation provided."}
          </p>
        </div>
      <form action={reviewTeacherRequest} className="space-y-3">
      <input type="hidden" name="requestUserId" value={request.user_id} />
          <div>
            <label
              htmlFor={`admin-note-${request.user_id}`}
              className="mb-1 block text-sm text-slate-300"
            >
              Admin note 
            </label>
            <textarea
              id={`admin-note-${request.user_id}`}
              rows={3}
              name="adminNote"
              placeholder="Reason for approval/rejection..."
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
              required
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              name="decision"
              value="approved"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500"
            >
              Approve
            </button>
            <button
              type="submit"
              name="decision"
              value="rejected"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500"
            >
              Reject
            </button>
          </div>
      </form>
    </li>
  );
}
