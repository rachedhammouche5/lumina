"use client";

import { useEffect, useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Award,
  BadgeCheck,
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

function rarityGradient(rarity: PrestigeBadgeView["rarity"]) {
  switch (rarity) {
    case "Bronze":
      return "from-orange-500/35 via-amber-500/20 to-black";
    case "Silver":
      return "from-slate-200/25 via-slate-400/10 to-black";
    case "Gold":
      return "from-amber-300/40 via-yellow-500/20 to-black";
    case "Obsidian":
      return "from-zinc-950 via-black to-amber-400/10";
    case "Legendary":
      return "from-violet-500/35 via-fuchsia-500/15 to-black";
  }
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

function statusLabel(status: PrestigeBadgeView["status"]) {
  if (status === "unlocked") return "Unlocked";
  if (status === "progress") return "In progress";
  return "Locked";
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
  const [showAllBadges, setShowAllBadges] = useState(false);

  const selectedBadge = useMemo(
    () => badges.find((badge) => badge.id === selectedBadgeId) ?? null,
    [badges, selectedBadgeId],
  );
  const earnedBadges = useMemo(() => badges.filter((badge) => badge.status === "unlocked"), [badges]);
  const visibleBadges = showAllBadges ? badges : earnedBadges;
  const hiddenCount = badges.length - earnedBadges.length;

  return (
    <>
      <section className="relative overflow-hidden rounded-[2rem] border border-amber-400/15 bg-[#050505] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.15),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent)]" />
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:18px_18px]" />
        <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl animate-prestige-float" />
        <div className="absolute -left-16 bottom-0 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl animate-prestige-float" />

        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-500/10 text-amber-200">
                <Award size={16} />
              </span>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-200/80">Prestige Vault</p>
            </div>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">Elite badge system</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Bronze badges are the everyday wins. Silver rewards weeks of work, gold takes months or top-tier
              performance, and obsidian or legendary should feel almost mythic.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Unlocked</p>
              <p className="mt-1 text-lg font-black text-white">{badges.filter((badge) => badge.status === "unlocked").length}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">In reach</p>
              <p className="mt-1 text-lg font-black text-white">{badges.filter((badge) => badge.status === "progress").length}</p>
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Locked</p>
              <p className="mt-1 text-lg font-black text-white">{hiddenCount}</p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-medium text-slate-500">
            {showAllBadges
              ? "Full vault unlocked for inspection."
              : `${earnedBadges.length} earned badge${earnedBadges.length === 1 ? "" : "s"} visible right now.`}
          </p>
          <button
            type="button"
            onClick={() => setShowAllBadges((current) => !current)}
            className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-100 transition hover:border-violet-300/35 hover:bg-violet-500/15"
          >
            {showAllBadges ? "Show only earned" : "See all badges possible"}
          </button>
        </div>

        <div className="relative mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {visibleBadges.map((badge) => {
            const hiddenCard = badge.isHidden && badge.status !== "unlocked";
            const title = hiddenCard ? "Hidden Badge" : badge.name;
            const subtitle = hiddenCard ? "Mystery reward" : badge.subtitle;

            return (
              <button
                key={badge.id}
                type="button"
                onClick={() => setSelectedBadgeId(badge.id)}
                className={`group relative overflow-hidden rounded-[1.75rem] border ${rarityStroke(badge.rarity)} ring-1 ${badge.accentRing} bg-gradient-to-b ${rarityGradient(badge.rarity)} p-4 text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-amber-300/40`}
              >
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.10)_40%,transparent_70%)] animate-prestige-sheen`} />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_35%)]" />
                <div className="relative flex items-start justify-between gap-3">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${rarityStroke(badge.rarity)} bg-black/55 ${badge.glowClass}`}>
                    <BadgeIcon iconKey={badge.iconKey} size={20} className="text-white" />
                  </div>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.24em] ${rarityPill(badge.rarity)}`}>
                    {badge.rarity}
                  </span>
                </div>

                <div className="relative mt-4">
                  <h3 className="text-lg font-black tracking-tight text-white">{title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
                </div>

                <div className="relative mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-slate-500">Progress</span>
                    <span className="text-xs font-semibold text-slate-200">{badge.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/50">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${badge.accent} animate-prestige-sheen`}
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </div>

                <div className="relative mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/45 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-300">
                    {badge.status === "unlocked" ? (
                      <BadgeCheck size={11} className="text-emerald-300" />
                    ) : badge.status === "progress" ? (
                      <Sparkles size={11} className="text-amber-300" />
                    ) : (
                      <ShieldCheck size={11} className="text-slate-500" />
                    )}
                    {statusLabel(badge.status)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition-transform group-hover:translate-x-0.5">
                    Inspect
                    <Target size={12} className="text-amber-200/80" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {!showAllBadges && hiddenCount > 0 && (
          <div className="mt-4 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-400">
            {hiddenCount} badge{hiddenCount === 1 ? "" : "s"} are still hidden, waiting to be earned.
          </div>
        )}
      </section>

      {selectedBadge ? <BadgeModal badge={selectedBadge} onClose={() => setSelectedBadgeId(null)} /> : null}
    </>
  );
}
