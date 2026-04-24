import { createClient } from "@/lib/supabase/server";
import NavBarClient from "./NavBarClient";

type Role = "student" | "teacher" | "admin" | "guest";

export default async function NavBar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const rawRole = user?.app_metadata?.role as string | undefined;
  const knownRoles: Role[] = ["student", "teacher", "admin"];
  const role: Role = knownRoles.includes(rawRole as Role) ? (rawRole as Role) : "guest";
  return <NavBarClient role={role} />;
}
