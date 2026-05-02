import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../../../features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import AdminShell from "../_components/AdminShell";

function isWithinDays(dateValue: string | null, days: number) {
  if (!dateValue) return false;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return false;
  return Date.now() - date.getTime() <= days * 24 * 60 * 60 * 1000;
}

function metricCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
      <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-white">{value}</p>
      <p className="mt-1 text-xs leading-5 text-slate-400">{hint}</p>
    </div>
  );
}

export default async function AdminDashboardsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (getRole(user) !== "admin") redirect("/");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminClient =
    supabaseUrl && serviceRoleKey
      ? createAdminClient(supabaseUrl, serviceRoleKey)
      : null;

  if (!adminClient) {
    return (
      <AdminShell title="Dashboards" description="Missing Supabase configuration.">
        <p className="text-sm text-rose-200">Missing Supabase configuration for admin tools.</p>
      </AdminShell>
    );
  }

  const [studentsResult, teachersResult, requestsResult, authUsersResult] = await Promise.all([
    adminClient.from("Student").select("std_last_activeDate"),
    adminClient.from("Teacher").select("*", { count: "exact", head: true }),
    adminClient
      .from("teacher_requests")
      .select("status,created_at")
      .order("created_at", { ascending: false }),
    adminClient.auth.admin.listUsers({ page: 1, perPage: 200 }),
  ]);

  const studentRows = studentsResult.data ?? [];
  const studentCount = studentRows.length;
  const activeStudents7d = studentRows.filter((row) => isWithinDays(row.std_last_activeDate, 7)).length;
  const teacherCount = teachersResult.count ?? 0;

  const requestRows = requestsResult.data ?? [];
  const totalRequests = requestRows.length;
  const pendingRequests = requestRows.filter((request) => request.status === "pending").length;
  const approvedRequests = requestRows.filter((request) => request.status === "approved").length;
  const rejectedRequests = requestRows.filter((request) => request.status === "rejected").length;
  const latestRequestAt = requestRows[0]?.created_at ?? null;

  const authUserCount =
    authUsersResult.data?.users.filter(
      (item) => !(item as { is_anonymous?: boolean }).is_anonymous,
    ).length ?? 0;

  return (
    <AdminShell
      eyebrow="Platform dashboards"
      title="Dashboards"
      description="A live, database-backed view of the platform totals and review flow."
      stats={[
        {
          label: "Students",
          value: String(studentCount),
          hint: "Rows in the Student table",
        },
        {
          label: "Teachers",
          value: String(teacherCount),
          hint: "Rows in the Teacher table",
        },
        {
          label: "Auth users",
          value: String(authUserCount),
          hint: "Accounts in Supabase Auth",
        },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {metricCard({
          label: "Teacher requests",
          value: String(totalRequests),
          hint: "All request rows in teacher_requests",
        })}
        {metricCard({
          label: "Pending requests",
          value: String(pendingRequests),
          hint: "Waiting for admin review",
        })}
        {metricCard({
          label: "Approved / rejected",
          value: `${approvedRequests} / ${rejectedRequests}`,
          hint: "Request status totals",
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold text-white">Live summary</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {metricCard({
              label: "Active students",
              value: String(activeStudents7d),
              hint: "Last active within the last 7 days",
            })}
            {metricCard({
              label: "Latest request",
              value: latestRequestAt ? new Date(latestRequestAt).toLocaleDateString() : "-",
              hint: latestRequestAt ? "Most recent teacher submission" : "No requests yet",
            })}
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-xl font-semibold text-white">Database notes</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>Teacher approvals sync auth roles and write to the Teacher table.</li>
            <li>Student edits update the Student table and auth metadata together.</li>
            <li>Request deletions only remove the request row so history stays controlled.</li>
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
