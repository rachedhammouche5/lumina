'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { updateStreak as updateStreakForUser } from "@/app/features/streak/updateStreak";
import type { StreakUpdateResult } from "@/app/features/streak/types";

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

  const { error } = await supabase.from("score").upsert(
    {
      studentId: student.std_id,
      tpc_id: topicId,
      score,
      time_taken: timeTaken,
    },
    { onConflict: "studentId,tpc_id" }
  );

  if (error) return { error: error.message };

  revalidatePath(`/skills/${skillId}/${topicId}`);
  return { success: true };
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
