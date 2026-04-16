import { createClient } from "@/lib/supabase/server";
import type { TopicRow, ScoreRow } from "@/app/ui/roadmapcomp/types";
import { DIFFICULTY_POINTS } from "@/app/skills/[skill_id]/[topic_id]/quiz/quiz.lib";
import type { Difficulty } from "@/app/skills/[skill_id]/[topic_id]/quiz/quiz.types";

type TopicQuizRow = {
  tpc_id: string | null;
  difficulty: Difficulty;
};

export function normalizeTopicScores(
  scores: ScoreRow[] = [],
  quizRows: TopicQuizRow[] = [],
): ScoreRow[] {
  const maxPointsByTopic = new Map<string, number>();

  quizRows.forEach((quiz) => {
    if (!quiz.tpc_id) return;
    const currentMax = maxPointsByTopic.get(quiz.tpc_id) ?? 0;
    maxPointsByTopic.set(quiz.tpc_id, currentMax + DIFFICULTY_POINTS[quiz.difficulty] + 2);
  });

  return scores.map((score) => {
    const maxPoints = maxPointsByTopic.get(score.tpc_id) ?? 0;
    if (maxPoints <= 0) return score;

    const normalized = Math.round((score.score / maxPoints) * 100);
    return {
      ...score,
      score: Math.max(0, Math.min(100, normalized)),
    };
  });
}

export function calculateRoadmapProgress(topics: TopicRow[] = [], scores: ScoreRow[] = []): number {
  if (!topics.length) return 0;

  const scoreByTopic = new Map(scores.map((s) => [s.tpc_id, s.score]));
  const total = topics.reduce((sum, topic) => {
    const score = scoreByTopic.get(topic.tpc_id);
    if (typeof score === "number" && score >= 50) {
      // Each completed topic contributes its normalized 0-100 performance score.
      return sum + Math.min(score, 100);
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
