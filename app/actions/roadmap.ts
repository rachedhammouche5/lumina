import { createClient } from "@/lib/supabase/server";
import type { Tables } from "@/lib/database.types";

export async function dynamicRoadmapPage(skillId: string, studentId: string) {
  const supabase = await createClient();

  const [skillResult, enrollmentResult, topicsResult, scoresResult] = await Promise.all([
    supabase.from("Skill").select("*").eq("skl_id", skillId).maybeSingle(),
    supabase
      .from("enroll")
      .select("*")
      .eq("studentId", studentId)
      .eq("skill_id", skillId)
      .maybeSingle(),
    supabase.from("Topic").select("*").eq("skill_id", skillId),
    supabase.from("score").select("*").eq("studentId", studentId),
  ]);

  return {
    skill: skillResult.data as Tables<"Skill"> | null,
    enrollment: enrollmentResult.data as Tables<"enroll"> | null,
    topics: (topicsResult.data ?? []) as Tables<"Topic">[],
    scores: (scoresResult.data ?? []) as Tables<"score">[],
  };
}
