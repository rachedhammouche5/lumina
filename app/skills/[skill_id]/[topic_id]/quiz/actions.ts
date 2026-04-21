'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { updateStreak as updateStreakForUser } from "@/app/features/streak/updateStreak";
import type { StreakUpdateResult } from "@/app/features/streak/types";
import Groq from "groq-sdk";

const hintCache = new Map<string, string>();

export async function generateHint(question: string): Promise<{ hint: string } | { error: string }> {
  if (hintCache.has(question)) {
    console.log("SERVER: returning cached hint");
    return { hint: hintCache.get(question)! };
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // free, very fast
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: `You are a helpful tutor. A student is stuck on this quiz question and needs a hint.

Question: ${question}

Write a hint that:
- Briefly explains the concept being tested (1-2 sentences)
- Subtly points toward the correct answer without stating it directly
- Feels like a tutor whispering "remember that..." or "think about how..."
- Is specific to this exact question, never generic
- Never says phrases like "think about the core concept" or "consider eliminating options"

Example of a GOOD hint for "What type of error occurs when the code violates language rules?":
"Syntax errors are mistakes in the structure or grammar of your code — like missing a semicolon or a bracket. These are usually caught by the IDE before the program even runs."

Return only the hint text, nothing else.`,
        },
      ],
    });

    const hint = completion.choices[0]?.message?.content?.trim() ?? "";
    if (!hint) return { error: "Empty hint returned" };

    hintCache.set(question, hint);
    console.log("SERVER: hint generated via Groq:", hint);
    return { hint };

  } catch (error) {
    console.error("SERVER generateHint error:", error);
    return { error: "Failed to generate hint" };
  }
}


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

  // Save score for the current topic
  const { error: saveError } = await supabase.from("score").upsert(
    {
      studentId: student.std_id,
      tpc_id: topicId,
      score,
      time_taken: timeTaken,
    },
    { onConflict: "studentId,tpc_id" }
  );

  if (saveError) return { error: saveError.message };

  // If the score is passing (>=50), propagate to all child topics
  if (score >= 50) {
    // Get all child topics recursively
    const { data: childTopics, error: childrenError } = await supabase
      .from("Topic")
      .select("tpc_id")
      .eq("skill_id", skillId);

    if (childrenError) {
      console.error("Error fetching child topics:", childrenError);
    } else {
      // Build a map of parent relationships
      const topicMap = new Map<string, string | null>();
      childTopics?.forEach(t => {
        // We need parent_id, but the select only has tpc_id
        // Let's fetch with parent_id
      });

      // Better to fetch with parent_id
      const { data: allTopics, error: allError } = await supabase
        .from("Topic")
        .select("tpc_id, parent_id")
        .eq("skill_id", skillId);

      if (!allError && allTopics) {
        const childrenMap = new Map<string, string[]>();
        allTopics.forEach(t => {
          const parent = t.parent_id;
          if (parent) {
            const list = childrenMap.get(parent) || [];
            list.push(t.tpc_id);
            childrenMap.set(parent, list);
          }
        });

        // Recursive function to get all descendants
        function getAllDescendants(topicId: string): string[] {
          const directChildren = childrenMap.get(topicId) || [];
          let all: string[] = [...directChildren];
          directChildren.forEach(child => {
            all = all.concat(getAllDescendants(child));
          });
          return all;
        }

        const childTopicIds = getAllDescendants(topicId);

        // Get current scores for children
        const { data: existingScores, error: scoresError } = await supabase
          .from("score")
          .select("tpc_id, score")
          .eq("studentId", student.std_id)
          .in("tpc_id", childTopicIds);

        if (!scoresError && existingScores) {
          const scoresToUpsert = childTopicIds
            .filter(childId => {
              const existing = existingScores.find(s => s.tpc_id === childId);
              return !existing || existing.score < score;
            })
            .map(childId => ({
              studentId: student.std_id,
              tpc_id: childId,
              score,
              time_taken: 0,
            }));

          if (scoresToUpsert.length > 0) {
            const { error: propagateError } = await supabase
              .from("score")
              .upsert(scoresToUpsert, { onConflict: "studentId,tpc_id" });

            if (propagateError) {
              console.error("Error propagating scores to children:", propagateError);
            }
          }
        }
      }
    }
  }

  revalidatePath(`/skills/${skillId}`);
  revalidatePath(`/skills/${skillId}/${topicId}`);
  return { success: true };
}




export async function updateStreak(): Promise<StreakUpdateResult | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  return updateStreakForUser(user.id);
}
