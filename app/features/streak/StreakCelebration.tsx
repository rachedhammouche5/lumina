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
    const timer = setTimeout(() => setPayload(null), 5000);
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
      <div className="streak-backdrop absolute inset-0 bg-slate-950/60 backdrop-blur-[10px]" />
      <div className="streak-ring absolute h-[420px] w-[420px] rounded-full border border-orange-400/40" />
      <div className="streak-pop relative flex flex-col items-center gap-6">
        <div className="relative">
          <div className="absolute -inset-10 rounded-full bg-orange-500/30 blur-3xl" />
          <div className="streak-flame relative flex h-40 w-40 items-center justify-center text-orange-200">
            <Flame size={90} />
          </div>
          <div className="streak-sparks absolute -left-10 -top-6 h-20 w-20" />
          <div className="streak-sparks absolute -right-12 -bottom-8 h-24 w-24 delay-150" />
        </div>
        <div className="streak-text text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-orange-200/70">
            Streak Updated
          </p>
          <p className="mt-2 text-3xl font-black text-white">
            {payload.previous} &rarr; {payload.current}{" "}
            <span className="text-base font-semibold text-slate-200">
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
          18% {
            transform: translateY(0) scale(1.08);
            opacity: 1;
          }
          82% {
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
          12% {
            opacity: 1;
          }
          88% {
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
            transform: scale(1.65);
            opacity: 0;
          }
        }
        @keyframes flameFlicker {
          0% {
            transform: translateY(0) scale(1) rotate(-2deg);
          }
          25% {
            transform: translateY(-12px) scale(1.08) rotate(2deg);
          }
          55% {
            transform: translateY(-6px) scale(1.04) rotate(-2deg);
          }
          100% {
            transform: translateY(0) scale(1) rotate(1deg);
          }
        }
        @keyframes flameWaver {
          0% {
            transform: translateX(0) scaleY(1);
          }
          50% {
            transform: translateX(-4px) scaleY(1.06);
          }
          100% {
            transform: translateX(0) scaleY(1);
          }
        }
        @keyframes flamePulse {
          0% {
            filter: blur(0.4px) brightness(1);
          }
          50% {
            filter: blur(0.6px) brightness(1.08);
          }
          100% {
            filter: blur(0.4px) brightness(1);
          }
        }
        @keyframes sparksFloat {
          0% {
            opacity: 0;
            transform: translateY(0) scale(0.6);
          }
          30% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-40px) scale(1.1);
          }
        }
        .streak-pop {
          animation: streakPop 4.8s ease forwards;
        }
        .streak-ring {
          animation: streakRing 4.6s ease-out forwards;
        }
        .streak-flame {
          animation: flameFlicker 1s ease-in-out infinite;
          filter: drop-shadow(0 0 18px rgba(249, 115, 22, 0.7))
            drop-shadow(0 0 40px rgba(251, 146, 60, 0.55));
        }
        .streak-backdrop {
          animation: streakBackdrop 4.8s ease forwards;
        }
        .streak-text {
          text-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
        }
        .streak-sparks {
          background: radial-gradient(circle, rgba(251, 146, 60, 0.9), transparent 55%),
            radial-gradient(circle, rgba(253, 186, 116, 0.7), transparent 60%);
          filter: blur(0.5px);
          animation: sparksFloat 2.2s ease-out infinite;
        }
        .streak-flame {
          animation: flameWaver 1.1s ease-in-out infinite, flamePulse 1.7s ease-in-out infinite;
          filter: drop-shadow(0 0 24px rgba(251, 146, 60, 0.6))
            drop-shadow(0 0 60px rgba(249, 115, 22, 0.55));
        }
      `}</style>
    </div>
  );
}
