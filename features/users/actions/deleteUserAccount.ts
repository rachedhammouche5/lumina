"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function deleteUserAccount(formData: FormData) {
  const userIdValue = formData.get("userId");
  const confirmDeleteValue = formData.get("confirmDelete");
  const userId =
    typeof userIdValue === "string" ? userIdValue.trim() : "";
  const isConfirmed =
    confirmDeleteValue === "on" ||
    confirmDeleteValue === "true" ||
    confirmDeleteValue === "1";

  if (!userId) {
    throw new Error("Missing user id");
  }

  if (!isConfirmed) {
    throw new Error("Please confirm account deletion");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("not authorized");
  }

  const actorRole = getRole(user);
  if (actorRole !== "admin") {
    throw new Error("not authorized");
  }

  if (user.id === userId) {
    throw new Error("Admins cannot delete themselves");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase configuration");
  }

  const adminClient = createAdminClient(supabaseUrl, serviceRoleKey);

  await adminClient.from("teacher_requests").delete().eq("user_id", userId);
  const { error: deleteStudentError } = await adminClient
    .from("Student")
    .delete()
    .eq("std_id", userId);

  if (deleteStudentError) {
    console.error(
      "[deleteUserAccount] Failed to delete Student row:",
      deleteStudentError.message,
    );
  }

  const { error: deleteTeacherError } = await adminClient
    .from("Teacher")
    .delete()
    .eq("tchr_id", userId);

  if (deleteTeacherError) {
    console.error(
      "[deleteUserAccount] Failed to delete Teacher row:",
      deleteTeacherError.message,
    );
  }

  const { error: deleteError } = await adminClient.auth.admin.deleteUser(
    userId,
  );

  if (deleteError) {
    throw deleteError;
  }

  revalidatePath("/admin");
  revalidatePath("/admin/teachers");
  revalidatePath("/admin/students");
  revalidatePath("/admin/dashboards");
}
