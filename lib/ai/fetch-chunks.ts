import { createAdminClient } from "@/lib/supabase/admin";
import { embedText } from "@/lib/ai/embed";

type FetchChunkOptions = {
  topK?: number;
  level?: "beginner" | "intermediate" | "advanced";
  skillId?: string;
};

type ChunkRecord = Record<string, unknown> & {
  skill_id?: string | null;
  chunk_text?: string | null;
  level?: string | null;
  metadata?: unknown;
  embedding?: unknown;
  similarity?: number | null;
};

type RankedChunk = ChunkRecord & {
  similarity: number;
};

function normalizeText(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
}

function parseEmbedding(embedding: unknown): number[] | null {
  if (Array.isArray(embedding)) {
    const values = embedding.filter(
      (value): value is number =>
        typeof value === "number" && Number.isFinite(value),
    );
    return values.length > 0 ? values : null;
  }

  if (typeof embedding === "string") {
    try {
      const parsed = JSON.parse(embedding);
      return parseEmbedding(parsed);
    } catch {
      return null;
    }
  }

  return null;
}

function parseMetadata(metadata: unknown): Record<string, unknown> {
  if (metadata && typeof metadata === "object" && !Array.isArray(metadata)) {
    return metadata as Record<string, unknown>;
  }

  if (typeof metadata === "string") {
    try {
      const parsed = JSON.parse(metadata);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return {};
    }
  }

  return {};
}

function cosineSimilarity(a: number[], b: number[]): number | null {
  if (a.length === 0 || a.length !== b.length) {
    return null;
  }

  let dot = 0;
  let normA = 0;
  let normB = 0;

  for (let index = 0; index < a.length; index += 1) {
    dot += a[index] * b[index];
    normA += a[index] * a[index];
    normB += b[index] * b[index];
  }

  if (normA === 0 || normB === 0) {
    return null;
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

function matchesSkill(chunk: ChunkRecord, skillId?: string): boolean {
  if (!skillId) {
    return true;
  }

  const metadata = parseMetadata(chunk.metadata);
  const candidates = [
    chunk.skill_id,
    metadata.skill_id,
    metadata.skillId,
    metadata.skl_id,
    metadata.course_id,
    metadata.courseId,
  ];

  return candidates.some((candidate) => candidate === skillId);
}

async function loadChunks({
  includeEmbeddings,
  level,
  skillId,
}: {
  includeEmbeddings: boolean;
  level?: FetchChunkOptions["level"];
  skillId?: string;
}) {
  const supabase = createAdminClient();
  let query = supabase
    .from("content_chunks")
    .select("*")
    .not("chunk_text", "is", null);

  if (level) {
    query = query.eq("level", level);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  const chunks = (data ?? []) as unknown as ChunkRecord[];

  return chunks.filter(
    (chunk) =>
      matchesSkill(chunk, skillId) &&
      (!includeEmbeddings || chunk.embedding !== null && chunk.embedding !== undefined),
  );
}

async function fallbackMatchChunks({
  queryEmbedding,
  topK,
  level,
  skillId,
}: {
  queryEmbedding: number[];
  topK: number;
  level?: FetchChunkOptions["level"];
  skillId?: string;
}): Promise<ChunkRecord[]> {
  const chunks = await loadChunks({
    includeEmbeddings: true,
    level,
    skillId,
  });

  return chunks
    .map((chunk) => {
      const parsedEmbedding = parseEmbedding(chunk.embedding);
      if (!parsedEmbedding) {
        return null;
      }

      const similarity = cosineSimilarity(queryEmbedding, parsedEmbedding);
      if (similarity === null) {
        return null;
      }

      return {
        ...chunk,
        similarity,
      } satisfies RankedChunk;
    })
    .filter((chunk): chunk is RankedChunk => chunk !== null)
    .sort((left, right) => right.similarity - left.similarity)
    .slice(0, topK)
    .map((chunk) => {
      const rankedChunk = { ...chunk };
      delete rankedChunk.embedding;
      return rankedChunk;
    });
}

async function keywordFallbackMatchChunks({
  query,
  topK,
  level,
  skillId,
}: {
  query: string;
  topK: number;
  level?: FetchChunkOptions["level"];
  skillId?: string;
}): Promise<ChunkRecord[]> {
  const queryTerms = Array.from(
    new Set(
      normalizeText(query)
        .split(/\s+/)
        .filter((term) => term.length >= 3),
    ),
  );

  const chunks = await loadChunks({
    includeEmbeddings: false,
    level,
    skillId,
  });

  if (queryTerms.length === 0) {
    return chunks.slice(0, topK).map((chunk) => ({ ...chunk }));
  }

  const rankedChunks = chunks
    .map((chunk) => {
      const text = typeof chunk.chunk_text === "string" ? normalizeText(chunk.chunk_text) : "";
      if (!text) {
        return null;
      }

      const termHits = queryTerms.reduce((score, term) => {
        if (!text.includes(term)) {
          return score;
        }

        const occurrences = text.split(term).length - 1;
        return score + Math.max(1, occurrences);
      }, 0);

      const phraseBonus = text.includes(normalizeText(query).trim()) ? 3 : 0;
      const similarity = termHits + phraseBonus;

      if (similarity <= 0) {
        return null;
      }

      return {
        ...chunk,
        similarity,
      } satisfies RankedChunk;
    })
    .filter((chunk): chunk is RankedChunk => chunk !== null)
    .sort((left, right) => right.similarity - left.similarity)
    .slice(0, topK)
    .map((chunk) => {
      const rankedChunk = { ...chunk };
      delete rankedChunk.embedding;
      return rankedChunk;
    });

  return rankedChunks;
}

export async function fetchChunks(
  query: string,
  options: FetchChunkOptions = {}
) {
  const topK = options.topK ?? 5;
  const level = options.level;
  const skillId = options.skillId;
  const supabase = createAdminClient();
  let embedding: number[] | null = null;

  try {
    embedding = await embedText(query);
  } catch (error) {
    console.error("Chunk embedding failed, switching to keyword fallback:", error);
  }

  if (embedding) {
    const attempts: Array<Record<string, unknown>> = [
      {
        query_embedding: embedding,
        match_count: topK,
        filter_level: level ?? null,
        filter_skill_id: skillId ?? null,
      },
      {
        query_embedding: embedding,
        match_count: topK,
        filter_level: level ?? null,
      },
      {
        query_embedding: embedding,
        match_count: topK,
        filter_skill_id: skillId ?? null,
      },
      {
        query_embedding: embedding,
        match_count: topK,
      },
    ];

    let lastError: Error | null = null;

    for (const params of attempts) {
      const { data, error } = await supabase.rpc("match_chunks", params);
      if (!error && Array.isArray(data) && data.length > 0) {
        return data ?? [];
      }

      if (error) {
        lastError = error;
      }
    }

    try {
      return await fallbackMatchChunks({
        queryEmbedding: embedding,
        topK,
        level,
        skillId,
      });
    } catch (fallbackError) {
      if (lastError) {
        console.error("Chunk retrieval RPC failed:", lastError);
      }
      console.error("Vector fallback failed, switching to keyword search:", fallbackError);
    }
  }

  try {
    return await keywordFallbackMatchChunks({
      query,
      topK,
      level,
      skillId,
    });
  } catch (fallbackError) {
    console.error("Keyword chunk retrieval fallback failed:", fallbackError);
    return [];
  }
}
