import { GoogleGenerativeAI } from "@google/generative-ai";
import { fetchChunks } from "@/lib/ai/fetch-chunks";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RetrievedChunk = Record<string, unknown> & {
  chunk_text?: string | null;
  content?: string | null;
  text?: string | null;
  metadata?: unknown;
  similarity?: number | null;
};

type TutorModel = ReturnType<GoogleGenerativeAI["getGenerativeModel"]>;
type TutorStream = Awaited<ReturnType<TutorModel["generateContentStream"]>>;
type TutorFallbackReason =
  | "quota_exceeded"
  | "missing_configuration"
  | "generation_unavailable";

type TutorResponse =
  | {
      mode: "live";
      model: string;
      notice: string;
      chunks: RetrievedChunk[];
      streamResult: TutorStream;
    }
  | {
      mode: "retrieval_fallback";
      model: string | null;
      notice: string;
      reason: TutorFallbackReason;
      chunks: RetrievedChunk[];
      text: string;
    };

const DEFAULT_TUTOR_MODEL = process.env.AI_TUTOR_MODEL ?? "gemini-2.5-flash-lite";

let cachedModel: TutorModel | null = null;
let cachedModelName: string | null = null;

function getTutorModel() {
  const apiKey = process.env.GOOGLE_API_KEY ?? process.env.GEMINI_API_KEY;
  const modelName = process.env.AI_TUTOR_MODEL?.trim() || DEFAULT_TUTOR_MODEL;

  if (!apiKey) {
    throw new Error("Missing GOOGLE_API_KEY (or GEMINI_API_KEY) for AI Tutor.");
  }

  if (cachedModel && cachedModelName === modelName) {
    return {
      model: cachedModel,
      modelName,
    };
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  cachedModel = genAI.getGenerativeModel({ model: modelName });
  cachedModelName = modelName;

  return {
    model: cachedModel,
    modelName,
  };
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

function getChunkText(chunk: RetrievedChunk): string {
  const text = chunk.content ?? chunk.chunk_text ?? chunk.text ?? "";
  return typeof text === "string" ? text.trim() : "";
}

function getChunkLabel(chunk: RetrievedChunk, index: number): string {
  const metadata = parseMetadata(chunk.metadata);
  const titleCandidates = [
    metadata.title,
    metadata.content_title,
    metadata.topic_title,
    metadata.lesson_title,
  ];

  const matchedTitle = titleCandidates.find(
    (value): value is string => typeof value === "string" && value.trim().length > 0,
  );

  const similarity =
    typeof chunk.similarity === "number"
      ? `${Math.round(chunk.similarity * 100)}% match`
      : "course match";

  return matchedTitle
    ? `Chunk ${index + 1} - ${matchedTitle} (${similarity})`
    : `Chunk ${index + 1} - ${similarity}`;
}

function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

function getErrorStatus(error: unknown): number | null {
  if (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  ) {
    return error.status;
  }

  return null;
}

function getFallbackReason(error: unknown): TutorFallbackReason {
  const status = getErrorStatus(error);
  const message = error instanceof Error ? error.message.toLowerCase() : "";

  if (status === 429 || message.includes("quota")) {
    return "quota_exceeded";
  }

  if (message.includes("missing google_api_key") || message.includes("missing gemini_api_key")) {
    return "missing_configuration";
  }

  return "generation_unavailable";
}

function getFallbackNotice(reason: TutorFallbackReason) {
  if (reason === "quota_exceeded") {
    return "Live AI mode is paused because the Gemini quota for this project is exhausted. Course retrieval backup is active.";
  }

  if (reason === "missing_configuration") {
    return "Live AI mode is not configured yet because the Gemini API key is missing. Course retrieval backup is active.";
  }

  return "Live AI mode hit a temporary model issue. Course retrieval backup is active.";
}

function buildFallbackResponse({
  question,
  chunks,
  reason,
}: {
  question: string;
  chunks: RetrievedChunk[];
  reason: TutorFallbackReason;
}) {
  const intro = getFallbackNotice(reason);

  if (chunks.length === 0) {
    return `${intro}

I could not find matching passages in your uploaded course material for:
"${question}"

Try asking with a tighter keyword, lesson title, or concept name.`;
  }

  const chunkDigest = chunks
    .slice(0, 3)
    .map((chunk, index) => {
      const text = truncateText(getChunkText(chunk).replace(/\s+/g, " "), 320);
      return `**${getChunkLabel(chunk, index)}**
${text}`;
    })
    .join("\n\n");

  return `${intro}

I searched your uploaded course material for:
"${question}"

Here are the most relevant passages I found:

${chunkDigest}

Ask about one topic at a time if you want a tighter retrieval match.`;
}

function toGeminiMessages(messages: ChatMessage[]) {
  return messages.map((message) => ({
    role: message.role === "assistant" ? "model" : "user",
    parts: [{ text: message.content }],
  }));
}

export async function streamTutorResponse({
  messages,
  systemPrompt,
  skillId,
}: {
  messages: ChatMessage[];
  systemPrompt?: string;
  skillId?: string | null;
}): Promise<TutorResponse> {
  const lastQuestion = [...messages]
    .reverse()
    .find((message) => message.role === "user")?.content;

  let chunks: RetrievedChunk[] = [];

  if (lastQuestion) {
    try {
      chunks = await fetchChunks(lastQuestion, {
        topK: 5,
        skillId: skillId ?? undefined,
      });
    } catch (error) {
      console.error("AI Tutor chunk retrieval failed:", error);
    }
  }

  const context = chunks.length
    ? chunks
        .slice(0, 4)
        .map((chunk, index: number) => {
          const text = truncateText(getChunkText(chunk).replace(/\s+/g, " "), 900);
          return `[Chunk ${index + 1}] ${text}`;
        })
        .join("\n\n")
    : "No matching chunks were found.";

  const promptHeader =
    systemPrompt ??
    "You are Lumina AI Tutor, a helpful and personalized coding tutor.";

  const fullPrompt = [
    {
      role: "user",
      parts: [
        {
          text: `${promptHeader}

Use the retrieved context below when answering questions about Lumina course content.
Prefer the retrieved context over general knowledge whenever it is relevant.
If the answer is not in the retrieved context, say clearly that you could not find it in the uploaded course material.
When you rely on the retrieved context, mention the relevant chunk number(s).

Retrieved context:
${context}`,
        },
      ],
    },
    ...toGeminiMessages(messages),
  ];

  try {
    const { model, modelName } = getTutorModel();
    const streamResult = await model.generateContentStream({
      contents: fullPrompt,
    });

    return {
      mode: "live",
      model: modelName,
      notice: "Live AI mode is active and grounded in your stored course chunks.",
      chunks,
      streamResult,
    };
  } catch (error) {
    const reason = getFallbackReason(error);

    console.error("AI Tutor generation failed, using retrieval fallback:", error);

    return {
      mode: "retrieval_fallback",
      model: cachedModelName,
      notice: getFallbackNotice(reason),
      reason,
      chunks,
      text: buildFallbackResponse({
        question: lastQuestion ?? "your course material",
        chunks,
        reason,
      }),
    };
  }
}
