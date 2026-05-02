"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Brain, CheckCircle2, AlertTriangle,
  HelpCircle, RefreshCw, Loader2, Lightbulb, Mic, MicOff,
} from "lucide-react";
import type { FeynmanResult } from "@/app/api/feynman/route";
import { useVoiceInput, VOICE_LANGS } from "@/lib/hooks/useVoiceInput";

/* ── Score ring ─────────────────────────────────────────── */

function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;

  const color =
    score >= 76 ? "#22c55e" :
    score >= 56 ? "#f59e0b" :
    "#ef4444";

  const glowColor =
    score >= 76 ? "rgba(34,197,94,0.4)" :
    score >= 56 ? "rgba(245,158,11,0.4)" :
    "rgba(239,68,68,0.4)";

  const label =
    score >= 76 ? "Strong" :
    score >= 56 ? "Developing" :
    "Needs Work";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-36 w-36">
        {/* glow behind ring */}
        <div
          className="absolute inset-0 rounded-full blur-2xl opacity-40"
          style={{ background: `radial-gradient(circle, ${glowColor}, transparent 65%)` }}
        />
        <svg
          className="relative h-full w-full -rotate-90"
          viewBox="0 0 128 128"
          style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}
        >
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#27272a" strokeWidth="10" />
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke={color}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${circumference}`}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white">{score}</span>
          <span className="text-xs font-medium text-zinc-400">/100</span>
        </div>
      </div>
      <span className="text-sm font-bold" style={{ color }}>{label}</span>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */

interface Props {
  topicId: string;
  skillId: string;
  topicTitle: string;
  topicDescription: string;
  skillTitle: string;
}

type Phase = "input" | "loading" | "result";

export default function FeynmanClient({
  topicId, skillId, topicTitle, skillTitle,
}: Props) {
  const [phase, setPhase] = useState<Phase>("input");
  const [explanation, setExplanation] = useState("");
  const [result, setResult] = useState<FeynmanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const MIN_CHARS = 80;
  const charsLeft = Math.max(0, MIN_CHARS - explanation.length);

  const handleVoiceTranscript = useCallback((text: string) => {
    setExplanation(prev => prev + (prev.trim() ? " " : "") + text);
  }, []);

  const {
    voiceState, interimText, lang, setLang,
    startListening, stopListening, voiceError: micError, isSupported,
  } = useVoiceInput(handleVoiceTranscript);

  async function handleSubmit() {
    if (explanation.trim().length < MIN_CHARS) return;
    setPhase("loading");
    setError(null);
    try {
      const res = await fetch("/api/feynman", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ explanation, topic_id: topicId, skill_id: skillId }),
      });
      if (!res.ok) throw new Error("Evaluation failed");
      const data: FeynmanResult = await res.json();
      setResult(data);
      setPhase("result");
    } catch {
      setError("Something went wrong. Please try again.");
      setPhase("input");
    }
  }

  function handleRetry() {
    if (voiceState === "listening") stopListening();
    setExplanation("");
    setResult(null);
    setPhase("input");
  }

  return (
    <main className="min-h-screen bg-[#07050f] pb-20 pt-24 text-white">

      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full bg-violet-900/12 blur-[100px]" />
        <div className="absolute left-0 top-1/2 h-[250px] w-[250px] -translate-y-1/2 rounded-full bg-indigo-800/8 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">

        {/* Back link */}
        <Link
          href={`/skills/${skillId}/${topicId}`}
          className="group mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to {topicTitle}
        </Link>

        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 ring-1 ring-violet-500/25 shadow-[0_0_18px_rgba(139,92,246,0.25)]">
            <Brain size={22} className="text-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.7)]" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-violet-400">
              Feynman AI Coach
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-white">
              {topicTitle}
            </h1>
            <p className="mt-1 text-sm text-zinc-500">{skillTitle}</p>
          </div>
        </div>

        {/* ── Input phase ── */}
        {(phase === "input" || phase === "loading") && (
          <div className="space-y-6">

            {/* Instruction card */}
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
              <div className="flex items-start gap-3">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-violet-400" />
                <div>
                  <p className="text-sm font-semibold text-white">The Feynman Technique</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                    Explain <span className="font-semibold text-white">{topicTitle}</span> in your
                    own words, as if you were teaching it to someone who has never heard of it.
                    Don&apos;t copy the materials — use your own understanding. The AI will identify
                    what you truly know and what you still need to review.
                  </p>
                </div>
              </div>
            </div>

            {/* Textarea */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                Your explanation
              </label>
              <textarea
                value={explanation}
                onChange={e => setExplanation(e.target.value)}
                disabled={phase === "loading"}
                placeholder="Start explaining the topic in your own words..."
                rows={9}
                className="w-full resize-none rounded-2xl border border-violet-500/20 bg-violet-500/5 px-5 py-4 text-sm leading-relaxed text-white placeholder-violet-300/30 outline-none transition focus:border-violet-500/60 focus:shadow-[0_0_20px_rgba(139,92,246,0.12)] focus:ring-2 focus:ring-violet-500/20 disabled:opacity-50"
              />
              {interimText && (
                <p className="mt-2 px-1 text-xs italic text-violet-300/40">{interimText}…</p>
              )}
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {isSupported && (
                    <button
                      type="button"
                      onClick={voiceState === "listening" ? stopListening : startListening}
                      disabled={phase === "loading"}
                      className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition disabled:opacity-40 ${
                        voiceState === "listening"
                          ? "bg-red-500/15 text-red-400 ring-1 ring-red-500/30"
                          : "bg-zinc-800 text-zinc-400 hover:text-zinc-200"
                      }`}
                    >
                      {voiceState === "listening"
                        ? <><MicOff size={11} /> Stop</>
                        : <><Mic size={11} /> Speak</>
                      }
                    </button>
                  )}
                  <div className="flex gap-0.5">
                    {VOICE_LANGS.map(l => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => setLang(l.code)}
                        className={`rounded-lg px-2 py-1 text-[11px] font-bold transition ${
                          lang === l.code
                            ? "bg-violet-500/25 text-violet-300"
                            : "text-zinc-600 hover:text-zinc-400"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-zinc-600">{explanation.length} chars</span>
                  {charsLeft > 0 && (
                    <span className="text-xs text-zinc-500">{charsLeft} more needed</span>
                  )}
                </div>
              </div>
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                {error}
              </p>
            )}
            {micError && (
              <p className="rounded-xl border border-orange-500/20 bg-orange-500/5 px-3 py-2.5 text-xs text-orange-400">
                {micError}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={explanation.trim().length < MIN_CHARS || phase === "loading"}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3.5 text-sm font-bold text-white shadow-[0_0_28px_rgba(139,92,246,0.45)] transition hover:bg-violet-500 hover:shadow-[0_0_38px_rgba(139,92,246,0.6)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {phase === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Evaluating your understanding...
                </>
              ) : (
                <>
                  <Brain size={16} />
                  Evaluate My Understanding
                </>
              )}
            </button>
          </div>
        )}

        {/* ── Result phase ── */}
        {phase === "result" && result && (
          <div className="space-y-6">

            {/* Score */}
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/5 py-8">
              <ScoreRing score={result.mastery_score} />
              <p className="max-w-sm text-center text-sm leading-relaxed text-zinc-400">
                {result.encouragement}
              </p>
            </div>

            {/* Strengths + Gaps side by side */}
            <div className="grid grid-cols-2 gap-4">
              {result.strengths.length > 0 && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-emerald-400" />
                    <p className="text-sm font-bold text-emerald-400">What you got right</p>
                  </div>
                  <ul className="space-y-2">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.gaps.length > 0 && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <AlertTriangle size={15} className="text-amber-400" />
                    <p className="text-sm font-bold text-amber-400">What to review</p>
                  </div>
                  <ul className="space-y-2">
                    {result.gaps.map((g, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-zinc-300">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Follow-up question */}
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
              <div className="mb-2 flex items-center gap-2">
                <HelpCircle size={15} className="text-violet-400" />
                <p className="text-sm font-bold text-violet-400">Challenge question</p>
              </div>
              <p className="text-sm leading-relaxed text-zinc-300">{result.follow_up}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-zinc-800 bg-zinc-900 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                <RefreshCw size={14} />
                Try Again
              </button>
              <Link
                href={`/skills/${skillId}/${topicId}`}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-violet-600 py-3 text-sm font-bold text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] transition hover:bg-violet-500 hover:shadow-[0_0_32px_rgba(139,92,246,0.55)]"
              >
                Back to Content
              </Link>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}
