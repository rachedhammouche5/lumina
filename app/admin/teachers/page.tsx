import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../../../features/utils/auth/getRole";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import AdminShell from "../_components/AdminShell";
import TeacherRequestsSection from "../_components/TeacherRequestsSection";
import AdminTeachersSection from "../_components/AdminTeachersSection";
import type { AdminTeacher, TeacherRequest } from "../types";

export default async function TeachersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/");
  if (getRole(user) !== "admin") redirect("/");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const adminClient =
    supabaseUrl && serviceRoleKey
      ? createAdminClient(supabaseUrl, serviceRoleKey)
      : null;

  let requestsErrorMessage: string | null = null;
  let teachersErrorMessage: string | null = null;
  let teacherRequests: TeacherRequest[] = [];
  let teachers: AdminTeacher[] = [];

  if (!adminClient) {
    requestsErrorMessage = "Missing Supabase configuration for admin tools.";
    teachersErrorMessage = requestsErrorMessage;
  } else {
    const [requestsResult, teachersResult] = await Promise.all([
      adminClient
        .from("teacher_requests")
        .select("user_id,full_name,cv_url,photo_url,gov_id_url,certification_url,motivation,status,created_at,admin_note")
        .order("created_at", { ascending: false }),
      adminClient
        .from("Teacher")
        .select("tchr_id,tchr_fullname,tchr_email,tchr_pfp,user_id")
        .order("tchr_fullname", { ascending: true }),
    ]);

    if (requestsResult.error) {
      requestsErrorMessage = requestsResult.error.message;
    } else {
      teacherRequests = (requestsResult.data ?? []).map((request) => ({
        email: null,
        full_name: request.full_name,
        user_id: request.user_id,
        photo_url: request.photo_url ?? null,
        cv_url: request.cv_url ?? null,
        gov_id_url: request.gov_id_url ?? null,
        certification_url: request.certification_url ?? null,
        motivation: request.motivation ?? null,
        status: request.status as TeacherRequest["status"],
        created_at: request.created_at ?? new Date().toISOString(),
        admin_note: request.admin_note ?? null,
        reviewed_at: null,
        reviewed_by: null,
      }));

      if (teacherRequests.length > 0) {
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
                  (result.user?.user_metadata?.full_name as string | undefined) ??
                  null,
              },
            ]),
        );

        teacherRequests = teacherRequests.map((request) => {
          const userInfo = userMap.get(request.user_id);
          return {
            ...request,
            email: userInfo?.email ?? null,
            full_name: request.full_name ?? userInfo?.full_name ?? null,
          };
        });
      }
    }

    if (teachersResult.error) {
      teachersErrorMessage = teachersResult.error.message;
    } else {
      teachers = (teachersResult.data ?? []).map((row) => ({
        id: row.tchr_id,
        full_name: row.tchr_fullname,
        email: row.tchr_email,
        photo_url: row.tchr_pfp ?? null,
        user_id: row.user_id ?? null,
      }));
    }
  }

  const {count: pendingCount} = await supabase
  .from('teacher_requests')
  .select('*', { count: 'exact', head: true }) // head: true returns only the count, not the data
  .eq('status', 'pending');


  const {count: approvedCount} = await supabase.from("Teacher")
  .select('*', { count: 'exact', head: true });

  const {count: rejectedCount} = await supabase
  .from('teacher_requests')
  .select('*', { count: 'exact', head: true }) // head: true returns only the count, not the data
  .eq('status', 'rejected');

  return (
    <AdminShell
      eyebrow="Teacher management"
      title="Teachers"
      description="Review teacher requests, move approved profiles into the Teacher table, and keep the roster clean."
      stats={[
        {
          label: "Requests",
          value: String(`${pendingCount}`),
          hint: `pending review`,
        },
        {
          label: "Approved",
          value: String(approvedCount),
          hint: "Synced to the Teacher table",
        },
        {
          label: "Rejected",
          value: String(rejectedCount),
          hint: "Kept for audit and review",
        },
      ]}
    >
      <div className="space-y-6">
        <TeacherRequestsSection
          requests={teacherRequests}
          errorMessage={requestsErrorMessage}
        />

        <AdminTeachersSection teachers={teachers} errorMessage={teachersErrorMessage} />
      </div>
    </AdminShell>
  );
}
