"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUp, LocateFixed, Crown, Medal } from "lucide-react";

export type LeaderboardEntry = {
  id: string;
  fullName: string;
  pfp: string | null;
  points: number;
  rank: number;
};

type Props = {
  entries: LeaderboardEntry[];
  currentStudentId: string;
};

function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "S";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function rankBadge(rank: number) {
  if (rank === 1) return <Crown size={14} className="text-amber-300" />;
  if (rank === 2) return <Medal size={14} className="text-slate-300" />;
  if (rank === 3) return <Medal size={14} className="text-orange-300" />;
  return <span className="text-[10px] font-black tabular-nums text-slate-400">#{rank}</span>;
}

export default function LeaderboardPanel({ entries, currentStudentId }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    currentRowRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [entries, currentStudentId]);

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (!container) return;
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  };

  const scrollToMe = () => {
    currentRowRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const currentEntry = entries.find((entry) => entry.id === currentStudentId) ?? entries[0];

  return (
    <aside className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/90 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-sky-500/5 pointer-events-none" />
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-orange-300/80">Leaderboard</p>
            <h2 className="mt-1 text-xl font-black text-white">Quiz points</h2>
            <p className="mt-1 text-sm text-slate-400">
              Ranked by total points earned across all quizzes.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">Students</p>
            <p className="text-lg font-black text-white">{entries.length}</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-orange-400/30 hover:bg-orange-500/10"
          >
            <ArrowUp size={14} />
            Top
          </button>
          <button
            type="button"
            onClick={scrollToMe}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-orange-400/30 bg-orange-500/15 px-3 py-2 text-xs font-semibold text-orange-200 transition hover:bg-orange-500/20"
          >
            <LocateFixed size={14} />
            Where am I?
          </button>
          <button
            type="button"
            onClick={scrollToBottom}
            className="inline-flex items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-orange-400/30 hover:bg-orange-500/10"
          >
            <ArrowDown size={14} />
            Bottom
          </button>
        </div>

        {currentEntry ? (
          <div className="mt-5 rounded-3xl border border-orange-400/20 bg-orange-500/10 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-orange-400/20 bg-slate-950 text-sm font-black text-orange-200">
                  {currentEntry.pfp ? (
                    <img
                      src={currentEntry.pfp}
                      alt={currentEntry.fullName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    getInitials(currentEntry.fullName)
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">You are #{currentEntry.rank}</p>
                  <p className="truncate text-xs text-slate-400">{currentEntry.fullName}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-orange-200 tabular-nums">
                  {currentEntry.points.toLocaleString()}
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-orange-200/70">
                  points
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div
          ref={containerRef}
          className="pretty-scrollbar mt-5 max-h-[640px] space-y-2 overflow-y-scroll pr-2 scroll-smooth"
        >
          {entries.map((entry) => {
            const isCurrent = entry.id === currentStudentId;
            return (
              <div
                key={entry.id}
                ref={isCurrent ? currentRowRef : undefined}
                className={`rounded-2xl border p-3 transition ${
                  isCurrent
                    ? "border-orange-400/50 bg-orange-500/10 shadow-[0_0_0_1px_rgba(251,146,60,0.15)]"
                    : "border-white/5 bg-slate-950/40 hover:border-white/10 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border text-sm font-black ${isCurrent ? "border-orange-400/30 bg-orange-500/15 text-orange-200" : "border-white/10 bg-white/5 text-slate-300"}`}>
                    {rankBadge(entry.rank)}
                  </div>
                  <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-950">
                    {entry.pfp ? (
                      <img
                        src={entry.pfp}
                        alt={entry.fullName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs font-black text-slate-200">
                        {getInitials(entry.fullName)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-semibold ${isCurrent ? "text-white" : "text-slate-100"}`}>
                      {entry.fullName}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {isCurrent ? "Highlighted" : `Rank #${entry.rank}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-black tabular-nums ${isCurrent ? "text-orange-200" : "text-white"}`}>
                      {entry.points.toLocaleString()}
                    </p>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      pts
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
