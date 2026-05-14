import { createClient } from "@/lib/supabase/server";
import NavBarClient from "./NavBarClient";

type Role = "student" | "teacher" | "admin" | "guest";

export default async function NavBar() {
  let role: Role = "guest";
  let locked = false;

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const rawRole = user?.app_metadata?.role as string | undefined;
    const knownRoles: Role[] = ["student", "teacher", "admin"];
    role = knownRoles.includes(rawRole as Role) ? (rawRole as Role) : "guest";
    locked = rawRole === "teacher_pending";
  } catch {
    // no request context during prerendering — default to guest
  }

  return <NavBarClient role={locked ? "teacher" : role} locked={locked} />;
}
