"use client";

import { useRecommendations, type Recommendation } from "@/hooks/useRecommendations";
import { GRADIENTS, hashTitle } from "@/app/ui/Skills/CourseCard";
import { ArrowRight, Brain, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Main export
// ---------------------------------------------------------------------------
export default function RecommendedSkills({ userId }: { userId: string }) {
  const { recommendations, loading, error } = useRecommendations(userId);

  return (
    <section>
      {/* Section header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-4 w-1 rounded-full bg-orange-500" />
        <h2 className="text-lg font-black tracking-tight flex items-center gap-2">
          Recommended for you
          <span className="flex items-center gap-1 text-[9px] font-bold tracking-[0.15em] uppercase text-orange-500/80 border border-orange-500/20 bg-orange-500/8 rounded-full px-2 py-0.5">
            <Sparkles size={8} /> AI
          </span>
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* Error — only show if nothing to display */}
      {!loading && error && recommendations.length === 0 && (
        <div className="rounded-2xl border border-white/6 bg-slate-900/40 p-8 text-center">
          <Brain size={28} className="text-slate-700 mx-auto mb-3" />
          <p className="text-white/50 text-sm">Could not load recommendations right now.</p>
          <p className="text-slate-600 text-xs mt-1">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && recommendations.length === 0 && (
        <div className="rounded-2xl border border-white/6 bg-slate-900/40 p-8 text-center">
          <Zap size={28} className="text-slate-700 mx-auto mb-3" />
          <p className="text-white/50 text-sm">Enroll in a skill to get personalised recommendations.</p>
        </div>
      )}

      {/* Cards */}
      {!loading && recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map((rec) => (
            <RecommendationCard key={rec.skillId} rec={rec} />
          ))}
        </div>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Recommendation card
// ---------------------------------------------------------------------------
function RecommendationCard({ rec }: { rec: Recommendation }) {
  const g = GRADIENTS[hashTitle(rec.skillName)];
  const initials = rec.skillName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  const isHigh = rec.relevanceScore >= 0.8;

  return (
    <Link
      href={`/skills/${rec.skillId}`}
      className="group flex flex-col bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-orange-500/25 hover:shadow-[0_8px_48px_rgba(249,115,22,0.1)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[2/1] overflow-hidden">
        {rec.image ? (
          <img
            src={rec.image}
            alt={rec.skillName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className={`relative h-full w-full bg-gradient-to-br ${g.from} ${g.via} to-slate-900 flex items-center justify-center overflow-hidden`}>
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 ${g.accent} blur-3xl rounded-full`} />
            <span className={`relative text-4xl font-black italic tracking-tighter ${g.text} select-none`}>
              {initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* Match badge */}
        <div className={`absolute top-2.5 left-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border backdrop-blur-sm ${
          isHigh
            ? "bg-emerald-500/15 border-emerald-500/25 text-emerald-400"
            : "bg-blue-500/15 border-blue-500/25 text-blue-400"
        }`}>
          <Brain size={8} />
          {isHigh ? "High match" : "Good match"}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-5 gap-3">
        {/* Label row */}
        <div className="flex items-center gap-1.5">
          <Zap size={10} className="text-orange-500/70 flex-shrink-0" />
          <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-orange-500/70">AI Recommended</span>
        </div>

        <div className="flex-grow">
          <h3 className="text-[15px] font-bold text-white group-hover:text-orange-400 transition-colors duration-300 line-clamp-1 leading-snug mb-2">
            {rec.skillName}
          </h3>

          {rec.reason ? (
            <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-3 italic border-l-2 border-orange-500/20 pl-2.5">
              {rec.reason}
            </p>
          ) : (
            <p className="text-slate-400 text-[12px] leading-relaxed line-clamp-2">
              {rec.description || "Explore this course to expand your skills."}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">
            View course
          </span>
          <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
            <ArrowRight size={11} className="text-orange-400 group-hover:text-white transition-colors duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Skeleton
// ---------------------------------------------------------------------------
function SkeletonCard() {
  return (
    <div className="flex flex-col bg-slate-900/50 border border-white/5 rounded-[2rem] overflow-hidden animate-pulse">
      <div className="w-full aspect-[2/1] bg-slate-800/80" />
      <div className="p-5 flex flex-col gap-3">
        <div className="h-2.5 w-20 rounded-full bg-slate-700/60" />
        <div className="h-4 w-3/4 rounded-lg bg-slate-700/60" />
        <div className="h-3 w-full rounded-lg bg-slate-700/40" />
        <div className="h-3 w-5/6 rounded-lg bg-slate-700/40" />
        <div className="h-3 w-2/3 rounded-lg bg-slate-700/30" />
        <div className="h-px bg-white/5 mt-1" />
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-16 rounded-full bg-slate-700/40" />
          <div className="w-6 h-6 rounded-full bg-slate-700/50" />
        </div>
      </div>
    </div>
  );
}
