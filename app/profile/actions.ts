"use server";

import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function deleteAccount(): Promise<{ error: string } | { success: true }> {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Unauthorized" };
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return { error: "Server configuration error" };
  }

  const admin = createAdminClient(supabaseUrl, serviceRoleKey);

  await admin.from("Student").delete().eq("std_id", user.id);
  await admin.from("Teacher").delete().eq("tchr_id", user.id);

  const { error: deleteError } = await admin.auth.admin.deleteUser(user.id);
  if (deleteError) {
    return { error: deleteError.message };
  }

  return { success: true };
}
