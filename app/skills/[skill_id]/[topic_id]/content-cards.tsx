"use client";

import type { Content } from "@/lib/database.types";
import Youtube, { type YouTubeEvent } from "react-youtube";
import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  PlayCircle,
  FileText,
} from "lucide-react";

function isUrl(value: string | null) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function getContentHref(content: Content) {
  if (!content.cntnt_value) return null;
  if (isUrl(content.cntnt_value) || content.cntnt_value.startsWith("/")) {
    return content.cntnt_value;
  } else {
    return null;
  }
}

interface YouTubeResult {
  valid: boolean;
  id: string | null;
  error: string | null;
}

function getVideoId(href: string | null): YouTubeResult {
  if (!href) return { valid: false, id: null, error: "No URL provided" };
  try {
    const url = new URL(href);
    const validHosts = [
      "www.youtube.com",
      "youtube.com",
      "youtu.be",
      "m.youtube.com",
    ];

    if (!validHosts.includes(url.hostname)) {
      return { valid: false, id: null, error: "Not a YouTube URL" };
    }

    let videoId: string | null = null;

    if (url.hostname === "youtu.be") {
      videoId = url.pathname.slice(1);
    } else {
      videoId =
        url.searchParams.get("v") ||
        (url.pathname.startsWith("/embed/") &&
          url.pathname.split("/embed/")[1]) ||
        (url.pathname.startsWith("/shorts/") &&
          url.pathname.split("/shorts/")[1]) ||
        null;
    }

    if (!videoId || !/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return {
        valid: false,
        id: null,
        error: "Could not extract a valid video ID",
      };
    }

    return { valid: true, id: videoId, error: null };
  } catch {
    return { valid: false, id: null, error: "Invalid URL" };
  }
}

export function VideoCard({ content }: { content: Content }) {
  const href = getContentHref(content);
  const result = getVideoId(href);

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
    },
  };

  return (
    <div className="rounded-2xl border border-orange-400/20 bg-orange-500/5 p-5">
      <div className="relative aspect-video overflow-hidden rounded-[20px] border border-dashed border-orange-400/35 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.92),rgba(124,45,18,0.55))]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.14),transparent_38%)]" />
        {result.valid && result.id ? (
          <Youtube
            videoId={result.id}
            opts={opts}
            className="absolute inset-0 h-full w-full"
            iframeClassName="h-full w-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sm text-slate-400">
              {result.error ?? "No video available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
// ─── Audio Card ────────────────────────────────────────────────────────────────

export function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.pause();
    else audio.play();
    setPlaying(!playing);
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !muted;
    setMuted(!muted);
  }

  function onTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrent(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100);
  }

  function onSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = (val / 100) * audio.duration;
    setProgress(val);
  }

  function fmt(s: number) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setPlaying(false)}
      />

      <p className="mb-3 text-sm font-semibold text-white">{title}</p>
      {/* Progress bar */}
      <input
        type="range"
        min={0}
        max={100}
        value={progress}
        onChange={onSeek}
        className="w-full accent-cyan-400"
      />

      {/* Time */}
      <div className="mt-1 flex justify-between text-xs text-slate-400">
        <span>{fmt(current)}</span>
        <span>
          {audioRef.current?.duration
            ? fmt(audioRef.current.duration)
            : "--:--"}
        </span>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300 transition hover:bg-cyan-500/30"
        >
          {playing ? <Pause size={18} /> : <Play size={18} />}
        </button>

        <button
          onClick={toggleMute}
          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:text-white"
        >
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </div>
  );
}

// ─── PDF Card ──────────────────────────────────────────────────────────────────

export function PdfCard({ content }: { content: Content }) {
  const href = getContentHref(content);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <>
      {/* Card */}
      <button
        onClick={() => href && setOpen(true)}
        className="flex w-full items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/5 px-4 py-3 text-left transition hover:bg-emerald-500/10 hover:border-emerald-400/40"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
          <FileText size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-white truncate">
            {content.cntnt_title}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">
            {href ? "Click to view PDF" : "No file attached"}
          </p>
        </div>
        {href && (
          <ExternalLink size={15} className="shrink-0 text-emerald-300/60" />
        )}
      </button>

      {/* Full viewport modal */}
      {open && href && (
        <div className="fixed inset-0 z-51 flex flex-col bg-black">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-900 px-4 py-3">
            <p className="font-semibold text-white">{content.cntnt_title}</p>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-1.5 text-sm text-slate-400 transition hover:bg-white/10 hover:text-white"
            >
              ✕ Close
            </button>
          </div>

          {/* PDF viewer */}
          <iframe
            src={href}
            className="flex-1 w-full"
            style={{ colorScheme: "dark" }}
            title={content.cntnt_title}
          />
        </div>
      )}
    </>
  );
}
// ─── Docs Card ─────────────────────────────────────────────────────────────────

export function DocsCard({ content }: { content: Content }) {
  const href = getContentHref(content);

  if (!href) {
    return (
      <div className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4">
        <h3 className="font-semibold text-white">{content.cntnt_title}</h3>
        <p className="mt-2 text-sm text-slate-400">
          Documentation link will appear here.
        </p>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4 transition hover:border-violet-300/35 hover:bg-violet-500/10"
    >
      <div>
        <h3 className="font-semibold text-white">{content.cntnt_title}</h3>
        <p className="mt-2 text-sm text-slate-400">{href}</p>
      </div>
      <ExternalLink
        size={18}
        className="text-violet-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}
