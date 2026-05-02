import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../../../features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import AdminShell from "../_components/AdminShell";
import AdminStudentsSection from "../_components/AdminStudentsSection";
import type { AdminStudent } from "../types";

export default async function StudentsPage() {
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

  let students: AdminStudent[] = [];
  let errorMessage: string | null = null;

  if (!adminClient) {
    errorMessage = "Missing Supabase configuration for admin tools.";
  } else {
    const { data, error } = await adminClient
      .from("Student")
      .select(
        "std_id,std_fullname,std_email,std_level,std_streak,std_last_activeDate,std_pfp,user_id",
      )
      .order("std_fullname", { ascending: true });

    if (error) {
      errorMessage = error.message;
    } else {
      students = (data ?? []).map((row) => ({
        id: row.std_id,
        full_name: row.std_fullname,
        email: row.std_email,
        level: row.std_level,
        streak: row.std_streak,
        last_active_date: row.std_last_activeDate,
        photo_url: row.std_pfp,
        user_id: row.user_id ?? null,
      }));
    }
  }

  return (
    <AdminShell
      eyebrow="Student management"
      title="Students"
      description="Browse every student record with quick edit and remove controls."
      stats={[
        {
          label: "Students",
          value: String(students.length),
          hint: "Rows loaded from the Student table",
        },
      ]}
    >
      <AdminStudentsSection
        students={students}
        errorMessage={errorMessage}
        currentUserId={user.id}
      />
    </AdminShell>
  );
}
