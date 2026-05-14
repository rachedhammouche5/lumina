import type { SupabaseClient } from "@supabase/supabase-js";

type SyncRole = "student" | "teacher";

type SyncInput = {
  userId: string;
  email: string | null;
  fullName: string | null | undefined;
  photoUrl?: string | null;
};

export async function syncRoleTables(
  adminClient: SupabaseClient,
  input: SyncInput,
  role: SyncRole,
) {
  const fullName = (input.fullName ?? "").trim() || "Unknown User";
  const cleanUserId = input.userId.trim();
  const safeEmail = input.email ?? `${cleanUserId}@missing-email.local`;
  const photoUrl = input.photoUrl ?? null;

  if (role === "teacher") {
    const { error } = await adminClient
      .from("Teacher")
      .upsert(
        {
          tchr_id: cleanUserId,
          user_id: cleanUserId,
          tchr_fullname: fullName,
          tchr_email: safeEmail,
          ...(photoUrl ? { tchr_pfp: photoUrl } : {}),
        },
        { onConflict: "tchr_id" },
      );

    if (error) throw error;
    return;
  }

  if (role === "student") {
    const { error } = await adminClient
      .from("Student")
      .upsert(
        {
          std_id: cleanUserId,
          user_id: cleanUserId,
          std_fullname: fullName,
          std_email: safeEmail,
          ...(photoUrl ? { std_pfp: photoUrl } : {}),
        },
        { onConflict: "std_id" },
      );

    if (error) throw error;

    await adminClient.from("Teacher").delete().eq("tchr_id", cleanUserId);
  }
}
