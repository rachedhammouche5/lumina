import { GoogleGenerativeAI } from "@google/generative-ai";

export type SimplifiedAnswer = {
  question: string;
  difficulty: string;
  chosenAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
};

export type ChildEstimate = {
  tpc_id: string;
  estimated_score: number;
};

export type ChildEstimateWithTitle = ChildEstimate & { tpc_title: string };

type ChildTopic = {
  tpc_id: string;
  tpc_title: string;
  tpc_description: string | null;
};

type ChunkLike = Record<string, unknown> & {
  chunk_text?: string | null;
  content?: string | null;
};

function getChunkText(chunk: ChunkLike): string {
  const text = chunk.chunk_text ?? chunk.content ?? "";
  return typeof text === "string" ? text.trim() : "";
}

export async function estimateChildScores(
  topicTitle: string,
  percentage: number,
  answers: SimplifiedAnswer[],
  contentChunks: ChunkLike[],
  children: ChildTopic[]
): Promise<ChildEstimate[]> {
  const apiKey = process.env.GOOGLE_API_KEY ?? process.env.GEMINI_API_KEY;
  if (!apiKey || children.length === 0) return [];

  const answersText = answers
    .map(
      (a, i) =>
        `Q${i + 1} (${a.difficulty}): ${a.question}\n  → "${a.chosenAnswer}" (${a.isCorrect ? "CORRECT" : "WRONG"})${
          !a.isCorrect ? `\n  → Correct: "${a.correctAnswer}"` : ""
        }`
    )
    .join("\n\n");

  const chunksText = contentChunks
    .slice(0, 4)
    .map((c, i) => `[${i + 1}] ${getChunkText(c).slice(0, 600)}`)
    .join("\n\n");

  const childrenText = children
    .map(
      (c, i) =>
        `${i + 1}. ID: "${c.tpc_id}" | Title: "${c.tpc_title}" | Desc: "${c.tpc_description ?? ""}"`
    )
    .join("\n");

  const prompt = `You are an adaptive learning system evaluating a student's knowledge.

The student completed a quiz on topic "${topicTitle}" and scored ${percentage}%.

Their answers:
${answersText}

Relevant course content:
${chunksText || "(no content chunks available)"}

Child topics to evaluate:
${childrenText}

Based on the student's quiz performance, estimate how much of each child topic the student already knows (0–100).
Topics closely related to correctly-answered questions → higher score. Topics covering poorly-answered areas → lower score.

Respond ONLY with a JSON array, no other text:
[{"tpc_id": "...", "estimated_score": <number 0-100>}, ...]`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: process.env.AI_TUTOR_MODEL?.trim() || "gemini-2.5-flash-lite",
    });
    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const jsonStr = raw
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();
    const parsed: unknown = JSON.parse(jsonStr);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ChildEstimate =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as ChildEstimate).tpc_id === "string" &&
        typeof (item as ChildEstimate).estimated_score === "number"
    );
  } catch (err) {
    console.error("[adaptive] estimateChildScores failed:", err);
    return [];
  }
}
