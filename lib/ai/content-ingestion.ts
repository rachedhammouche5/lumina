import path from "path";
import { createAdminClient } from "@/lib/supabase/admin";
import { embedText } from "@/lib/ai/embed";
import { ContentType } from "@/lib/database.types";
import { exec } from "child_process";
import { promisify } from "util";
import os from "os";
import { writeFile, unlink, readFile } from "fs/promises";
import { YoutubeTranscript } from "youtube-transcript";

const execAsync = promisify(exec);

// ─── Constants ────────────────────────────────────────────────────────────────

const CHUNK_SIZE = 1200;               // chars — PDF fixed-window fallback
const CHUNK_OVERLAP = 200;             // chars — PDF fixed-window fallback
const MAX_PDF_TEXT_CHARS = 70_000;
const VIDEO_CHUNK_WINDOW_MS = 90_000; // 90 seconds per video chunk (offset/duration in ms)

// ─── Types ────────────────────────────────────────────────────────────────────

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
};

// youtube-transcript package returns offset + duration in milliseconds
type TranscriptLine = {
  text: string;
  duration: number;
  offset: number;
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function estimateTokenCount(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function extractYouTubeId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "").trim() || null;
    }
    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v");
    }
  } catch {
    return null;
  }
  return null;
}

function formatMs(totalMs: number): string {
  const totalSec = Math.floor(totalMs / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

// ─── PDF Extraction ───────────────────────────────────────────────────────────

async function readBinaryContent(value: string, expectedLocalPrefix: string): Promise<Buffer> {
  if (value.startsWith(expectedLocalPrefix)) {
    const safePath = value.startsWith("/") ? value.slice(1) : value;
    const absolutePath = path.join(process.cwd(), "public", safePath);
    return readFile(absolutePath);
  }
  if (value.startsWith("http://") || value.startsWith("https://")) {
    const response = await fetch(value);
    if (!response.ok) throw new Error(`Failed to download file: ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  }
  throw new Error("Unsupported file source. Expected local upload path or public URL.");
}

async function extractPdfText(relativePath: string): Promise<string> {
  const fileBuffer = await readBinaryContent(relativePath, "/uploads/pdf/");
  const timestamp = Date.now();
  const tmpPdf = path.join(os.tmpdir(), `pdf-${timestamp}.pdf`);
  const tmpTxt = path.join(os.tmpdir(), `pdf-${timestamp}.txt`);
  const safePdfPath = tmpPdf.replace(/\\/g, "/");
  const safeTxtPath = tmpTxt.replace(/\\/g, "/");

  try {
    await writeFile(tmpPdf, fileBuffer);
    const cmd = `python -c "import fitz; doc=fitz.open('${safePdfPath}'); open('${safeTxtPath}','w',encoding='utf-8').write(' '.join([p.get_text() for p in doc]))"`;
    await execAsync(cmd);
    const text = await readFile(tmpTxt, "utf-8");
    return text.slice(0, MAX_PDF_TEXT_CHARS);
  } finally {
    await unlink(tmpPdf).catch(() => {});
    await unlink(tmpTxt).catch(() => {});
  }
}

// ─── PDF Chunking ─────────────────────────────────────────────────────────────
// Split on section headings first; fall back to fixed character windows.

function chunkByTitles(text: string): string[] {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];

  const sections = normalized.split(
    /(?=\n\d+[\.\)]\s+[A-Z]|\n#{1,3}\s|\n[A-Z][^\n]{0,60}\n[-=]{3,})/
  );
  const chunks = sections.map((s) => s.trim()).filter(Boolean);
  return chunks.length > 1 ? chunks : chunkTextFixed(text);
}

function chunkTextFixed(text: string, chunkSize = CHUNK_SIZE, overlap = CHUNK_OVERLAP): string[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) return [];

  const chunks: string[] = [];
  let start = 0;
  while (start < normalized.length) {
    const end = Math.min(normalized.length, start + chunkSize);
    const chunk = normalized.slice(start, end).trim();
    if (chunk) chunks.push(chunk);
    if (end === normalized.length) break;
    start = Math.max(0, end - overlap);
  }
  return chunks;
}

function chunkPdf(text: string): Array<{ text: string; metadata: Record<string, unknown> }> {
  return chunkByTitles(text).map((chunk, i) => ({
    text: chunk,
    metadata: { chunk_strategy: "title_split", section_index: i },
  }));
}

// ─── YouTube Transcript Fetching ──────────────────────────────────────────────
// Uses the `youtube-transcript` npm package (npm i youtube-transcript).
// Handles manual captions, auto-generated captions, entity decoding,
// and proper request headers — far more reliable than the raw timedtext API.

async function fetchTranscriptLines(videoId: string): Promise<TranscriptLine[]> {
  // Attempt 1: explicit English (manual or auto-generated)
  try {
    const lines = await YoutubeTranscript.fetchTranscript(videoId, { lang: "en" });
    if (lines?.length > 0) {
      console.log(`✅ Fetched ${lines.length} transcript lines (en) for ${videoId}`);
      return lines as TranscriptLine[];
    }
  } catch (e) {
    console.warn(`⚠️ English transcript unavailable for ${videoId}:`, (e as Error).message);
  }

  // Attempt 2: let the library pick the default language (catches any auto-caption)
  try {
    const lines = await YoutubeTranscript.fetchTranscript(videoId);
    if (lines?.length > 0) {
      console.log(`✅ Fetched ${lines.length} transcript lines (default lang) for ${videoId}`);
      return lines as TranscriptLine[];
    }
  } catch (e) {
    console.warn(`⚠️ No transcript available for ${videoId}:`, (e as Error).message);
  }

  return [];
}

async function fetchYoutubeTitle(videoUrl: string): Promise<string> {
  try {
    const url = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;
    const response = await fetch(url);
    if (!response.ok) return "";
    const payload = (await response.json()) as { title?: string };
    return payload.title?.trim() ?? "";
  } catch {
    return "";
  }
}

// ─── YouTube Time-Window Chunking ─────────────────────────────────────────────
// Groups transcript lines into 90-second buckets.
// Each chunk stores start/end timestamps so the AI can cite exact video positions,
// e.g. "this concept is explained at 4:30 in the video".

function chunkTranscriptByTime(
  lines: TranscriptLine[],
  windowMs = VIDEO_CHUNK_WINDOW_MS
): Array<{ text: string; metadata: Record<string, unknown> }> {
  if (lines.length === 0) return [];

  const chunks: Array<{ text: string; metadata: Record<string, unknown> }> = [];
  let bucketStartMs = lines[0].offset;
  let bucket: TranscriptLine[] = [];

  const flush = () => {
    if (bucket.length === 0) return;
    const text = bucket.map((l) => l.text.trim()).join(" ").trim();
    if (!text) return;
    const startMs = bucket[0].offset;
    const last = bucket[bucket.length - 1];
    const endMs = last.offset + last.duration;
    chunks.push({
      text,
      metadata: {
        chunk_strategy: "time_window",
        start_time_seconds: Math.round(startMs / 1000),
        end_time_seconds: Math.round(endMs / 1000),
        start_time_formatted: formatMs(startMs),
        end_time_formatted: formatMs(endMs),
      },
    });
  };

  for (const line of lines) {
    if (line.offset >= bucketStartMs + windowMs && bucket.length > 0) {
      flush();
      bucketStartMs = line.offset;
      bucket = [];
    }
    bucket.push(line);
  }
  flush(); // flush the final bucket

  console.log(`🎬 Video chunked into ${chunks.length} time-window buckets (${windowMs / 1000}s each)`);
  return chunks;
}

// ─── Shared Embedding Loop ────────────────────────────────────────────────────

async function embedChunks(
  chunks: Array<{ text: string; metadata: Record<string, unknown> }>,
  content: IndexContentInput
): Promise<ChunkRecord[]> {
  const { contentId, level, title, type, skillId, topicId } = content;
  const rows: ChunkRecord[] = [];

  for (let i = 0; i < chunks.length; i++) {
    const { text, metadata: chunkMeta } = chunks[i];
    console.log(`🔗 Embedding chunk ${i + 1}/${chunks.length}...`);
    try {
      const embedding = await embedText(text);
      rows.push({
        content_id: contentId,
        level: level ?? null,
        chunk_index: i,
        chunk_text: text,
        token_count: estimateTokenCount(text),
        embedding: JSON.stringify(embedding),
        metadata: { title, type, skill_id: skillId, topic_id: topicId, ...chunkMeta },
      });
    } catch (e) {
      console.error(`❌ embedText failed for chunk ${i}:`, e);
    }
  }

  console.log(`📦 Total rows built: ${rows.length}`);
  return rows;
}

// ─── Main Dispatch ────────────────────────────────────────────────────────────

async function buildChunkRows(content: IndexContentInput): Promise<ChunkRecord[]> {
  const { type, value, contentId, level, title, skillId, topicId } = content;

  // ── docs: single chunk, no splitting needed ───────────────────────────────
  if (type === "docs") {
    if (!value?.trim()) return [];
    const text = value.trim();
    const embedding = await embedText(text);
    return [{
      content_id: contentId,
      level: level ?? null,
      chunk_index: 0,
      chunk_text: text,
      token_count: estimateTokenCount(text),
      embedding: JSON.stringify(embedding),
      metadata: { title, type, skill_id: skillId, topic_id: topicId, chunk_strategy: "full_doc" },
    }];
  }

  // ── pdf: extract text → chunk by headings or fixed windows ────────────────
  if (type === "pdf" && value?.startsWith("/uploads/pdf/")) {
    const extracted = await extractPdfText(value);
    if (!extracted.trim()) return [];
    return embedChunks(chunkPdf(extracted), content);
  }

  // ── video: fetch transcript → chunk by 90s time windows ──────────────────
  if (type === "video" && value) {
    const videoId = extractYouTubeId(value);
    if (!videoId) {
      console.warn("⚠️ Could not extract YouTube ID from:", value);
      return [];
    }

    const lines = await fetchTranscriptLines(videoId);

    if (lines.length === 0) {
      // No transcript — store the video title as a minimal searchable chunk
      const videoTitle = await fetchYoutubeTitle(value);
      if (!videoTitle) return [];
      const text = `Video: ${videoTitle}`;
      const embedding = await embedText(text);
      console.warn(`⚠️ No transcript for ${videoId} — stored title-only fallback chunk`);
      return [{
        content_id: contentId,
        level: level ?? null,
        chunk_index: 0,
        chunk_text: text,
        token_count: estimateTokenCount(text),
        embedding: JSON.stringify(embedding),
        metadata: { title, type, skill_id: skillId, topic_id: topicId, chunk_strategy: "title_only_fallback", video_url: value },
      }];
    }

    return embedChunks(chunkTranscriptByTime(lines), content);
  }

  return [];
}

// ─── Public Entry Point ───────────────────────────────────────────────────────

export async function indexTopicContents(contents: IndexContentInput[]) {
  const supabase = createAdminClient();
  const indexed: { contentId: string; chunks: number }[] = [];
  const skipped: { contentId: string; reason: string }[] = [];

  for (const content of contents) {
    try {
      const rows = await buildChunkRows(content);

      // Wipe stale chunks before reinserting
      await supabase.from("content_chunks").delete().eq("content_id", content.contentId);

      if (rows.length === 0) {
        skipped.push({ contentId: content.contentId, reason: "No extractable text for this content type." });
        continue;
      }

      const { error } = await supabase.from("content_chunks").insert(rows);
      if (error) {
        console.error("❌ Supabase insert error:", error);
        throw error;
      }

      console.log(`✅ Inserted ${rows.length} chunks for content ${content.contentId}`);
      indexed.push({ contentId: content.contentId, chunks: rows.length });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown indexing error";
      skipped.push({ contentId: content.contentId, reason });
    }
  }

  return { indexed, skipped };
}