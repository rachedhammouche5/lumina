import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

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

  if (!role) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      const missingEnvVars = [
        !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
        !serviceRoleKey ? "SUPABASE_SERVICE_ROLE_KEY" : null,
      ].filter((value): value is string => value !== null);
      console.error(
        `[auth/callback] Missing required env vars for role assignment: ${missingEnvVars.join(", ")}`,
      );
      return NextResponse.redirect(new URL("/login?error=config", url.origin));
    }

    const admin = createAdminClient(supabaseUrl, serviceRoleKey);

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
    role === "admin" ? "/admin" : role === "teacher" ? "/teacher" : "/student";

  return NextResponse.redirect(new URL(destination, url.origin));
}
