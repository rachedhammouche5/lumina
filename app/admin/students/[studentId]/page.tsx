import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/server";
import { getRole } from "../../../../features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import AdminShell from "../../_components/AdminShell";
import { updateStudentProfile } from "@/features/users/actions/updateStudentProfile";

type PageProps = {
  params: Promise<{ studentId: string }>;
};

export default async function StudentEditPage({ params }: PageProps) {
  const { studentId } = await params;
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
      <AdminShell title="Edit student" description="Missing Supabase configuration.">
        <p className="text-sm text-rose-200">Missing Supabase configuration for admin tools.</p>
      </AdminShell>
    );
  }

  const { data: student, error } = await adminClient
    .from("Student")
    .select("std_id,std_fullname,std_email,std_level,std_streak,std_last_activeDate,std_pfp,user_id")
    .eq("std_id", studentId)
    .maybeSingle();

  if (error) {
    return (
      <AdminShell title="Edit student" description="Could not load student data.">
        <p className="text-sm text-rose-200">{error.message}</p>
      </AdminShell>
    );
  }

  if (!student) {
    notFound();
  }

  return (
    <AdminShell
      eyebrow="Student management"
      title="Edit student"
      description="Update profile details, learning level, and streak data."
      stats={[
        {
          label: "Student ID",
          value: student.std_id,
          hint: "Read-only identifier",
        },
      ]}
    >
      <div className="max-w-2xl space-y-4">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Last active</p>
          <p className="mt-2 text-sm text-white">
            {student.std_last_activeDate
              ? new Date(student.std_last_activeDate).toLocaleString()
              : "No activity yet"}
          </p>
        </div>

        <form
          action={updateStudentProfile}
          className="space-y-4 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4"
        >
          <input type="hidden" name="studentId" value={student.std_id} />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-200">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                defaultValue={student.std_fullname}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-4 focus:ring-white/10"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                defaultValue={student.std_email}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-4 focus:ring-white/10"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="level" className="block text-sm font-medium text-slate-200">
                Level
              </label>
              <select
                id="level"
                name="level"
                defaultValue={student.std_level ?? "beginner"}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-slate-300 focus:ring-4 focus:ring-white/10"
              >
                <option value="beginner">beginner</option>
                <option value="intermediate">intermediate</option>
                <option value="advanced">advanced</option>
                <option value="master">master</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="streak" className="block text-sm font-medium text-slate-200">
                Streak
              </label>
              <input
                id="streak"
                name="streak"
                type="number"
                min="0"
                defaultValue={student.std_streak}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-4 focus:ring-white/10"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="photoUrl" className="block text-sm font-medium text-slate-200">
                Photo URL
              </label>
              <input
                id="photoUrl"
                name="photoUrl"
                defaultValue={student.std_pfp ?? ""}
                placeholder="https://..."
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-4 focus:ring-white/10"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Save changes
            </button>
            <Link
              href="/admin/students"
              className="inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/[0.06]"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
