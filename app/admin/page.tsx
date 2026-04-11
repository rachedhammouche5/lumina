import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../../features/utils/auth/getRole";
import Link from "next/link";
import { Users, FileText, ShieldCheck, ArrowRight } from "lucide-react";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  const role = getRole(user);
  if (role !== "admin") redirect("/");

  const name =
    (user.user_metadata?.name as string | undefined) ??
    (user.user_metadata?.full_name as string | undefined) ??
    user.email ??
    "Admin";

  // Fetch pending requests count for the badge
  const { count: pendingCount } = await supabase
    .from("teacher_requests")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-24 px-4">
      <div className="mx-auto w-full max-w-5xl space-y-12">
        {/* Welcome Header */}
        <header className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 text-sm font-medium tracking-widest uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Panel</span>
          </div>
          <h1 className="text-4xl font-bold text-white">
            Welcome back,{" "}
            <span className="text-indigo-400">{name.split(" ")[0]}</span> 👋
          </h1>
          <p className="text-slate-400 text-base max-w-xl">
            Manage your platform from here. Review teacher submissions, approve
            or reject requests, and oversee all registered users.
          </p>
        </header>

        {/* Quick-access cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Link
            href="/admin/requests"
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-7 hover:border-indigo-500/60 hover:bg-slate-800/70 transition-all duration-200"
          >
            {/* pending badge */}
            {(pendingCount ?? 0) > 0 && (
              <span className="absolute top-5 right-5 inline-flex items-center justify-center rounded-full bg-indigo-500 px-2.5 py-0.5 text-xs font-semibold text-white">
                {pendingCount} pending
              </span>
            )}

            <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-indigo-500/10 p-3">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>

            <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-indigo-300 transition-colors">
              Teacher Requests
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Review and validate incoming teacher applications. Approve or
              reject submissions with one click.
            </p>

            <div className="flex items-center gap-1.5 text-indigo-400 text-sm font-medium group-hover:gap-2.5 transition-all">
              View requests <ArrowRight className="w-4 h-4" />
            </div>
          </Link>

          <Link
            href="/admin/users"
            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-7 hover:border-violet-500/60 hover:bg-slate-800/70 transition-all duration-200"
          >
            <div className="mb-5 inline-flex items-center justify-center rounded-xl bg-violet-500/10 p-3">
              <Users className="w-6 h-6 text-violet-400" />
            </div>

            <h2 className="text-xl font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
              User Management
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Browse all registered users, inspect their roles, and manage
              account permissions across the platform.
            </p>

            <div className="flex items-center gap-1.5 text-violet-400 text-sm font-medium group-hover:gap-2.5 transition-all">
              Manage users <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}