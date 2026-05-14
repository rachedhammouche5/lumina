"use client";

import { useMemo, useState } from "react";
import { Search, ShieldCheck } from "lucide-react";
import type { AdminUser } from "../types";
import AdminDeleteUserForm from "./AdminDeleteUserForm";

type AdminUsersSectionProps = {
  users: AdminUser[];
  errorMessage: string | null;
  currentUserId: string;
  totalUsers?: number | null;
};

type RoleFilter = "all" | "student" | "teacher" | "teacher_pending" | "admin" | "unassigned";

function roleClasses(role: string | null) {
  switch (role) {
    case "admin":
      return "border-cyan-400/30 bg-cyan-500/10 text-cyan-200";
    case "teacher":
      return "border-emerald-400/30 bg-emerald-500/10 text-emerald-200";
    case "student":
      return "border-sky-400/30 bg-sky-500/10 text-sky-200";
    case "teacher_pending":
      return "border-amber-400/30 bg-amber-500/10 text-amber-200";
    default:
      return "border-white/10 bg-white/[0.03] text-slate-300";
  }
}

function formatRole(role: string | null) {
  if (!role) return "unassigned";
  return role.replace(/_/g, " ");
}

export default function AdminUsersSection({
  users,
  errorMessage,
  currentUserId,
}: AdminUsersSectionProps) {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");

  const filteredUsers = useMemo(() => {
    const searchValue = search.trim().toLowerCase();
    return users.filter((user) => {
      const roleValue = user.role ?? "unassigned";
      const matchesRole = roleFilter === "all" || roleValue === roleFilter;
      if (!searchValue) return matchesRole;

      const haystack = [user.full_name, user.email, user.id, roleValue]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesRole && haystack.includes(searchValue);
    });
  }, [roleFilter, search, users]);

  const roleOptions: RoleFilter[] = [
    "all",
    "teacher_pending",
    "teacher",
    "student",
    "admin",
    "unassigned",
  ];

  return (
    <section className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white">Users</h2>
        <p className="mt-1 text-sm text-slate-400">
          Search accounts and remove access when needed.
        </p>
      </div>

      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 lg:min-w-[360px]">
          <Search size={16} className="text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, id, or role"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {roleOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRoleFilter(option)}
              className={`rounded-full border px-3 py-2 text-xs font-medium capitalize transition ${
                roleFilter === option
                  ? "border-slate-300 bg-white text-slate-950"
                  : "border-white/10 bg-slate-950/50 text-slate-300"
              }`}
            >
              {option.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {errorMessage ? (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          Failed to load users. {errorMessage}
        </p>
      ) : filteredUsers.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
          No matching users.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-slate-500">
                <th className="pb-3 pr-4 font-medium">Name</th>
                <th className="pb-3 pr-4 font-medium">Email</th>
                <th className="pb-3 pr-4 font-medium">Role</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const isSelf = user.id === currentUserId;
                const roleLabel = formatRole(user.role);
                return (
                  <tr key={user.id} className="border-t border-white/10">
                    <td className="py-4 pr-4 align-top">
                      <div className="font-medium text-white">{user.full_name ?? "Unnamed user"}</div>
                      <div className="mt-1 text-xs text-slate-500">{user.id}</div>
                    </td>
                    <td className="py-4 pr-4 align-top text-sm text-slate-300">
                      {user.email ?? "No email on file"}
                    </td>
                    <td className="py-4 pr-4 align-top">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${roleClasses(
                          user.role,
                        )}`}
                      >
                        {roleLabel}
                      </span>
                    </td>
                    <td className="py-4 align-top">
                      {isSelf ? (
                        <span className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-300">
                          <ShieldCheck size={16} />
                          Cannot delete self
                        </span>
                      ) : (
                        <AdminDeleteUserForm userId={user.id} buttonLabel="Delete" />
                      )}
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
