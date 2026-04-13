"use client";

import { useEffect, useMemo, useState } from "react";
import { Flame } from "lucide-react";

type StreakCelebrationPayload = {
  previous: number;
  current: number;
};

const EVENT_NAME = "lumina:streak-celebrate";

export function triggerStreakCelebration(payload: StreakCelebrationPayload) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));
}

export default function StreakCelebration() {
  const [payload, setPayload] = useState<StreakCelebrationPayload | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<StreakCelebrationPayload>).detail;
      setPayload(detail);
      setAnimationKey(Date.now());
    };
    window.addEventListener(EVENT_NAME, handler as EventListener);
    return () => window.removeEventListener(EVENT_NAME, handler as EventListener);
  }, []);

  useEffect(() => {
    if (!payload) return;
    const timer = setTimeout(() => setPayload(null), 1600);
    return () => clearTimeout(timer);
  }, [animationKey, payload]);

  const copy = useMemo(() => {
    if (!payload) return null;
    const delta = payload.current - payload.previous;
    const label = delta > 0 ? `+${delta}` : delta < 0 ? `${delta}` : null;
    return { delta, label };
  }, [payload]);

  if (!payload) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center">
      <div className="streak-backdrop absolute inset-0 bg-slate-950/60 backdrop-blur-[8px]" />
      <div className="streak-ring absolute h-72 w-72 rounded-full border border-orange-400/40" />
      <div className="streak-pop relative flex items-center gap-6 rounded-[32px] border border-orange-300/30 bg-slate-950/85 px-8 py-6 shadow-[0_25px_90px_rgba(0,0,0,0.65)]">
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-orange-500/25 blur-2xl" />
          <div className="streak-flame relative flex h-20 w-20 items-center justify-center rounded-[28px] bg-orange-500/15 text-orange-200">
            <Flame size={48} />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-200/70">
            Streak Updated
          </p>
          <p className="mt-2 text-2xl font-black text-white">
            {payload.previous} &rarr; {payload.current}{" "}
            <span className="text-base font-semibold text-slate-300">
              {payload.current === 1 ? "day" : "days"}
            </span>
          </p>
          {copy?.label && (
            <span className="mt-2 inline-flex items-center rounded-full border border-orange-300/25 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-200">
              {copy.label}
            </span>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes streakPop {
          0% {
            transform: translateY(16px) scale(0.8);
            opacity: 0;
          }
          20% {
            transform: translateY(0) scale(1.08);
            opacity: 1;
          }
          80% {
            transform: translateY(-4px) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-14px) scale(0.96);
            opacity: 0;
          }
        }
        @keyframes streakBackdrop {
          0% {
            opacity: 0;
          }
          15% {
            opacity: 1;
          }
          85% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        @keyframes streakRing {
          0% {
            transform: scale(0.55);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        @keyframes flameFlicker {
          0% {
            transform: translateY(0) scale(1) rotate(-2deg);
          }
          30% {
            transform: translateY(-6px) scale(1.08) rotate(3deg);
          }
          60% {
            transform: translateY(-3px) scale(1.04) rotate(-3deg);
          }
          100% {
            transform: translateY(0) scale(1) rotate(2deg);
          }
        }
        .streak-pop {
          animation: streakPop 1.4s ease forwards;
        }
        .streak-ring {
          animation: streakRing 1.4s ease-out forwards;
        }
        .streak-flame {
          animation: flameFlicker 0.9s ease-in-out infinite;
          filter: drop-shadow(0 0 16px rgba(249, 115, 22, 0.65))
            drop-shadow(0 0 30px rgba(251, 146, 60, 0.45));
        }
        .streak-backdrop {
          animation: streakBackdrop 1.4s ease forwards;
        }
      `}</style>
    </div>
  );
}
