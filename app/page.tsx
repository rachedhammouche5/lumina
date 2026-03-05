import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import HomeLanding from "@/app/ui/HomeLanding";
import { getRole } from "@/features/utils/auth/getRole";


export default async function Page() {
  
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const role = getRole(user);
  if (role === "teacher") redirect("/teacher");
  if (role === "student") redirect("/student");
  if (role === "admin") redirect("/admin");

  return <HomeLanding />;
}

