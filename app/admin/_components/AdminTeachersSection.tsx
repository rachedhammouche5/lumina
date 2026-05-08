"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, ShieldCheck, Trash2 } from "lucide-react";
import type { AdminTeacher } from "../types";
import { deleteUserAccount } from "@/features/users/actions/deleteUserAccount";

type AdminTeachersSectionProps = {
  teachers: AdminTeacher[];
  errorMessage: string | null;
};

export default function AdminTeachersSection({
  teachers,
  errorMessage,
}: AdminTeachersSectionProps) {
  const [search, setSearch] = useState("");

  const filteredTeachers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    if (!searchValue) return teachers;

    return teachers.filter((teacher) => {
      const haystack = [teacher.full_name, teacher.email, teacher.id, teacher.photo_url]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(searchValue);
    });
  }, [search, teachers]);

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Approved teachers</h2>
        <p className="mt-1 text-sm text-slate-400">
          Keep the approved teacher roster clean, editable, and easy to scan.
        </p>
      </div>

      <label className="mb-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
        <Search size={16} className="text-slate-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search teachers"
          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        />
      </label>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Failed to load teachers. {errorMessage}
        </p>
      ) : filteredTeachers.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
          No teachers found.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                <th className="pb-3 pr-4 font-medium">Teacher</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <tr key={teacher.id} className="border-t border-white/10">
                  <td className="py-4 pr-4 align-top">
                    <div className="flex items-center gap-3">
                      {teacher.photo_url ? (
                        <img
                          src={teacher.photo_url}
                          alt={`${teacher.full_name} profile`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-slate-600 flex items-center justify-center text-xs text-white">
                          {teacher.full_name ? teacher.full_name.charAt(0).toUpperCase() : "?"}
                        </div>
                      )}
                      <div>
                        <div className="font-medium text-white">{teacher.full_name ?? "Unnamed teacher"}</div>
                        <div className="mt-1 text-xs text-slate-500">{teacher.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 pr-4 align-top text-sm text-slate-300">
                    {teacher.email ?? "No email on file"}
                  </td>
                  <td className="py-4 align-top">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/admin/teachers/${teacher.id}`}
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white transition hover:border-white/20 hover:bg-white/[0.06]"
                      >
                        <ShieldCheck size={16} />
                        Edit
                      </Link>
                      <form action={deleteUserAccount}>
                        <input type="hidden" name="userId" value={teacher.id} />
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-2 text-sm text-rose-100 transition hover:border-rose-300/40 hover:bg-rose-500/20"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
