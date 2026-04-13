import { createClient, User } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

async function setUserRole(email: string, role: "teacher" | "student"|"admin") {

  const { data: listData, error: fetchError } =
    await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 100,
    });

  if (fetchError) {
    console.error("Error fetching users:", fetchError);
    return;
  }

  const users = listData?.users ?? [];

  const user = users.find((u: User) => u.email === email);

  if (!user) {
    console.log("User not found");
    return;
  }

  const { data: updateUser, error } =
    await supabase.auth.admin.updateUserById(user.id, {
      app_metadata: { role },
    });

  if (error) console.error("Error updating role:", error);
  else console.log(`${role} role set successfully`, updateUser);
}


//setUserRole("john.doe@example.com", "teacher");
setUserRole("radia@example.com", "admin");