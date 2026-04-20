import { GoogleGenerativeAI } from "@google/generative-ai";

type EmbeddingModel = ReturnType<GoogleGenerativeAI["getGenerativeModel"]>;

let cachedEmbeddingModel: EmbeddingModel | null = null;

function getEmbeddingModel() {
  if (cachedEmbeddingModel) {
    return cachedEmbeddingModel;
  }

  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY) for embeddings.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  cachedEmbeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
  return cachedEmbeddingModel;
}

export async function embedText(text: string): Promise<number[]> {
  const result = await getEmbeddingModel().embedContent(text);
  return result.embedding.values;
}


