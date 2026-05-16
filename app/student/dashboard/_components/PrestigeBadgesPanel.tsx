"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  Brain,
  Crown,
  Flame,
  Gem,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  X,
} from "lucide-react";

import type { PrestigeBadgeView, PrestigeIconKey } from "@/features/achievements/prestige";

const ICONS: Record<PrestigeIconKey, LucideIcon> = {
  Target,
  ShieldCheck,
  Trophy,
  Flame,
  Crown,
  Brain,
  Sparkles,
  Gem,
  Award,
};

function BadgeIcon({
  iconKey,
  size,
  className,
}: {
  iconKey: PrestigeIconKey;
  size: number;
  className?: string;
}) {
  const Icon = ICONS[iconKey] ?? Award;
  return <Icon size={size} className={className} />;
}

function rarityStroke(rarity: PrestigeBadgeView["rarity"]) {
  switch (rarity) {
    case "Bronze":
      return "border-orange-400/30";
    case "Silver":
      return "border-slate-300/30";
    case "Gold":
      return "border-amber-300/40";
    case "Obsidian":
      return "border-zinc-500/35";
    case "Legendary":
      return "border-violet-400/40";
  }
}

function rarityPill(rarity: PrestigeBadgeView["rarity"]) {
  switch (rarity) {
    case "Bronze":
      return "border-orange-400/30 bg-orange-500/10 text-orange-200";
    case "Silver":
      return "border-slate-300/30 bg-slate-200/10 text-slate-100";
    case "Gold":
      return "border-amber-300/35 bg-amber-400/10 text-amber-100";
    case "Obsidian":
      return "border-zinc-500/35 bg-zinc-950/80 text-zinc-100";
    case "Legendary":
      return "border-violet-400/40 bg-violet-500/15 text-violet-100";
  }
}

function formatEarnedAt(earnedAt: string | null) {
  if (!earnedAt) return "Not yet earned";
  const date = new Date(earnedAt);
  if (Number.isNaN(date.getTime())) return "Earned";
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

type Props = {
  badges: PrestigeBadgeView[];
};

function BadgeModal({
  badge,
  onClose,
}: {
  badge: PrestigeBadgeView;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const frame = window.requestAnimationFrame(() => setOpen(true));
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[2100] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md transition-opacity duration-200 ${
        open ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={badge.name}
        className={`relative w-full max-w-3xl outline-none transition-all duration-200 ${
          open ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-2 opacity-0"
        }`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={`relative overflow-hidden rounded-[2rem] border ${rarityStroke(badge.rarity)} bg-slate-950/95 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.65)] sm:p-6 ${badge.glowClass}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${badge.accentSoft} opacity-90`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-white/5 blur-3xl animate-prestige-float" />
          <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-3xl border ${rarityStroke(badge.rarity)} bg-black/65 ${badge.glowClass}`}>
                <div className={`absolute inset-[1px] rounded-[1rem] bg-gradient-to-br ${badge.accentSoft}`} />
                <div className="absolute inset-0 animate-prestige-sheen bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.35)_50%,transparent_100%)]" />
                <BadgeIcon iconKey={badge.iconKey} size={28} className="relative z-10 text-white" />
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">{badge.name}</h3>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] ${rarityPill(badge.rarity)}`}>
                    {badge.rarity}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{badge.subtitle}</p>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{badge.description}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close badge details"
            >
              <X size={16} />
            </button>
          </div>

          <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Unlock condition</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">{badge.unlockCondition}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Tracking signal</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">{badge.trackingSignal}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/5 p-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Reward feel</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">{badge.reward}</p>
            </div>
          </div>

          <div className="relative mt-6 overflow-hidden rounded-2xl border border-white/8 bg-black/35 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Prestige status</p>
                <p className="mt-1 text-sm font-semibold text-white">{statusLabel(badge.status)}</p>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] ${badge.status === "unlocked" ? "border-emerald-400/25 bg-emerald-500/10 text-emerald-200" : badge.status === "progress" ? "border-amber-400/25 bg-amber-500/10 text-amber-100" : "border-white/10 bg-white/5 text-slate-400"}`}>
                {badge.status === "unlocked" ? "Unlocked" : badge.status === "progress" ? "Within reach" : "Locked"}
              </span>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/8">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${badge.accent} animate-prestige-sheen`}
                style={{ width: `${badge.progress}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>{badge.progress}% toward this badge&apos;s milestone.</span>
              <span>{badge.globalCount.toLocaleString()} students earned this badge.</span>
              <span>{formatEarnedAt(badge.earnedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PrestigeBadgesPanel({ badges }: Props) {
  const [selectedBadgeId, setSelectedBadgeId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const selectedBadge = useMemo(
    () => badges.find((badge) => badge.id === selectedBadgeId) ?? null,
    [badges, selectedBadgeId],
  );
  const earnedBadges = useMemo(() => badges.filter((badge) => badge.status === "unlocked"), [badges]);

  return (
    <>
      <article className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-amber-500/8 pointer-events-none" />
        <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-amber-500/25 bg-amber-500/15">
          <Award size={18} className="text-amber-400" />
        </div>

        <div className="relative min-w-0 flex-1">
          <div className="min-w-0">
            <p className="mb-0.5 text-xs font-medium text-slate-500">Earned badges</p>
            <p className="text-2xl font-bold text-white">
              {earnedBadges.length} {earnedBadges.length === 1 ? "badge" : "badges"}
            </p>
          </div>

          {expanded ? (
            <div className="mt-4 mx-auto w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/60 p-2.5">
              {earnedBadges.length === 0 ? (
                <div className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 px-3 py-4 text-center text-xs text-slate-400">
                  No badges yet.
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {earnedBadges.map((badge) => (
                    <button
                      key={badge.id}
                      type="button"
                      onClick={() => setSelectedBadgeId(badge.id)}
                      className={`group flex flex-col items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-2 py-3 text-center transition hover:-translate-y-0.5 hover:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-300/40`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-700 bg-slate-950">
                        <BadgeIcon iconKey={badge.iconKey} size={16} className="text-amber-200" />
                      </div>
                      <p className="w-full truncate text-[10px] font-semibold text-white">{badge.name}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : null}

          <div className="mt-4 flex items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              {expanded ? "Tap a badge to inspect it" : "Tap more to see them"}
            </p>
            <button
              type="button"
              onClick={() => setExpanded((current) => !current)}
              className="shrink-0 rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-amber-100 transition hover:border-amber-300/35 hover:bg-amber-500/15"
            >
              {expanded ? "Hide" : "More"}
            </button>
          </div>
        </div>
      </article>
      {selectedBadge ? <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadgeId(null)} /> : null}
    </>
  );
}
