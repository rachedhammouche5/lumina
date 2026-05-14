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
    // Use RPC to bypass PostgREST type-inference issue with uuid tchr_id column
    const { error } = await adminClient.rpc("upsert_teacher", {
      p_tchr_id: cleanUserId,
      p_user_id: cleanUserId,
      p_fullname: fullName,
      p_email: safeEmail,
      p_photo_url: photoUrl,
    });

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

    // Use RPC to avoid the same uuid vs text issue on delete
    await adminClient.rpc("delete_teacher", { p_tchr_id: cleanUserId });
  }
}
