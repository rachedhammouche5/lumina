import { createClient } from "@/lib/supabase/server";
import type { TopicRow, ScoreRow } from "@/app/ui/roadmapcomp/types";

export function calculateRoadmapProgress(topics: TopicRow[] = [], scores: ScoreRow[] = []): number {
  if (!topics.length) return 0;

  const scoreByTopic = new Map(scores.map((s) => [s.tpc_id, s.score]));
  const total = topics.reduce((sum, topic) => {
    const score = scoreByTopic.get(topic.tpc_id);
    if (typeof score === "number" && score >= 50) {
      // Successful nodes contribute their score plus a 50-point completion bonus, capped at 100.
      return sum + Math.min(score + 50, 100);
    }
    return sum;
  }, 0);

  const avg = total / topics.length;
  return Math.max(0, Math.min(100, Math.round(avg)));
}

export async function dynamicRoadmapPage(skillId: string, studentId: string) {
  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("Skill")
    .select("*")
    .eq("skill_id", skillId)
    .single();

  const { data: enrollment } = await supabase
    .from("enroll")
    .select("*")
    .eq("studentId", studentId)
    .eq("skill_id", skillId)
    .single();

  const { data: topics } = await supabase
    .from("Topic")
    .select("*")
    .eq("skill_id", skillId);

  const { data: scores } = await supabase
    .from("score")
    .select("*")
    .eq("studentId", studentId);

  return {
    skill,
    enrollment,
    topics: (topics ?? []) as TopicRow[],
    scores: (scores ?? []) as ScoreRow[],
  };
}
