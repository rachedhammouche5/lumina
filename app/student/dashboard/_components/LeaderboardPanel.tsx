"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";
import { LocateFixed, Trophy, Users } from "lucide-react";

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

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-amber-400/40 bg-amber-400/15 text-xs font-black tabular-nums text-amber-300">
        1
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-slate-300/30 bg-slate-300/10 text-xs font-black tabular-nums text-slate-300">
        2
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-orange-400/30 bg-orange-400/10 text-xs font-black tabular-nums text-orange-300">
        3
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center text-xs font-medium tabular-nums text-slate-600">
      {rank}
    </span>
  );
}

const TOP3_ROW: Record<number, string> = {
  1: "border-l-2 border-l-amber-400/50 bg-amber-400/5",
  2: "border-l-2 border-l-slate-400/40 bg-slate-400/5",
  3: "border-l-2 border-l-orange-400/40 bg-orange-400/5",
};

export default function LeaderboardPanel({ entries, currentStudentId }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const currentRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    currentRowRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [entries, currentStudentId]);

  const scrollToMe = () => {
    currentRowRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const currentEntry = entries.find((e) => e.id === currentStudentId) ?? entries[0];

  return (
    <aside className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      {/* Colorful header */}
      <div className="relative px-5 pt-5 pb-4 sm:px-6 sm:pt-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-violet-500/8 to-transparent pointer-events-none" />
        <div className="absolute -top-6 -right-6 h-28 w-28 rounded-full bg-indigo-500/10 blur-xl pointer-events-none" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-indigo-400">
              Class standings
            </p>
            <h2 className="mt-0.5 text-xl font-black text-white">Leaderboard</h2>
            <p className="mt-1 text-xs text-slate-400">Ranked by total quiz points</p>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/20">
            <Trophy size={18} className="text-indigo-300" />
          </div>
        </div>
        <div className="relative mt-3 flex items-center gap-1.5">
          <Users size={12} className="text-slate-500" />
          <span className="text-xs text-slate-500">
            {entries.length} {entries.length === 1 ? "student" : "students"}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5 sm:px-6 sm:pb-6">

        {/* Your position card */}
        {currentEntry && (
          <div className="mb-4 flex items-center gap-3 rounded-xl border border-indigo-500/25 bg-gradient-to-r from-indigo-500/15 to-violet-500/10 px-3 py-2.5">
            <RankBadge rank={currentEntry.rank} />
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-indigo-400/20 bg-slate-800 text-xs font-black text-slate-200">
              {currentEntry.pfp ? (
                <img src={currentEntry.pfp} alt={currentEntry.fullName} className="h-full w-full object-cover" />
              ) : (
                getInitials(currentEntry.fullName)
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-100">Your rank</p>
              <p className="truncate text-xs text-slate-400">{currentEntry.fullName}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold tabular-nums text-indigo-300">
                {currentEntry.points.toLocaleString()}
              </p>
              <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">pts</p>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mb-3 flex items-center gap-2">
          <div className="h-px flex-1 bg-slate-800" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">All students</span>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

        {/* Scrollable list */}
        <div
          ref={containerRef}
          className="pretty-scrollbar max-h-[50vh] space-y-0.5 overflow-y-auto pr-1 scroll-smooth sm:max-h-[480px]"
        >
          {entries.map((entry) => {
            const isCurrent = entry.id === currentStudentId;
            const top3Style = TOP3_ROW[entry.rank] ?? "";
            return (
              <div
                key={entry.id}
                ref={isCurrent ? currentRowRef : undefined}
                className={`flex items-center gap-3 rounded-xl px-2 py-2 transition-colors ${
                  isCurrent
                    ? "bg-indigo-500/10 ring-1 ring-inset ring-indigo-500/20"
                    : top3Style
                    ? `${top3Style} hover:bg-amber-400/8`
                    : "hover:bg-slate-800/60"
                }`}
              >
                <RankBadge rank={entry.rank} />

                <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/8 bg-slate-800 text-xs font-black text-slate-300">
                  {entry.pfp ? (
                    <img src={entry.pfp} alt={entry.fullName} className="h-full w-full object-cover" />
                  ) : (
                    getInitials(entry.fullName)
                  )}
                </div>

                <p className={`min-w-0 flex-1 truncate text-sm ${isCurrent ? "font-semibold text-slate-100" : "font-medium text-slate-400"}`}>
                  {entry.fullName}
                  {isCurrent && (
                    <span className="ml-1.5 text-[11px] font-semibold text-indigo-400">you</span>
                  )}
                </p>

                <span className={`text-sm font-semibold tabular-nums ${isCurrent ? "text-indigo-300" : entry.rank <= 3 ? "text-slate-200" : "text-slate-500"}`}>
                  {entry.points.toLocaleString()}
                </span>
              </div>
            );
          })}
        </div>

        {/* Find me */}
        <button
          type="button"
          onClick={scrollToMe}
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-800/40 px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-300"
        >
          <LocateFixed size={13} />
          Find my position
        </button>
      </div>
    </aside>
  );
}
