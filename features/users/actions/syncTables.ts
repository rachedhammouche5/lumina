import type { SupabaseClient } from "@supabase/supabase-js";

type SyncRole = "student" | "teacher";

type SyncInput = {
  userId: string;
  email: string | null;
  fullName: string | null | undefined;
};

export async function syncRoleTables(
  adminClient: SupabaseClient,
  input: SyncInput,
  role: SyncRole,
) {
  const fullName = (input.fullName ?? "").trim() || "Unknown User";
  const safeEmail = input.email ?? `${input.userId}@missing-email.local`;

  if (role === "student") {
    const { error: upsertStudentError } = await adminClient
      .from("Student")
      .upsert(
        {
          std_id: input.userId,
          std_fullname: fullName,
          std_email: safeEmail,
        },
        { onConflict: "std_id" },
      );

    if (upsertStudentError) throw upsertStudentError;

    
    const { error: deleteTeacherError } = await adminClient
      .from("Teacher")
      .delete()
      .eq("tchr_id", input.userId);

    if (deleteTeacherError) throw deleteTeacherError;
    return;
  }

  const { error: upsertTeacherError } = await adminClient
    .from("Teacher")
    .upsert(
      {
        tchr_id: input.userId,
        tchr_fullname: fullName,
        tchr_email: safeEmail,
      },
      { onConflict: "tchr_id" },
    );

  if (upsertTeacherError) throw upsertTeacherError;

  const { error: deleteStudentError } = await adminClient
    .from("Student")
    .delete()
    .eq("std_id", input.userId);

  if (deleteStudentError) throw deleteStudentError;
}
