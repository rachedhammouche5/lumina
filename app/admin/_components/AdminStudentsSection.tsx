"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { GraduationCap, Pencil, Search } from "lucide-react";
import type { AdminStudent } from "../types";
import AdminDeleteUserForm from "./AdminDeleteUserForm";

type AdminStudentsSectionProps = {
  students: AdminStudent[];
  errorMessage: string | null;
  currentUserId: string;
};

function levelBadge(level: AdminStudent["level"]) {
  switch (level) {
    case "master":
      return "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-200";
    case "advanced":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
    case "intermediate":
      return "border-amber-400/30 bg-amber-500/10 text-amber-200";
    case "beginner":
      return "border-sky-400/30 bg-sky-500/10 text-sky-200";
    default:
      return "border-white/10 bg-white/[0.03] text-slate-300";
  }
}

export default function AdminStudentsSection({
  students,
  errorMessage,
  currentUserId,
}: AdminStudentsSectionProps) {
  const [search, setSearch] = useState("");

  const filteredStudents = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) return students;

    return students.filter((student) => {
      const haystack = [
        student.full_name,
        student.email,
        student.id,
        student.level,
        student.last_active_date,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchValue);
    });
  }, [search, students]);

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Students</h2>
          <p className="mt-1 text-sm text-slate-400">
            Manage student records, update their profile data, and remove access when needed.
          </p>
        </div>
        <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-300">
          <GraduationCap size={14} />
          {students.length} records
        </p>
      </div>

      <label className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <Search size={16} className="text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search students"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </label>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Failed to load students. {errorMessage}
        </p>
      ) : filteredStudents.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
          No matching students found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[1200px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                <th className="pb-3 pr-4 font-medium">Student</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Level</th>
                <th className="pb-3 pr-4 font-medium">Streak</th>
                <th className="pb-3 pr-4 font-medium">Last active</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => {
                const isSelf = student.id === currentUserId;
                return (
                  <tr key={student.id} className="border-t border-white/10">
                    <td className="py-4 pr-4 align-top">
                      <div className="flex items-center gap-3">
                        {student.photo_url ? (
                          <img
                            src={student.photo_url}
                            alt={`${student.full_name} profile`}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-600 text-xs text-white">
                            {student.full_name ? student.full_name.charAt(0).toUpperCase() : "?"}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-white">
                            {student.full_name ?? "Unnamed student"}
                          </div>
                          <div className="mt-1 text-xs text-slate-500">{student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 align-top text-sm text-slate-300">
                      {student.email ?? "No email on file"}
                    </td>
                    <td className="py-4 pr-4 align-top">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${levelBadge(
                          student.level,
                        )}`}
                      >
                        {student.level ?? "unassigned"}
                      </span>
                    </td>
                    <td className="py-4 pr-4 align-top text-sm text-slate-300">
                      {student.streak}
                    </td>
                    <td className="py-4 pr-4 align-top text-sm text-slate-300">
                      {student.last_active_date
                        ? new Date(student.last_active_date).toLocaleString()
                        : "-"}
                    </td>
                    <td className="py-4 align-top">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/students/${student.id}`}
                          className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.06]"
                        >
                          <Pencil size={16} />
                          Edit
                        </Link>
                        {isSelf ? (
                          <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                            Cannot remove self
                          </span>
                        ) : (
                          <AdminDeleteUserForm userId={student.id} buttonLabel="Remove" />
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
