import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { getRole } from "../../features/utils/auth/getRole";
import LogoutButton from "@/app/ui/LogoutButton";
export default async function adminPage() {
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

  return (
    <main className="min-h-screen pt-28 pb-24 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl text-center space-y-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex justify-center">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
