import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import NavBar from "@/app/ui/NavBar";

export default async function StudentLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ student_id: string }>;
}) {
  const { student_id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Auth error :", error.message);
    redirect("/");
  }

  if (!user || getRole(user) !== "student" || user.id !== student_id) {
    redirect("/");
  }

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4">{children}</main>
    </>
  );
}
