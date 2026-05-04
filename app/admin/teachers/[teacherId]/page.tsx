import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../../lib/supabase/server";
import { getRole } from "../../../../features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import AdminShell from "../../_components/AdminShell";
import { updateTeacherProfile } from "@/features/users/actions/updateTeacherProfile";

type PageProps = {
  params: Promise<{ teacherId: string }>;
};

export default async function TeacherEditPage({ params }: PageProps) {
  const { teacherId } = await params;
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
      <AdminShell title="Edit teacher" description="Missing Supabase configuration.">
        <p className="text-sm text-rose-200">Missing Supabase configuration for admin tools.</p>
      </AdminShell>
    );
  }

  const { data: teacher, error } = await adminClient
    .from("Teacher")
    .select("tchr_id,tchr_fullname,tchr_email,tchr_pfp")
    .eq("tchr_id", teacherId)
    .maybeSingle();

  if (error) {
    return (
      <AdminShell title="Edit teacher" description="Could not load teacher data.">
        <p className="text-sm text-rose-200">{error.message}</p>
      </AdminShell>
    );
  }

  if (!teacher) {
    notFound();
  }

  return (
    <AdminShell
      eyebrow="Teacher management"
      title="Edit teacher"
      description="Update the teacher's display name and profile image."
      stats={[
        {
          label: "Teacher ID",
          value: teacher.tchr_id,
          hint: "Read-only identifier",
        },
      ]}
    >
      <div className="max-w-2xl space-y-4">
        <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Email</p>
          <p className="mt-2 text-sm text-white">{teacher.tchr_email}</p>
        </div>

        <form action={updateTeacherProfile} className="space-y-4 rounded-[1.5rem] border border-white/10 bg-slate-950/60 p-4">
          <input type="hidden" name="teacherId" value={teacher.tchr_id} />

          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-slate-200">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              defaultValue={teacher.tchr_fullname}
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
              defaultValue={teacher.tchr_pfp ?? ""}
              placeholder="https://..."
              className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-slate-300 focus:ring-4 focus:ring-white/10"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="inline-flex items-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 transition hover:opacity-90"
            >
              Save changes
            </button>
            <Link
              href="/admin/teachers"
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
