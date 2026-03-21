"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addSkill(formData: {
  skl_title: string;
  skl_dscrptn: string;
  skl_duration: number;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("Skill")
    .insert({ ...formData, teacher_id: user?.id ?? null })
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath("/teacher/skills");
  return { data };
}
