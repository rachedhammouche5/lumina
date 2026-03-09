import type { SupabaseClient } from "@supabase/supabase-js";

type SyncRole = "student" | "teacher";

type SyncInput = {
  userId: string;
  email: string | null;
  fullName: string | null | undefined;
};

function splitName(fullName: string | null | undefined) {
  const clean = (fullName ?? "").trim();
  if (!clean) return { first: "Unknown", last: "User" };

  const parts = clean.split(/\s+/);
  const first = parts[0] ?? "Unknown";
  const last = parts.slice(1).join(" ") || "User";
  return { first, last };
}

export async function syncRoleTables(
  adminClient: SupabaseClient,
  input: SyncInput,
  role: SyncRole,
) {
  const { first, last } = splitName(input.fullName);
  const safeEmail = input.email ?? `${input.userId}@missing-email.local`;

  if (role === "student") {
    const { error: upsertStudentError } = await adminClient
      .from("Student")
      .upsert(
        {
          std_id: input.userId,
          std_name: first,
          std_lastname: last,
          std_email: safeEmail,
        },
        { onConflict: "std_id" },
      );

    if (upsertStudentError) throw upsertStudentError;

    // optional exclusivity
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
        tchr_name: first,
        tchr_lastname: last,
        tchr_email: safeEmail,
      },
      { onConflict: "tchr_id" },
    );

  if (upsertTeacherError) throw upsertTeacherError;

  // optional exclusivity
  const { error: deleteStudentError } = await adminClient
    .from("Student")
    .delete()
    .eq("std_id", input.userId);

  if (deleteStudentError) throw deleteStudentError;
}
