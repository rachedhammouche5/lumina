// scripts/ingest-chunks.ts
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";  

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!  // use service role for scripts
);

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

async function embedText(text: string): Promise<number[]> {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

async function ingest() {
  // 1. Fetch all chunks that don't have an embedding yet
  const { data: chunks, error } = await supabase
    .from("content_chunks")
    .select("id, chunk_text")
    .is("embedding", null);

  if (error) throw error;
  if (!chunks || chunks.length === 0) {
    console.log("✅ No chunks to process");
    return;
  }

  console.log(`📦 Found ${chunks.length} chunks to embed...`);

  for (const chunk of chunks) {
    try {
      // 2. Generate embedding
      const embedding = await embedText(chunk.chunk_text);

      // 3. Update the row
      const { error: updateError } = await supabase
        .from("content_chunks")
        .update({ embedding: JSON.stringify(embedding) })
        .eq("id", chunk.id);

      if (updateError) throw updateError;

      console.log(`✅ Embedded chunk ${chunk.id}`);

      // small delay to avoid hitting Gemini rate limits
      await new Promise((r) => setTimeout(r, 200));

    } catch (err) {
      console.error(`❌ Failed chunk ${chunk.id}:`, err);
    }
  }

  console.log("🎉 Done!");
}

ingest();