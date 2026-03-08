import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import LogoutButton from "@/app/ui/LogoutButton";
import { getRole } from "@/features/utils/auth/getRole";

export default async function studentPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("Auth error :", error.message);
    redirect("/");
  }
  if (!user) {
    redirect("/");
  }

  const role = getRole(user);
  if (role !== "student") {
    redirect("/");
  }
  return (
    <main className="min-h-screen pt-28 pb-24 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl text-center space-y-6">
        <h1 className="text-3xl font-bold">Students Page</h1>
        <div className="flex justify-center">
        </div>
      </div>
    </main>
  );
}
