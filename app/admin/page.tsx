import { redirect } from "next/navigation";
import Link from "next/link";
import { FileText, GraduationCap, LayoutDashboard } from "lucide-react";
import { createClient } from "../../lib/supabase/server";
import { getRole } from "../../features/utils/auth/getRole";
import AdminShell from "./_components/AdminShell";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const role = getRole(user);
  if (role !== "admin") redirect("/");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminClient =
    supabaseUrl && serviceRoleKey
      ? createAdminClient(supabaseUrl, serviceRoleKey)
      : null;

  const name =
    (user.user_metadata?.name as string | undefined) ??
    (user.user_metadata?.full_name as string | undefined) ??
    user.email ??
    "Admin";

  let studentsCount = 0;
  let teachersCount = 0;
  let requestsTotal = 0;
  let pendingCount = 0;
  let approvedCount = 0;
  let rejectedCount = 0;
  let latestRequestAt: string | null = null;

  if (adminClient) {
    const [studentsResult, teachersResult, requestsResult] = await Promise.all([
      adminClient.from("Student").select("std_id", { count: "exact", head: true }),
      adminClient.from("Teacher").select("tchr_id", { count: "exact", head: true }),
      adminClient
        .from("teacher_requests")
        .select("status,created_at")
        .order("created_at", { ascending: false }),
    ]);

    studentsCount = studentsResult.count ?? 0;
    teachersCount = teachersResult.count ?? 0;

    const requests = requestsResult.data ?? [];
    requestsTotal = requests.length;
    pendingCount = requests.filter((request) => request.status === "pending").length;
    approvedCount = requests.filter((request) => request.status === "approved").length;
    rejectedCount = requests.filter((request) => request.status === "rejected").length;
    latestRequestAt = requests[0]?.created_at ?? null;
  }

  return (
    <AdminShell
      eyebrow="Home"
      title={`Welcome back, ${name.split(" ")[0]}`}
      description="Use the admin workspace to review teacher applications, manage student records, and monitor platform activity."
      stats={[
        {
          label: "Teachers",
          value: String(teachersCount),
          hint: "Approved teacher profiles",
        },
        {
          label: "Students",
          value: String(studentsCount),
          hint: "Learning accounts in the database",
        },
        {
          label: "Teacher requests",
          value: String(requestsTotal),
          hint: `${pendingCount} waiting on review`,
        },
      ]}
    >
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Everything the admin needs in one workspace
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-300">
            The navigation is split into Home, Teachers, Students, and Dashboards so you can move
            from approvals to account management without losing context.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/teachers"
              className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              <FileText size={16} />
              Teacher center
            </Link>
            <Link
              href="/admin/students"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <GraduationCap size={16} />
              Student directory
            </Link>
            <Link
              href="/admin/dashboards"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              <LayoutDashboard size={16} />
              Dashboards
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Latest activity
            </p>
            <p className="mt-2 text-sm text-slate-300">
              {latestRequestAt
                ? `Most recent teacher request: ${new Date(latestRequestAt).toLocaleString()}`
                : "No teacher requests have been submitted yet."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Pending
              </p>
              <p className="mt-2 text-3xl font-black text-white">{pendingCount}</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Approved
              </p>
              <p className="mt-2 text-3xl font-black text-white">{approvedCount}</p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Platform snapshot
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Requests: {requestsTotal} · Rejected: {rejectedCount} · Students: {studentsCount} ·
              Teachers: {teachersCount}
            </p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
