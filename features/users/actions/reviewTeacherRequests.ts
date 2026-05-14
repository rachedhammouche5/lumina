"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { syncRoleTables } from "./syncTables";

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

  let requestRow: {
    status?: string | null;
    email?: string | null;
    full_name?: string | null;
    photo_url?: string | null;
  } | null = null;

  const requestLookup = await adminClient
    .from("teacher_requests")
    .select("status,email,full_name,photo_url")
    .eq("user_id", requestUserId)
    .single();

  if (requestLookup.error) {
    if (requestLookup.error.code === "42703" || requestLookup.error.message?.includes("column") ) {
      const fallbackLookup = await adminClient
        .from("teacher_requests")
        .select("status")
        .eq("user_id", requestUserId)
        .single();

      if (fallbackLookup.error) {
        throw fallbackLookup.error;
      }

      requestRow = {
        status: fallbackLookup.data?.status ?? null,
        email: null,
        full_name: null,
        photo_url: null,
      };
    } else {
      throw requestLookup.error;
    }
  } else {
    requestRow = requestLookup.data;
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

  const nextRole: "student" | "teacher" =
    decision === "approved" ? "teacher" : "student";

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

  const profileInput = {
    userId: requestUserId,
    email: requestRow?.email ?? targetUserResult.user.email ?? null,
    fullName:
      requestRow?.full_name ??
      (typeof targetUserResult.user.user_metadata?.full_name === "string"
        ? targetUserResult.user.user_metadata.full_name
        : null) ??
      (typeof targetUserResult.user.user_metadata?.name === "string"
        ? targetUserResult.user.user_metadata.name
        : null),
    photoUrl:
      requestRow?.photo_url ??
      (typeof targetUserResult.user.user_metadata?.photo_url === "string"
        ? targetUserResult.user.user_metadata.photo_url
        : null),
  };

  await syncRoleTables(adminClient, profileInput, decision === "approved" ? "teacher" : "student");

  const fullUpdatePayload = {
    status: decision,
    admin_note: adminNote || null,
  };

  let updateRequestError: { code?: string; message: string } | null = null;

  const updateResponse = await adminClient
    .from("teacher_requests")
    .update(fullUpdatePayload)
    .eq("user_id", requestUserId)
    .eq("status", "pending");

  updateRequestError = updateResponse.error;

  if (
    updateRequestError?.code === "42703" ||
    updateRequestError?.message?.includes("admin_note")
  ) {
    const fallbackUpdateResponse = await adminClient
      .from("teacher_requests")
      .update({ status: decision })
      .eq("user_id", requestUserId)
      .eq("status", "pending");

    updateRequestError = fallbackUpdateResponse.error;
  }

  if (updateRequestError) {
    throw updateRequestError;
  }

  



  revalidatePath("/admin");
  revalidatePath("/admin/teachers");
  revalidatePath("/admin/students");
  revalidatePath("/admin/dashboards");
  revalidatePath("/teacher");
  revalidatePath("/teacher/apply");
}
