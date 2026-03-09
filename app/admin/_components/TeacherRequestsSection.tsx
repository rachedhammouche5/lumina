import TeacherRequestCard from "./TeacherRequestCard";
import type { TeacherRequest } from "../types";

type TeacherRequestsSectionProps = {
  requests: TeacherRequest[];
  errorMessage: string | null;
};

export default function TeacherRequestsSection({
  requests,
  errorMessage,
}: TeacherRequestsSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.55)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Teacher Requests</h2>
        <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
          {requests.length}
        </span>
      </div>

      {errorMessage ? (
        <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          Failed to load teacher requests. {errorMessage}
        </p>
      ) : requests.length === 0 ? (
        <p className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          No teacher requests yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {requests.map((request) => (
            <TeacherRequestCard key={request.user_id} request={request} />
          ))}
        </ul>
      )}
    </section>
  );
}
