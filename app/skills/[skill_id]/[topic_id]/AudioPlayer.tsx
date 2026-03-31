"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export function AudioPlayer({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
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

  function onLoadedMetadata() {
    setDuration(audioRef.current?.duration ?? 0);
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
        onLoadedMetadata={onLoadedMetadata}
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
        <span>{fmt(duration)}</span>
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