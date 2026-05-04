"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import TeacherRequestCard from "./TeacherRequestCard";
import type { TeacherRequest, TeacherRequestStatus } from "../types";

type Filter = "all" | TeacherRequestStatus;

export default function TeacherRequestsSection({
  requests,
  errorMessage,
}: {
  requests: TeacherRequest[];
  errorMessage: string | null;
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<Filter>("pending");

  const filteredRequests = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      if (!searchValue) return matchesStatus;

      const haystack = [
        request.full_name,
        request.email,
        request.user_id,
        request.status,
        request.motivation,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesStatus && haystack.includes(searchValue);
    });
  }, [requests, search, statusFilter]);

  const statusCounts = requests.reduce(
    (acc, request) => {
      acc[request.status] += 1;
      return acc;
    },
    { pending: 0, approved: 0, rejected: 0 },
  );

  return (
    <section className="rounded-[1.5rem] border border-white/20 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 p-4 sm:p-5 shadow-2xl shadow-slate-950">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Teacher requests</h2>
          <p className="mt-1 text-sm text-slate-400">
            Review pending applications or inspect approved and rejected history.
          </p>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          {filteredRequests.length} records
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 lg:min-w-[360px]">
          <Search size={16} className="text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, status, or notes"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {(["all", "pending", "rejected"] as const).map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setStatusFilter(option)}
              className={`rounded-full border px-3 py-2 text-xs font-medium capitalize transition ${
                statusFilter === option
                  ? "border-slate-300 bg-white text-slate-950"
                  : "border-white/10 bg-slate-950/50 text-slate-300"
              }`}
            >
              {option}
              {option !== "all" ? ` (${statusCounts[option]})` : ""}
            </button>
          ))}
        </div>
      </div>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Failed to load teacher requests. {errorMessage}
        </p>
      ) : filteredRequests.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
          No matching requests.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                <th className="pb-3 pr-4 font-medium">Teacher</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Status</th>
                <th className="pb-3 pr-4 font-medium">Submitted</th>
                <th className="pb-3 pr-4 font-medium">Documents</th>
                <th className="pb-3 pr-4 font-medium">Motivation</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <TeacherRequestCard key={request.user_id} request={request} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
