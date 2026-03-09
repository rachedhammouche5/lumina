import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../../features/utils/auth/getRole";
import TeacherRequestsSection from "./_components/TeacherRequestsSection";
import type { TeacherRequest } from "./types";

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
    .select("user_id,email,full_name,cv_url,motivation,status,created_at")
     .eq("status","pending")
    .order("created_at", { ascending: false });
   
  const teacherRequests = (requests ?? []) as TeacherRequest[];

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
