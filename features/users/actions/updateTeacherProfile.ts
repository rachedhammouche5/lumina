"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function updateTeacherProfile(formData: FormData) {
  const teacherIdValue = formData.get("teacherId");
  const fullNameValue = formData.get("fullName");
  const photoUrlValue = formData.get("photoUrl");

  const teacherId =
    typeof teacherIdValue === "string" ? teacherIdValue.trim() : "";
  const fullName =
    typeof fullNameValue === "string" ? fullNameValue.trim() : "";
  const photoUrl =
    typeof photoUrlValue === "string" ? photoUrlValue.trim() : "";

  if (!teacherId) {
    throw new Error("Missing teacher id");
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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase configuration");
  }

  const adminClient = createAdminClient(supabaseUrl, serviceRoleKey);

  const { data: targetUserResult, error: targetUserError } =
    await adminClient.auth.admin.getUserById(teacherId);

  if (targetUserError || !targetUserResult.user) {
    throw new Error("Target teacher not found");
  }

  const { error: teacherError } = await adminClient
    .from("Teacher")
    .update({
      tchr_fullname: fullName || "Unknown Teacher",
      ...(photoUrl ? { tchr_pfp: photoUrl } : {}),
    })
    .eq("tchr_id", teacherId);

  if (teacherError) {
    throw teacherError;
  }

  const { error: authError } = await adminClient.auth.admin.updateUserById(
    teacherId,
    {
      user_metadata: {
        ...(targetUserResult.user.user_metadata ?? {}),
        full_name: fullName || "Unknown Teacher",
        ...(photoUrl ? { photo_url: photoUrl } : {}),
      },
    },
  );

  if (authError) {
    console.error(
      "[updateTeacherProfile] Failed to update auth metadata:",
      authError.message,
    );
  }

  revalidatePath("/admin/teachers");
  revalidatePath("/admin");
  redirect("/admin/teachers");
}
