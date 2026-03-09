import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { syncRoleTables } from "@/features/users/actions/syncTables";
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const wantsTeacher=url.searchParams.get("wants_teacher")==="1";
  if (!code) {
    console.error("[auth/callback] Missing OAuth code in callback URL.");
    return NextResponse.redirect(
      new URL("/login?error=missing_oauth_code", url.origin),
    );
  }

  const supabase = await createClient();

  const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(
    code,
  );
  if (exchangeError) {
    console.error(
      "[auth/callback] Failed to exchange OAuth code for session:",
      exchangeError.message,
    );
    return NextResponse.redirect(new URL("/login?error=oauth", url.origin));
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  let role = user.app_metadata?.role as string | undefined;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const getAdminClient = () => {
    if (!supabaseUrl || !serviceRoleKey) {
      const missingEnvVars = [
        !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
        !serviceRoleKey ? "SUPABASE_SERVICE_ROLE_KEY" : null,
      ].filter((value): value is string => value !== null);
      console.error(
        `[auth/callback] Missing required env vars: ${missingEnvVars.join(", ")}`,
      );
      return null;
    }
    return createAdminClient(supabaseUrl, serviceRoleKey);
  };

  if (wantsTeacher && role !== "teacher" && role !== "admin") {
    const admin = getAdminClient();
   

    if (!admin) {
      return NextResponse.redirect(new URL("/login?error=config", url.origin));
    }
     await syncRoleTables(admin, {
  userId: user.id,
  email: user.email ?? null,
  fullName: (user.user_metadata?.full_name as string | undefined) ?? null,
  }, "student");

    const { error: requestError } = await admin.from("teacher_requests").upsert(
      {
        user_id: user.id,
        email: user.email ?? null,
        full_name: user.user_metadata?.full_name ?? null,
        status: "pending",
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );

    if (requestError) {
      console.error(
        "[auth/callback] Teacher request failed:",
        requestError.message,
      );
      return NextResponse.redirect(
        new URL("/login?error=teacher_request", url.origin),
      );
    }

    if (role !== "teacher_pending") {
      const { error: pendingRoleError } = await admin.auth.admin.updateUserById(
        user.id,
        {
          app_metadata: {
            ...(user.app_metadata ?? {}),
            role: "teacher_pending",
          },
        },
      );

      if (pendingRoleError) {
        console.error(
          "[auth/callback] Failed to set teacher_pending role:",
          pendingRoleError.message,
        );
        return NextResponse.redirect(new URL("/login?error=role", url.origin));
      }
    }

    return NextResponse.redirect(new URL("/teacher/apply", url.origin));
  }

  // Default role assignment for users with no role.
  if (!role) {
    const admin = getAdminClient();
    if (!admin) {
      return NextResponse.redirect(new URL("/login?error=config", url.origin));
    }

    const { error: updateError } = await admin.auth.admin.updateUserById(
      user.id,
      {
        app_metadata: { ...(user.app_metadata ?? {}), role: "student" },
      },
    );

    if (updateError) {
      console.error(
        "[auth/callback] Failed to auto-assign student role:",
        updateError.message,
      );
      return NextResponse.redirect(new URL("/login?error=role", url.origin));
    }

    role = "student";
  }

  const destination =
    role === "admin"
      ? "/admin"
      : role === "teacher" || role === "teacher_pending"
        ? "/teacher"
        : "/student";

  return NextResponse.redirect(new URL(destination, url.origin));
}
