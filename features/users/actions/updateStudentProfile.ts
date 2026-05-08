"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";

const allowedLevels = new Set(["beginner", "intermediate", "advanced", "master"]);

export async function updateStudentProfile(formData: FormData) {
  const studentIdValue = formData.get("studentId");
  const fullNameValue = formData.get("fullName");
  const emailValue = formData.get("email");
  const levelValue = formData.get("level");
  const streakValue = formData.get("streak");
  const photoUrlValue = formData.get("photoUrl");

  const studentId =
    typeof studentIdValue === "string" ? studentIdValue.trim() : "";
  const fullName =
    typeof fullNameValue === "string" ? fullNameValue.trim() : "";
  const email = typeof emailValue === "string" ? emailValue.trim() : "";
  const level = typeof levelValue === "string" ? levelValue.trim() : "";
  const streakNumber =
    typeof streakValue === "string" && streakValue.trim() !== ""
      ? Number(streakValue)
      : NaN;
  const photoUrl =
    typeof photoUrlValue === "string" ? photoUrlValue.trim() : "";

  if (!studentId) throw new Error("Missing student id");
  if (!fullName) throw new Error("Missing full name");
  if (!email) throw new Error("Missing email");
  if (!allowedLevels.has(level)) throw new Error("Invalid student level");
  if (!Number.isFinite(streakNumber) || streakNumber < 0) {
    throw new Error("Invalid streak value");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("not authorized");
  if (getRole(user) !== "admin") throw new Error("not authorized");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error("Missing Supabase configuration");
  }

  const adminClient = createAdminClient(supabaseUrl, serviceRoleKey);

  const { data: targetUserResult, error: targetUserError } =
    await adminClient.auth.admin.getUserById(studentId);

  if (targetUserError || !targetUserResult.user) {
    throw new Error("Target student not found");
  }

  const { error: studentError } = await adminClient
    .from("Student")
    .update({
      std_fullname: fullName,
      std_email: email,
      std_level: level as
        | "beginner"
        | "intermediate"
        | "advanced"
        | "master",
      std_streak: streakNumber,
      ...(photoUrl ? { std_pfp: photoUrl } : {}),
    })
    .eq("std_id", studentId);

  if (studentError) {
    throw studentError;
  }

  const { error: authError } = await adminClient.auth.admin.updateUserById(
    studentId,
    {
      email,
      user_metadata: {
        ...(targetUserResult.user.user_metadata ?? {}),
        full_name: fullName,
        ...(photoUrl ? { photo_url: photoUrl } : {}),
      },
    },
  );

  if (authError) {
    console.error(
      "[updateStudentProfile] Failed to update auth metadata:",
      authError.message,
    );
  }

  revalidatePath("/admin");
  revalidatePath("/admin/students");
  revalidatePath("/admin/dashboards");
  revalidatePath("/admin/students/[studentId]");
  redirect("/admin/students");
}
