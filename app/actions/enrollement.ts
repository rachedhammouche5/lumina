'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function Enrollment(skillId: string): Promise<{ error: string } | { success: boolean }> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: "Unauthorized" };

  const { data: student, error: studentError } = await supabase
    .from("Student")
    .select("std_id")
    .eq("user_id", user.id)
    .single();

  if (studentError || !student) return { error: "Student record not found" };

  const { error } = await supabase
    .from("enroll")
    .insert({ studentId: student.std_id, skill_id: skillId, progress: 0 }); 

  if (error) return { error: error.message };

  revalidatePath(`/skills/${skillId}`);
  return { success: true };
}
