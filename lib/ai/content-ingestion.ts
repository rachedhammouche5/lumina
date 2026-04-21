
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createAdminClient } from "@/lib/supabase/admin";
import { embedText } from "@/lib/ai/embed";
import { ContentType } from "@/lib/database.types";
import { exec } from "child_process"
import { promisify } from "util"
import os from "os"

import { writeFile, unlink, readFile } from "fs/promises";

const execAsync = promisify(exec)
async function readBinaryContent(value: string, expectedLocalPrefix: string) {
  if (value.startsWith(expectedLocalPrefix)) {
    const safePath = value.startsWith("/") ? value.slice(1) : value
    const absolutePath = path.join(process.cwd(), "public", safePath)
    return readFile(absolutePath)
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    const response = await fetch(value)
    if (!response.ok) {
      throw new Error(`Failed to download file: ${response.status}`)
    }
    const bytes = await response.arrayBuffer()
    return Buffer.from(bytes)
  }

  throw new Error("Unsupported file source. Expected local upload path or public URL.")
}
async function extractPdfText(relativePath: string): Promise<string> {
  const fileBuffer = await readBinaryContent(relativePath, "/uploads/pdf/")
  const timestamp = Date.now()
  const tmpPdf = path.join(os.tmpdir(), `pdf-${timestamp}.pdf`)
  const tmpTxt = path.join(os.tmpdir(), `pdf-${timestamp}.txt`)

  // Fix Windows backslashes by converting to forward slashes
  const safePdfPath = tmpPdf.replace(/\\/g, "/")
  const safeTxtPath = tmpTxt.replace(/\\/g, "/")

  console.log("📁 tmpPdf:", safePdfPath)
  console.log("📁 tmpTxt:", safeTxtPath)
  console.log("📦 fileBuffer size:", fileBuffer.length)

  try {
    await writeFile(tmpPdf, fileBuffer)
    console.log("✅ PDF written to disk")

    const cmd = `python -c "import fitz; doc=fitz.open('${safePdfPath}'); open('${safeTxtPath}','w',encoding='utf-8').write(' '.join([p.get_text() for p in doc]))"`
    console.log("🐍 Running command:", cmd)

    const { stdout, stderr } = await execAsync(cmd)
    console.log("🐍 stdout:", stdout)
    console.log("🐍 stderr:", stderr)

    const text = await readFile(tmpTxt, "utf-8")
    console.log("📄 Extracted text length:", text.length)
    console.log("📄 First 200 chars:", text.slice(0, 200))

    return text.slice(0, MAX_PDF_TEXT_CHARS)
  } finally {
    await unlink(tmpPdf).catch((e) => console.warn("⚠️ Failed to delete tmpPdf:", e))
    await unlink(tmpTxt).catch((e) => console.warn("⚠️ Failed to delete tmpTxt:", e))
  }
}

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
  level: string | null;
  chunk_index: number;
  chunk_text: string;
  token_count: number;
  embedding: string;
  metadata: Record<string, unknown>;
}

const CHUNK_SIZE = 1200;
const CHUNK_OVERLAP = 200;
const MAX_PDF_TEXT_CHARS = 70_000;

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

function chunkByTitles(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim()
  if (!normalized) return []

  // Split on patterns like "1. Title", "2. Title", "## Title", "Title\n---"
  const sections = normalized.split(
    /(?=\n\d+[\.\)]\s+[A-Z]|\n#{1,3}\s|\n[A-Z][^\n]{0,60}\n[-=]{3,})/
  )

  const chunks = sections
    .map(s => s.trim())
    .filter(Boolean)

  console.log("📋 title-based chunks:", chunks.length)
  chunks.forEach((c, i) => console.log(`  [${i}] ${c.slice(0, 80)}...`))

  return chunks.length > 1 ? chunks : chunkText(text) // fallback if no titles found
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
  
    const extracted = await extractText(content)
  
  // Use semantic chunking instead of dumb character slicing
  const chunks = chunkByTitles(extracted)
  
  console.log(`🔪 semantic chunks count:`, chunks.length)
  console.log(`📋 chunk previews:`, chunks.map((c, i) => `[${i}] ${c.slice(0, 80)}...`))
  

  const rows: ChunkRecord[] = []
  for (let index = 0; index < chunks.length; index += 1) {
    const chunk = chunks[index]
    console.log(`🔗 embedding chunk ${index + 1}/${chunks.length}...`)
    try {
      const embedding = await embedText(chunk)
      console.log(`✅ embedding done for chunk ${index}`)
      rows.push({
          content_id: content.contentId,
          level: content.level ?? null,
          chunk_index: index,
          chunk_text: chunk,
          token_count: estimateTokenCount(chunk),
          embedding: JSON.stringify(embedding),
          metadata: {
              title: content.title,
              type: content.type,
              skill_id: content.skillId,
              topic_id: content.topicId,
          },
         
      })
    } catch (e) {
      console.error(`❌ embedText failed for chunk ${index}:`, e)
    }
  }

  console.log(`📦 total rows built:`, rows.length)
  return rows
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
        console.error("❌ Supabase insert error:", error)
        throw error;
      }
console.log("✅ inserted rows into content_chunks:", rows.length);
      indexed.push({ contentId: content.contentId, chunks: rows.length });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown indexing error";
      skipped.push({ contentId: content.contentId, reason });
    }
    
  }

  return { indexed, skipped };
}