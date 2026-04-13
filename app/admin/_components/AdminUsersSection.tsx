import type { AdminUser } from "../types";
import { deleteUserAccount } from "@/features/users/actions/deleteUserAccount";

type AdminUsersSectionProps = {
  users: AdminUser[];
  errorMessage: string | null;
  currentUserId: string;
  totalUsers?: number | null;
};

function roleClasses(role: string | null) {
  switch (role) {
    case "admin":
      return "border-cyan-400/40 bg-cyan-500/10 text-cyan-300";
    case "teacher":
      return "border-emerald-400/40 bg-emerald-500/10 text-emerald-300";
    case "student":
      return "border-blue-400/40 bg-blue-500/10 text-blue-300";
    case "teacher_pending":
      return "border-amber-400/40 bg-amber-500/10 text-amber-300";
    default:
      return "border-slate-600 bg-slate-800 text-slate-300";
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
  totalUsers,
}: AdminUsersSectionProps) {
  const showingCount =
    typeof totalUsers === "number" && totalUsers > users.length
      ? `Showing ${users.length} of ${totalUsers} users.`
      : null;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-[0_20px_70px_rgba(2,6,23,0.55)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-white">User Accounts</h2>
          <p className="text-sm text-slate-400">
            Manage real accounts and remove access when needed.
          </p>
        </div>
        <span className="rounded-md border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
          {users.length}
        </span>
      </div>

      {showingCount ? (
        <p className="mb-4 text-xs text-slate-500">{showingCount}</p>
      ) : null}

      {errorMessage ? (
        <p className="rounded-md border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          Failed to load users. {errorMessage}
        </p>
      ) : users.length === 0 ? (
        <p className="rounded-md border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300">
          No user accounts found.
        </p>
      ) : (
        <ul className="space-y-3">
          <li className="hidden items-center gap-4 rounded-lg border border-slate-800 bg-slate-950/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid md:grid-cols-[2.2fr_2fr_1fr_1fr_auto]">
            <span>User</span>
            <span>Email</span>
            <span>Role</span>
            <span className="text-right">Actions</span>
          </li>
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            const roleLabel = formatRole(user.role);
            return (
              <li
                key={user.id}
                className="rounded-xl border border-slate-700 bg-slate-900 p-4"
              >
                <div className="grid gap-3 md:grid-cols-[2.2fr_2fr_1fr_1fr_auto] md:items-center">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold text-white">
                        {user.full_name ?? "Unnamed user"}
                      </h3>
                      {isSelf ? (
                        <span className="rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-xs font-semibold text-slate-200">
                          You
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-slate-400">{user.id}</p>
                  </div>

                  <div className="text-sm text-slate-200">
                    {user.email ?? "No email on file"}
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-md border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${roleClasses(
                        user.role,
                      )}`}
                    >
                      {roleLabel}
                    </span>
                  </div>

                  

                  <div className="flex justify-start md:justify-end">
                    {isSelf ? (
                      <span className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-400">
                        Cannot delete self
                      </span>
                    ) : (
                      <form action={deleteUserAccount}>
                        <input type="hidden" name="userId" value={user.id} />
                        <button
                          type="submit"
                          className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
