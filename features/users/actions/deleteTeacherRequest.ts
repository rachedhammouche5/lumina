"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function deleteTeacherRequest(formData: FormData) {
  const requestUserIdValue = formData.get("requestUserId");
  const requestUserId =
    typeof requestUserIdValue === "string" ? requestUserIdValue.trim() : "";

  if (!requestUserId) {
    throw new Error("Missing request user id");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("not authorized");
  }

  if (getRole(user) !== "admin") {
    throw new Error("not authorized");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase configuration");
  }

  const adminClient = createAdminClient(supabaseUrl, serviceRoleKey);

  const { error } = await adminClient
    .from("teacher_requests")
    .delete()
    .eq("user_id", requestUserId);

  if (error) {
    throw error;
  }

  revalidatePath("/admin");
  revalidatePath("/admin/teachers");
  revalidatePath("/admin/students");
  revalidatePath("/admin/dashboards");
  revalidatePath("/teacher/apply");
}
