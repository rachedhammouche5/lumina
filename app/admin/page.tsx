import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../../features/utils/auth/getRole";
import TeacherRequestsSection from "./_components/TeacherRequestsSection";
import type { TeacherRequest } from "./types";
import { createClient as createAdminClient } from "@supabase/supabase-js";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/");
  }

  const role = getRole(user);

  if (role !== "admin") {
    redirect("/");
  }

  const { data: requests, error: requestsError } = await supabase
    .from("teacher_requests")
    .select("user_id,cv_url,motivation,status,created_at")
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  const teacherRequests = (requests ?? []) as TeacherRequest[];
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (teacherRequests.length > 0 && supabaseUrl && serviceRoleKey) {
    const adminClient = createAdminClient(supabaseUrl, serviceRoleKey);
    const userResults = await Promise.all(
      teacherRequests.map(async (request) => {
        const { data, error } = await adminClient.auth.admin.getUserById(
          request.user_id,
        );
        return { id: request.user_id, user: data?.user ?? null, error };
      }),
    );

    const userMap = new Map(
      userResults
        .filter((result) => !result.error && result.user)
        .map((result) => [
          result.id,
          {
            email: result.user?.email ?? null,
            full_name:
              (result.user?.user_metadata?.name as string | undefined) ??
              null,
          },
        ]),
    );

    for (const request of teacherRequests) {
      const userInfo = userMap.get(request.user_id);
      request.email = userInfo?.email ?? null;
      request.full_name = userInfo?.full_name ?? null;
    }
  } else {
    for (const request of teacherRequests) {
      request.email = null;
      request.full_name = null;
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 pt-28 pb-24 px-4">
      <div className="mx-auto w-full max-w-5xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-300">
              Validate teacher submissions and approve or reject requests.
            </p>
          </div>
        </header>

        <TeacherRequestsSection
          requests={teacherRequests}
          errorMessage={requestsError?.message ?? null}
        />
      </div>
    </main>
  );
}
