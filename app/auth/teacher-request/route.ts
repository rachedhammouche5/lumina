import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

type TeacherRequestBody = {
  fullName?: string;
  cvUrl?: string;
  motivation?: string;
};

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let payload: TeacherRequestBody;
  try {
    payload = (await request.json()) as TeacherRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const fullName = payload.fullName?.trim() ?? "";
  const cvUrl = payload.cvUrl?.trim() ?? "";
  const motivation = payload.motivation?.trim() ?? "";

  if (!fullName || !cvUrl || !motivation) {
    return NextResponse.json(
      { error: "fullName, cvUrl and motivation are required" },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[auth/teacher-request] Missing required env vars.");
    return NextResponse.json({ error: "Server config error" }, { status: 500 });
  }

  const admin = createAdminClient(supabaseUrl, serviceRoleKey);
  const { error } = await admin.from("teacher_requests").upsert(
    {
      user_id: user.id,
      cv_url: cvUrl,
      motivation,
      status: "pending",
    },
    { onConflict: "user_id" },
  );

  if (error) {
    console.error("[auth/teacher-request] Failed to save request:", error.message);
    return NextResponse.json({ error: "Failed to save request" }, { status: 500 });
  }

  const currentRole = user.app_metadata?.role as string | undefined;
  if (currentRole !== "teacher" && currentRole !== "admin") {
    const { error: roleError } = await admin.auth.admin.updateUserById(user.id, {
      app_metadata: { ...(user.app_metadata ?? {}), role: "teacher_pending" },
    });

    if (roleError) {
      console.error(
        "[auth/teacher-request] Failed to set teacher_pending role:",
        roleError.message,
      );
      return NextResponse.json(
        { error: "Application saved, but failed to update role" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ ok: true, nextPath: "/teacher" }, { status: 200 });
}
