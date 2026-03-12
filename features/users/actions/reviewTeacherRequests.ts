"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";
type ReviewDecision = "approved" | "rejected";

export async function reviewTeacherRequest(formData: FormData) {
  const requestUserIdValue = formData.get("requestUserId");
  const decisionValue = formData.get("decision");
  const adminNoteValue = formData.get("adminNote");

  const requestUserId =
    typeof requestUserIdValue === "string" ? requestUserIdValue.trim() : "";
  const adminNote = typeof adminNoteValue === "string" ? adminNoteValue.trim() : "";

  if (!requestUserId) {
    throw new Error("Missing request user id");
  }

  if (decisionValue !== "approved" && decisionValue !== "rejected") {
    throw new Error("Invalid review decision");
  }
  const decision: ReviewDecision = decisionValue;

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

  const { data: requestRow, error: requestLookupError } = await adminClient
    .from("teacher_requests")
    .select("status")
    .eq("user_id", requestUserId)
    .single();

  if (requestLookupError) {
    throw requestLookupError;
  }

  const currentRequestStatus = requestRow?.status as string | undefined;
  if (currentRequestStatus !== "pending") {
    throw new Error("Teacher request is not pending");
  }

  const { data: targetUserResult, error: targetUserError } =
    await adminClient.auth.admin.getUserById(requestUserId);

  if (targetUserError || !targetUserResult.user) {
    throw new Error("Target user not found");
  }

  const targetUserRole = targetUserResult.user.app_metadata?.role as
    | string
    | undefined;

  
  const nextRole =
  decision === "approved"
    ? "teacher"
    : targetUserRole === "admin"
      ? "admin"
      : "teacher_pending";

  const { error: roleError } = await adminClient.auth.admin.updateUserById(
    requestUserId,
    {
      app_metadata: {
        ...(targetUserResult.user.app_metadata ?? {}),
        role: nextRole,
      },
    },
  );
  if (roleError) {
    throw roleError;
  }

  const now = new Date().toISOString();
  const { error: updateRequestError } = await adminClient
    .from("teacher_requests")
    .update({
      status: decision,
      admin_note: adminNote || null,
    
    })
    .eq("user_id", requestUserId)
    .eq("status", "pending")
    .select("user_id")
    .single();

  if (updateRequestError) {
    throw updateRequestError;
  }

  const { error: auditError } = await adminClient.from("AuditLog").insert({
    actorId: user.id,
    actorRole: actorRole,
    action:
      decision === "approved"
        ? "APPROVE_TEACHER_REQUEST"
        : "REJECT_TEACHER_REQUEST",
    targetId: requestUserId,
    targetRole: nextRole,
    createdAt: new Date(),
  });

  if (auditError) {
    console.error(
      "[reviewTeacherRequest] Failed to write audit log:",
      auditError.message,
    );
  }

  revalidatePath("/admin");
  revalidatePath("/teacher");
}
