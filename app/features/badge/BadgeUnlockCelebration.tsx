"use client";

import { useEffect, useState } from "react";
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
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { PrestigeIconKey, PrestigeRarity } from "@/features/achievements/prestige";

type BadgeUnlockPayload = {
  name: string;
  subtitle: string;
  rarity: PrestigeRarity;
  iconKey: PrestigeIconKey;
  accentSoft: string;
};

const EVENT_NAME = "lumina:badge-unlock";

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

function rarityColors(rarity: PrestigeRarity) {
  switch (rarity) {
    case "Bronze":
      return {
        ring: "rgba(249,115,22,0.45)",
        glow: "rgba(249,115,22,0.30)",
        pill: "border-orange-400/30 bg-orange-500/15 text-orange-200",
      };
    case "Silver":
      return {
        ring: "rgba(148,163,184,0.45)",
        glow: "rgba(148,163,184,0.25)",
        pill: "border-slate-300/30 bg-slate-200/15 text-slate-100",
      };
    case "Gold":
      return {
        ring: "rgba(245,158,11,0.50)",
        glow: "rgba(245,158,11,0.35)",
        pill: "border-amber-300/35 bg-amber-400/15 text-amber-100",
      };
    case "Obsidian":
      return {
        ring: "rgba(250,204,21,0.35)",
        glow: "rgba(100,100,100,0.40)",
        pill: "border-zinc-500/35 bg-zinc-950/80 text-zinc-100",
      };
    case "Legendary":
      return {
        ring: "rgba(168,85,247,0.55)",
        glow: "rgba(168,85,247,0.38)",
        pill: "border-violet-400/40 bg-violet-500/15 text-violet-100",
      };
  }
}

export function triggerBadgeUnlock(payload: BadgeUnlockPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));
}

export default function BadgeUnlockCelebration() {
  const [queue, setQueue] = useState<BadgeUnlockPayload[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<BadgeUnlockPayload>).detail;
      setQueue((prev) => [...prev, detail]);
    };
    window.addEventListener(EVENT_NAME, handler as EventListener);
    return () => window.removeEventListener(EVENT_NAME, handler as EventListener);
  }, []);

  const current = queue[0] ?? null;

  useEffect(() => {
    if (!current) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setQueue((prev) => prev.slice(1)), 220);
    }, 3000);
    return () => clearTimeout(timer);
  }, [current]);

  if (!current) return null;

  const colors = rarityColors(current.rarity);
  const Icon = ICONS[current.iconKey] ?? Award;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center">
      <div
        className="badge-unlock-backdrop absolute inset-0 bg-slate-950/65 backdrop-blur-[10px]"
        style={{ animationPlayState: visible ? "running" : "paused" }}
      />
      <div
        className="badge-unlock-ring absolute h-[360px] w-[360px] rounded-full border"
        style={{ borderColor: colors.ring }}
      />
      <div
        className="badge-unlock-ring-outer absolute h-[480px] w-[480px] rounded-full border opacity-35"
        style={{ borderColor: colors.ring }}
      />

      <div className="badge-unlock-pop relative flex flex-col items-center gap-5">
        <p className="badge-unlock-label text-[10px] font-bold uppercase tracking-[0.44em] text-white/55">
          Achievement Unlocked
        </p>

        <div className="relative">
          <div
            className="absolute -inset-10 rounded-full blur-3xl"
            style={{ background: colors.glow }}
          />
          <div
            className={`badge-unlock-icon relative flex h-36 w-36 items-center justify-center overflow-hidden rounded-[2rem] border-2 bg-black/70`}
            style={{ borderColor: colors.ring }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${current.accentSoft} opacity-80`} />
            <div className="absolute inset-0 badge-unlock-sheen bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.32)_50%,transparent_100%)]" />
            <Icon
              size={54}
              className="relative z-10 text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.55)]"
            />
          </div>

          <div
            className="badge-unlock-spark absolute -left-8 -top-5 h-16 w-16"
            style={{
              background: `radial-gradient(circle, ${colors.ring}, transparent 60%)`,
              filter: "blur(0.5px)",
            }}
          />
          <div
            className="badge-unlock-spark badge-unlock-spark-delay absolute -bottom-5 -right-10 h-20 w-20"
            style={{
              background: `radial-gradient(circle, ${colors.ring}, transparent 60%)`,
              filter: "blur(0.5px)",
            }}
          />
        </div>

        <div className="badge-unlock-text text-center">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            {current.name}
          </h2>
          <p className="mt-1 text-sm text-slate-400">{current.subtitle}</p>
          <span
            className={`mt-3 inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.26em] ${colors.pill}`}
          >
            {current.rarity}
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes badgeUnlockPop {
          0%   { transform: translateY(22px) scale(0.76); opacity: 0; }
          18%  { transform: translateY(0) scale(1.06); opacity: 1; }
          68%  { transform: translateY(-3px) scale(1); opacity: 1; }
          100% { transform: translateY(-18px) scale(0.95); opacity: 0; }
        }
        @keyframes badgeUnlockBackdrop {
          0%   { opacity: 0; }
          14%  { opacity: 1; }
          75%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes badgeUnlockRing {
          0%   { transform: scale(0.45); opacity: 0.75; }
          100% { transform: scale(1.65); opacity: 0; }
        }
        @keyframes badgeUnlockRingOuter {
          0%   { transform: scale(0.35); opacity: 0.35; }
          100% { transform: scale(1.85); opacity: 0; }
        }
        @keyframes badgeUnlockSheen {
          0%   { transform: translateX(-110%); }
          100% { transform: translateX(210%); }
        }
        @keyframes badgeUnlockSpark {
          0%   { opacity: 0; transform: translateY(0) scale(0.5); }
          28%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-52px) scale(1.3); }
        }
        @keyframes badgeUnlockLabel {
          0%   { opacity: 0; transform: translateY(-8px); }
          18%  { opacity: 1; transform: translateY(0); }
          72%  { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes badgeUnlockIconPulse {
          0%   { transform: scale(1); }
          42%  { transform: scale(1.07); }
          100% { transform: scale(1); }
        }
        .badge-unlock-pop {
          animation: badgeUnlockPop 3s ease forwards;
        }
        .badge-unlock-ring {
          animation: badgeUnlockRing 2.8s ease-out forwards;
        }
        .badge-unlock-ring-outer {
          animation: badgeUnlockRingOuter 3.1s ease-out 0.18s forwards;
        }
        .badge-unlock-backdrop {
          animation: badgeUnlockBackdrop 3s ease forwards;
        }
        .badge-unlock-text {
          text-shadow: 0 8px 30px rgba(0, 0, 0, 0.65);
        }
        .badge-unlock-label {
          animation: badgeUnlockLabel 3s ease forwards;
        }
        .badge-unlock-sheen {
          animation: badgeUnlockSheen 1.3s ease-out 0.22s forwards;
        }
        .badge-unlock-icon {
          animation: badgeUnlockIconPulse 1.6s ease-in-out infinite;
        }
        .badge-unlock-spark {
          animation: badgeUnlockSpark 1.25s ease-out infinite;
        }
        .badge-unlock-spark-delay {
          animation-delay: 230ms;
        }
      `}</style>
    </div>
  );
}
