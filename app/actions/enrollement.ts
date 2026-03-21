'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function Enrollment(skillId: string, studentId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("enroll")
    .insert({ studentId, skill_id: skillId, progress: 0 });

  if (error) return { error: error.message };

  revalidatePath(`/${studentId}/skills/${skillId}`);
  return { success: true };
}
