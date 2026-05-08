import Link from "next/link";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { createClient } from "../../lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import NavBar from "../ui/NavBar";

export default async function TeacherLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  const role = getRole(user);
  if (role !== "teacher" && role !== "teacher_pending") {
    redirect("/");
  }

  const { data: requestRow, error: requestError } = await supabase
    .from("teacher_requests")
    .select("status,admin_note")
    .eq("user_id", user.id)
    .maybeSingle();

  if (requestError) {
    console.error("Teacher request fetch error:", requestError.message);
  }

  const isPending = role === "teacher_pending";
  const isRejected = isPending && requestRow?.status === "rejected";
  const rejectionReason =
    requestRow?.admin_note?.trim() || "No explanation was provided by admin.";

  return (
    <>
      <NavBar />
      <main className="pt-10 pb-28 lg:pb-0">
        {isRejected ? (
          <div className="text-red-500 p-4 text-center">
            <p className="font-semibold">Your teacher request was rejected.</p>
            <p className="text-sm">Reason: {rejectionReason}</p>
            <Link href={"/teacher/apply"} className="underline">
              Submit a new application
            </Link>
          </div>
        ) : isPending ? (
          <div className="text-amber-500 p-4 text-center">
            Your teacher application is pending admin approval. Actions are disabled until approval.
          </div>
        ) : null}

        {/* الـ children سيأخذون كامل مساحة الصفحة الآن */}
        {children}
      </main>
    </>
  );
}
