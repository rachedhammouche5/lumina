import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { syncRoleTables } from "@/features/users/actions/syncTables";

type FinalizeBody = { teacher?: boolean };

export async function POST(request: Request) {
  let teacher = false;
  try {
    const body = (await request.json()) as FinalizeBody;
    teacher = Boolean(body?.teacher);
  } catch {
    teacher = false;
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("[auth/finalize-signup] Missing env vars.");
    return NextResponse.json({ error: "Server config error" }, { status: 500 });
  }

  const admin = createAdminClient(supabaseUrl, serviceRoleKey);
await syncRoleTables(admin, {
  userId: user.id,
  email: user.email ?? null,
  fullName: (user.user_metadata?.full_name as string | undefined) ?? null,
}, "student");

  let role = (user.app_metadata?.role as string | undefined) ?? null;

  if (!role) {
    const { error: roleError } = await admin.auth.admin.updateUserById(user.id, {
      app_metadata: { ...(user.app_metadata ?? {}), role: "student" },
    });

    if (roleError) {
      console.error("[auth/finalize-signup] Role assignment failed:", roleError.message);
      return NextResponse.json({ error: "Role assignment failed" }, { status: 500 });
    }

    role = "student";
  }

  if (teacher) {
    const { error: reqError } = await admin.from("teacher_requests").upsert(
      {
        user_id: user.id,
        full_name: user.user_metadata?.full_name ?? null,
        email: user.email ?? null,
        status: "pending",
      },
      { onConflict: "user_id" },
    );
  

    if (reqError) {
      console.error("[auth/finalize-signup] Teacher request failed:", reqError.message);
      return NextResponse.json({ error: "Teacher request failed" }, { status: 500 });
    }
      if (role !== "teacher" && role !== "admin") {
  const { error: pendingRoleError } = await admin.auth.admin.updateUserById(user.id, {
    app_metadata: { ...(user.app_metadata ?? {}), role: "teacher_pending" },
  });

  if (pendingRoleError) {
    console.error("[auth/finalize-signup] Failed to set teacher_pending role:", pendingRoleError.message);
    return NextResponse.json({ error: "Failed to update role" }, { status: 500 });
  }
}

    return NextResponse.json({ nextPath: "/teacher/apply" });
  }

  const nextPath =
    role === "admin" ? "/admin" : role === "teacher" ? "/teacher" : "/student";

  return NextResponse.json({ nextPath });
}
