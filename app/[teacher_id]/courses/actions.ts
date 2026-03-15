"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addSkill(formData: {
  skl_title: string;
  skl_dscrptn: string;
  skl_duration: number;
  teacher_id: string;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Skill")
    .insert(formData)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath(`/${formData.teacher_id}/courses`);
  return { data };
}
