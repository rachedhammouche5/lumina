import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

type TeacherRequestBody = {
  fullName?: string;
  cvUrl?: string;
  photoUrl?: string;
  govIdUrl?: string;
  certificationUrl?: string;
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
  const photoUrl = payload.photoUrl?.trim() ?? "";
  const govIdUrl = payload.govIdUrl?.trim() ?? "";
  const certificationUrl = payload.certificationUrl?.trim() ?? "";
  const motivation = payload.motivation?.trim() ?? "";

  if (!fullName || !cvUrl || !photoUrl || !govIdUrl || !certificationUrl || !motivation) {
    return NextResponse.json(
      {
        error:
          "fullName, photoUrl, govIdUrl, certificationUrl, cvUrl and motivation are required",
      },
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

  const { data: existingRequest, error: existingRequestError } = await admin
    .from("teacher_requests")
    .select("status")
    .eq("user_id", user.id)
    .maybeSingle();

  if (existingRequestError) {
    console.error(
      "[auth/teacher-request] Failed to read existing request:",
      existingRequestError.message,
    );
    return NextResponse.json(
      { error: "Failed to read request status" },
      { status: 500 },
    );
  }

  if (existingRequest?.status === "pending") {
    return NextResponse.json(
      { error: "Your request is already pending admin review." },
      { status: 409 },
    );
  }

  if (existingRequest?.status === "approved") {
    return NextResponse.json(
      { error: "Your teacher account has already been approved." },
      { status: 409 },
    );
  }

  if (existingRequest?.status === "rejected") {
    return NextResponse.json(
      { error: "Your account was not accepted." },
      { status: 409 },
    );
  }

  const { error } = await admin.from("teacher_requests").insert({
    user_id: user.id,
    email: user.email ?? null,
    full_name: fullName,
    photo_url: photoUrl,
    gov_id_url: govIdUrl,
    certification_url: certificationUrl,
    cv_url: cvUrl,
    motivation,
    status: "pending",
  });

  if (error) {
    console.error(
      "[auth/teacher-request] Failed to save request:",
      error.message,
    );
    return NextResponse.json(
      { error: "Failed to save request" },
      { status: 500 },
    );
  }

  const currentRole = user.app_metadata?.role as string | undefined;
  if (currentRole !== "teacher" && currentRole !== "admin") {
    const { error: roleError } = await admin.auth.admin.updateUserById(
      user.id,
      {
        app_metadata: { ...(user.app_metadata ?? {}), role: "teacher_pending" },
      },
    );

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

  return NextResponse.json(
    { ok: true, nextPath: "/teacher/apply" },
    { status: 200 },
  );
}
