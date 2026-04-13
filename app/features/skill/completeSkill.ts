// app/features/skill/completeSkill.ts
"use server";

import { createClient } from "@/lib/supabase/server";

export async function completeSkill(topicId: string, skillId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data: topic } = await supabase
    .from("Topic")
    .select("parent_id")
    .eq("tpc_id", topicId)
    .eq("skill_id", skillId)
    .single();

  if (!topic || topic.parent_id !== null) return;

  const { data: student } = await supabase
    .from("Student")
    .select("std_id")
    .eq("user_id", user.id)
    .single();

  if (!student) return;

  await supabase
    .from("enroll")
    .update({ progress: 100 })
    .eq("skill_id", skillId)
    .eq("student_id", student.std_id);
}