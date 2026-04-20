import { readFile } from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createAdminClient } from "@/lib/supabase/admin";
import { embedText } from "@/lib/ai/embed";
import { ContentType } from "@/lib/database.types";

type IndexContentInput = {
  contentId: string;
  skillId: string;
  topicId: string;
  level?: string | null;
  title: string;
  type: ContentType;
  value: string | null;
};

type ChunkRecord = {
  content_id: string;
  skill_id: string;
  level: string | null;
  chunk_index: number;
  chunk_text: string;
  token_count: number;
  embedding: string;
  metadata: Record<string, unknown>;
};

const CHUNK_SIZE = 1200;
const CHUNK_OVERLAP = 200;
const MAX_PDF_TEXT_CHARS = 70_000;
const MAX_AUDIO_TEXT_CHARS = 70_000;
const MAX_VIDEO_TEXT_CHARS = 70_000;

let cachedTextModel: ReturnType<GoogleGenerativeAI["getGenerativeModel"]> | null = null;

function estimateTokenCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length;
}

function chunkText(text: string, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const chunks: string[] = [];
  let start = 0;

  while (start < normalized.length) {
    const end = Math.min(normalized.length, start + chunkSize);
    const chunk = normalized.slice(start, end).trim();
    if (chunk) {
      chunks.push(chunk);
    }

    if (end === normalized.length) {
      break;
    }

    start = Math.max(0, end - overlap);
  }

  return chunks;
}

function getTextModel() {
  if (cachedTextModel) {
    return cachedTextModel;
  }

  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY (or GOOGLE_API_KEY) for PDF extraction.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  cachedTextModel = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
  return cachedTextModel;
}

async function extractPdfText(relativePath: string) {
  if (!relativePath.startsWith("/uploads/pdf/")) {
    throw new Error("Unsupported PDF path.");
  }

  const safePath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  const absolutePath = path.join(process.cwd(), "public", safePath);
  const fileBuffer = await readFile(absolutePath);

  const response = await getTextModel().generateContent([
    "Extract readable plain text from this PDF. Return only text content with line breaks.",
    {
      inlineData: {
        mimeType: "application/pdf",
        data: fileBuffer.toString("base64"),
      },
    },
  ]);

  const text = response.response.text().trim();
  return text.slice(0, MAX_PDF_TEXT_CHARS);
}

function getAudioMimeType(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".mp3") return "audio/mpeg";
  if (ext === ".wav") return "audio/wav";
  if (ext === ".m4a") return "audio/mp4";
  if (ext === ".ogg") return "audio/ogg";
  return "audio/mpeg";
}

async function extractAudioText(relativePath: string) {
  if (!relativePath.startsWith("/uploads/audio/")) {
    throw new Error("Unsupported audio path.");
  }

  const safePath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
  const absolutePath = path.join(process.cwd(), "public", safePath);
  const fileBuffer = await readFile(absolutePath);

  const response = await getTextModel().generateContent([
    "Transcribe this audio into clean plain text. Return only the transcript.",
    {
      inlineData: {
        mimeType: getAudioMimeType(absolutePath),
        data: fileBuffer.toString("base64"),
      },
    },
  ]);

  return response.response.text().trim().slice(0, MAX_AUDIO_TEXT_CHARS);
}

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'");
}

function extractYouTubeId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").trim();
    }

    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }

  return null;
}

async function fetchYoutubeTranscript(videoId: string) {
  const transcriptUrl = `https://www.youtube.com/api/timedtext?lang=en&v=${encodeURIComponent(videoId)}`;
  const response = await fetch(transcriptUrl);
  if (!response.ok) {
    return "";
  }

  const xml = await response.text();
  const lines = Array.from(xml.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g))
    .map((match) => decodeXmlEntities(match[1]).replace(/\s+/g, " ").trim())
    .filter(Boolean);

  return lines.join(" ").slice(0, MAX_VIDEO_TEXT_CHARS);
}

async function fetchYoutubeTitle(videoUrl: string) {
  const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
  const response = await fetch(oEmbedUrl);
  if (!response.ok) {
    return "";
  }

  const payload = (await response.json()) as { title?: string };
  return payload.title?.trim() ?? "";
}

async function extractText(content: IndexContentInput) {
  if (!content.value) {
    return "";
  }

  if (content.type === "docs") {
    return content.value.trim();
  }

  if (content.type === "pdf" && content.value.startsWith("/uploads/pdf/")) {
    return extractPdfText(content.value);
  }

  if (content.type === "audio" && content.value.startsWith("/uploads/audio/")) {
    return extractAudioText(content.value);
  }

  if (content.type === "video") {
    const videoId = extractYouTubeId(content.value);
    if (!videoId) {
      return "";
    }

    const transcript = await fetchYoutubeTranscript(videoId);
    if (transcript) {
      return transcript;
    }

    const title = await fetchYoutubeTitle(content.value);
    return title ? `Video title: ${title}` : "";
  }

  return "";
}

async function buildChunkRows(content: IndexContentInput): Promise<ChunkRecord[]> {
  const extracted = await extractText(content);
  const chunks = chunkText(extracted);

  const rows: ChunkRecord[] = [];
  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index];
    const embedding = await embedText(chunk);

    rows.push({
      content_id: content.contentId,
      skill_id: content.skillId,
      level: content.level ?? null,
      chunk_index: index,
      chunk_text: chunk,
      token_count: estimateTokenCount(chunk),
      embedding: JSON.stringify(embedding),
      metadata: {
        title: content.title,
        type: content.type,
        topic_id: content.topicId,
      },
    });
  }

  return rows;
}

export async function indexTopicContents(contents: IndexContentInput[]) {
  const supabase = createAdminClient();
  const indexed: { contentId: string; chunks: number }[] = [];
  const skipped: { contentId: string; reason: string }[] = [];

  for (const content of contents) {
    try {
      const rows = await buildChunkRows(content);
      await supabase.from("content_chunks").delete().eq("content_id", content.contentId);

      if (rows.length === 0) {
        skipped.push({ contentId: content.contentId, reason: "No extractable text for this content type." });
        continue;
      }

      const { error } = await supabase.from("content_chunks").insert(rows);
      if (error) {
        throw error;
      }

      indexed.push({ contentId: content.contentId, chunks: rows.length });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown indexing error";
      skipped.push({ contentId: content.contentId, reason });
    }
  }

  return { indexed, skipped };
}