'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { updateStreak as updateStreakForUser } from "@/app/features/streak/updateStreak";
import type { StreakUpdateResult } from "@/app/features/streak/types";
import { fetchChunks } from "@/lib/ai/fetch-chunks";
import { estimateChildScores, type SimplifiedAnswer, type ChildEstimateWithTitle } from "@/lib/ai/adaptive";

export async function saveQuizScore(
  topicId: string,
  skillId: string,
  score: number,
  timeTaken: number
): Promise<{ error: string } | { success: boolean }> {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) return { error: "Unauthorized" };

  const { data: student, error: studentError } = await supabase
    .from("Student")
    .select("std_id")
    .eq("user_id", user.id)
    .single();

  if (studentError || !student) return { error: "Student record not found" };

  // Don't downgrade an existing better score
  const { data: existing } = await supabase
    .from("score")
    .select("score")
    .eq("studentId", student.std_id)
    .eq("tpc_id", topicId)
    .maybeSingle();

  if (existing && existing.score >= score) {
    revalidatePath(`/skills/${skillId}`);
    revalidatePath(`/skills/${skillId}/${topicId}`);
    return { success: true };
  }

  const { error: saveError } = await supabase.from("score").upsert(
    { studentId: student.std_id, tpc_id: topicId, score, time_taken: timeTaken },
    { onConflict: "studentId,tpc_id" }
  );

  if (saveError) return { error: saveError.message };

  revalidatePath(`/skills/${skillId}`);
  revalidatePath(`/skills/${skillId}/${topicId}`);
  return { success: true };
}

export async function adaptiveUnlock(
  topicId: string,
  skillId: string,
  percentage: number,
  answers: SimplifiedAnswer[]
): Promise<ChildEstimateWithTitle[]> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: student } = await supabase
    .from("Student")
    .select("std_id")
    .eq("user_id", user.id)
    .single();
  if (!student) return [];

  const { data: allTopics } = await supabase
    .from("Topic")
    .select("tpc_id, parent_id, tpc_title, tpc_description")
    .eq("skill_id", skillId);

  if (!allTopics) return [];

  const thisTopic = allTopics.find(t => t.tpc_id === topicId);
  const directChildren = allTopics.filter(t => t.parent_id === topicId);

  if (directChildren.length === 0) {
    revalidatePath(`/skills/${skillId}`);
    return [];
  }

  const queryText = answers.map(a => a.question).join(" ");
  let chunks: Record<string, unknown>[] = [];
  try {
    chunks = await fetchChunks(queryText, { topK: 4, skillId });
  } catch {
    // continue without chunks
  }

  const estimates = await estimateChildScores(
    thisTopic?.tpc_title ?? "this topic",
    percentage,
    answers,
    chunks,
    directChildren
  );

  const enriched: ChildEstimateWithTitle[] = estimates
    .map(e => {
      const child = directChildren.find(c => c.tpc_id === e.tpc_id);
      return child ? { ...e, tpc_title: child.tpc_title } : null;
    })
    .filter((e): e is ChildEstimateWithTitle => e !== null);

  if (enriched.length > 0) {
    const childIds = directChildren.map(c => c.tpc_id);
    const { data: existingScores } = await supabase
      .from("score")
      .select("tpc_id, score")
      .eq("studentId", student.std_id)
      .in("tpc_id", childIds);

    const existingMap = new Map((existingScores ?? []).map(s => [s.tpc_id, s.score]));

    const toUpsert = enriched
      .filter(e => e.estimated_score >= 40)
      .filter(e => (existingMap.get(e.tpc_id) ?? -1) < e.estimated_score)
      .map(e => ({
        studentId: student.std_id,
        tpc_id: e.tpc_id,
        score: Math.round(e.estimated_score),
        time_taken: 0,
      }));

    if (toUpsert.length > 0) {
      await supabase.from("score").upsert(toUpsert, { onConflict: "studentId,tpc_id" });
    }
  }

  revalidatePath(`/skills/${skillId}`);
  return enriched;
}

export async function generateHint(question: string): Promise<{ hint: string } | { error: string }> {
  void question;
  return { hint: "Think carefully about the core concept this question is testing. Consider eliminating the options that are clearly unrelated first." };
}

export async function updateStreak(): Promise<StreakUpdateResult | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return updateStreakForUser(user.id);
}
