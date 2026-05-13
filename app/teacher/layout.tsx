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

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-slate-950 pt-10 pb-28 lg:pb-0">
        {children}
      </main>
    </>
  );
}
