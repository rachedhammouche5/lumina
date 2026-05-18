"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Brain, CheckCircle2, AlertTriangle,
  HelpCircle, RefreshCw, Loader2, Lightbulb, Mic, MicOff,
} from "lucide-react";
import type { FeynmanResult } from "@/app/api/feynman/route";
import { useVoiceInput, VOICE_LANGS } from "@/lib/hooks/useVoiceInput";

/* ── Score ring (Logic remains the same) ────────────────── */
function ScoreRing({ score }: { score: number }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 76 ? "#22c55e" : score >= 56 ? "#f59e0b" : "#ef4444";
  const glowColor = score >= 76 ? "rgba(34,197,94,0.4)" : score >= 56 ? "rgba(245,158,11,0.4)" : "rgba(239,68,68,0.4)";
  const label = score >= 76 ? "Strong" : score >= 56 ? "Developing" : "Needs Work";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative h-36 w-36">
        <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: `radial-gradient(circle, ${glowColor}, transparent 65%)` }} />
        <svg className="relative h-full w-full -rotate-90" viewBox="0 0 128 128" style={{ filter: `drop-shadow(0 0 6px ${glowColor})` }}>
          <circle cx="64" cy="64" r={radius} fill="none" stroke="#27272a" strokeWidth="10" />
          <circle cx="64" cy="64" r={radius} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round" strokeDasharray={`${filled} ${circumference}`} className="transition-all duration-1000 ease-out" />
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

interface Props {
  topicId: string;
  skillId: string;
  topicTitle: string;
  topicDescription: string;
  skillTitle: string;
}

type Phase = "input" | "loading" | "result";

export default function FeynmanClient({ topicId, skillId, topicTitle, topicDescription, skillTitle }: Props) {
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
    startListening, stopListening, voiceError: micError, isSupported, permissionState, requestPermission,
  } = useVoiceInput(handleVoiceTranscript);

  async function handleSubmit() {
    if (explanation.trim().length < MIN_CHARS) return;
    
    // IMPORTANT: Stop mic if user clicks submit while recording
    if (voiceState === "listening") stopListening();

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
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-violet-700/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <Link href={`/skills/${skillId}/${topicId}`} className="group mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
          Back to {topicTitle}
        </Link>

        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-500/15 ring-1 ring-violet-500/25">
            <Brain size={22} className="text-violet-400" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-violet-400">Feynman AI Coach</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-white">{topicTitle}</h1>
            <p className="mt-1 text-sm text-zinc-500">{skillTitle}</p>
            {topicDescription ? (
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400">
                {topicDescription}
              </p>
            ) : null}
          </div>
        </div>

        {phase !== "result" && (
          <div className="space-y-6">
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
              <div className="flex items-start gap-3">
                <Lightbulb size={16} className="mt-0.5 shrink-0 text-violet-400" />
                <p className="text-sm leading-relaxed text-zinc-400">Explain <b>{topicTitle}</b> in your own words.</p>
              </div>
            </div>

            <div className="relative">
              <textarea
                value={explanation}
                onChange={e => setExplanation(e.target.value)}
                disabled={phase === "loading"}
                placeholder="Start explaining..."
                rows={9}
                className="w-full resize-none rounded-2xl border border-violet-500/20 bg-violet-500/5 px-5 py-4 text-sm leading-relaxed text-white outline-none focus:border-violet-500/60 transition"
              />
              
              {/* FIXED: Interim text display for feedback */}
              {interimText && (
                <p className="mt-2 px-1 text-xs italic text-violet-300/40 animate-pulse">
                  {interimText}...
                </p>
              )}

              {error && (
                <p className="mt-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                  {error}
                </p>
              )}

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* DEBUG: Always show voice button for testing */}
                  {true && (
  <div className="relative group">
    <button
      type="button"
      onClick={() => {
        console.log('🎤 Button clicked! permissionState:', permissionState, 'voiceState:', voiceState);
        if (permissionState === 'denied') {
          console.log('Calling requestPermission');
          requestPermission();
        } else if (voiceState === "listening") {
          console.log('Calling stopListening');
          stopListening();
        } else {
          console.log('Calling startListening');
          startListening();
        }
      }}
      className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition ${
        permissionState === 'denied' 
          ? "bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-400" // Allow clicking to request
          : voiceState === "listening"
            ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
            : "bg-zinc-800 text-zinc-400 hover:text-white"
      }`}
    >
      {voiceState === "listening" ? <MicOff size={14} /> : <Mic size={14} />}
      Speak
    </button>

    {/* Tooltip for blocked users */}
    {permissionState === 'denied' && (
      <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 p-2 bg-black border border-white/10 rounded-lg text-[10px] text-zinc-400 shadow-xl">
        Mic is blocked. Click to request permission or reset in browser settings.
      </div>
    )}
  </div>
)}
                  <div className="flex gap-1">
                    {VOICE_LANGS.map(l => (
                      <button
                        key={l.code}
                        onClick={() => setLang(l.code)}
                        className={`px-2 py-1 text-[10px] font-bold rounded ${lang === l.code ? "bg-violet-500/30 text-white" : "text-zinc-600"}`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-zinc-600">
                  {explanation.length} characters
                  {charsLeft > 0 ? ` · ${charsLeft} more to evaluate` : ""}
                  {!isSupported ? " · mic unavailable" : ""}
                </span>
              </div>
            </div>

            {micError && <p className="text-xs text-orange-400">{micError}</p>}

            <button
              onClick={handleSubmit}
              disabled={explanation.trim().length < MIN_CHARS || phase === "loading"}
              className="w-full rounded-2xl bg-violet-600 py-4 text-sm font-bold shadow-lg hover:bg-violet-500 transition disabled:opacity-40"
            >
              {phase === "loading" ? <Loader2 className="mx-auto animate-spin" size={20} /> : "Evaluate My Understanding"}
            </button>
          </div>
        )}

        {phase === "result" && result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-violet-500/20 bg-violet-500/5 py-8">
              <ScoreRing score={result.mastery_score} />
              <p className="max-w-sm text-center text-sm leading-relaxed text-zinc-400">{result.encouragement}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <p className="text-sm font-bold text-emerald-400">Strengths</p>
                </div>
                <ul className="text-sm space-y-2 text-zinc-300">
                  {result.strengths.map((s, i) => <li key={i} className="flex gap-2"><span>•</span>{s}</li>)}
                </ul>
              </div>
              <div className="p-5 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle size={15} className="text-amber-400" />
                  <p className="text-sm font-bold text-amber-400">Gaps</p>
                </div>
                <ul className="text-sm space-y-2 text-zinc-300">
                  {result.gaps.map((g, i) => <li key={i} className="flex gap-2"><span>•</span>{g}</li>)}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <HelpCircle size={15} className="text-violet-400" />
                <p className="text-sm font-bold text-violet-400">Challenge question</p>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">{result.follow_up}</p>
            </div>

            <div className="flex gap-3">
              <button onClick={handleRetry} className="flex-1 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-sm font-bold hover:bg-zinc-800 transition">
                <RefreshCw size={14} className="inline mr-2" /> Try Again
              </button>
              <Link href={`/skills/${skillId}/${topicId}`} className="flex-1 py-3 rounded-xl bg-violet-600 text-center text-sm font-bold hover:bg-violet-500 transition shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                Finish
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
