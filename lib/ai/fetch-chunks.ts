// lib/ai/fetch-chunks.ts
import { createClient } from "@/lib/supabase/server";
import { embedText } from "@/lib/ai/embed";
export async function fetchChunks(
  query: string,
  topK = 5,
  level?: "beginner" | "intermediate" | "advanced"
) {
  const supabase = await createClient();
  const embedding = await embedText(query);

  const { data, error } = await supabase.rpc("match_chunks", {
    query_embedding: embedding,
    match_count: topK,
    filter_level: level ?? null,
  });

  if (error) throw error;
  return data;
}