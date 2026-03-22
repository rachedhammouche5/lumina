import { createClient } from "@/lib/supabase/server";

export async function dynamicRoadmapPage(skillId: string, studentId?: string | null) {
  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("Skill")
    .select("*")
    .eq("skl_id", skillId)
    .single();

  const { data: topics } = await supabase
    .from("Topic")
    .select("*")
    .eq("skill_id", skillId);

  if (!studentId) {
    return {
      skill,
      enrollment: null,
      topics,
      scores: [],
    };
  }

  const { data: enrollment } = await supabase
    .from("enroll")
    .select("*")
    .eq("studentId", studentId)
    .eq("skill_id", skillId)
    .maybeSingle();

  const { data: scores } = await supabase
    .from("score")
    .select("*")
    .eq("studentId", studentId);

  return {
    skill,
    enrollment,
    topics,
    scores: scores ?? [],
  };
}
