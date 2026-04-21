import { DIFFICULTY_POINTS, DIFFICULTY_STYLE, formatTime, TIME_LIMIT } from "../quiz.lib";
import type { QuizWithResponses, QResponse, QuizPhase } from "../quiz.types";
import { CheckCircle2, XCircle, Clock, Lightbulb } from "lucide-react";
type Props = {
  question: QuizWithResponses;
  phase: QuizPhase;
  timer: number;
  selectedResponse: QResponse | null;
  hintUsed: boolean;       
  hintReady: boolean;     
  hintVisible: boolean;
  hintText: string | null;
  onSelect: (response: QResponse) => void;
  onHint: () => void;
};

export default function QuestionCard({
  question,
  phase,
  timer,
  selectedResponse,
  hintUsed,
  hintReady,
  hintVisible,
  hintText,
  onSelect,
  onHint,
}: Props) {
  const timerWarning = timer > TIME_LIMIT;

  function getChoiceStyle(resp: QResponse): string {
    if (phase !== "feedback")
      return "border-white/10 bg-white/5 hover:border-orange-400/40 hover:bg-orange-500/10 cursor-pointer";
    if (resp.isCorrect) return "border-emerald-400/50 bg-emerald-500/15 cursor-default";
    if (resp.rspns_id === selectedResponse?.rspns_id)
      return "border-rose-400/50 bg-rose-500/15 cursor-default";
    return "border-white/5 bg-white/[0.02] opacity-50 cursor-default";
  }

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)] sm:p-8">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.08),transparent_50%)]"
        aria-hidden
      />
      <div className="relative">

        {/* Difficulty + Timer */}
        <div className="flex items-center justify-between gap-3">
          <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest ${DIFFICULTY_STYLE[question.difficulty]}`}>
            {question.difficulty} · {DIFFICULTY_POINTS[question.difficulty]}pt
          </span>
          <div className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-colors ${
            timerWarning
              ? "border-rose-400/40 bg-rose-500/10 text-rose-300"
              : "border-white/10 bg-white/5 text-white"
          }`}>
            <Clock size={13} className={timerWarning ? "text-rose-400" : "text-slate-400"} />
            <span className="tabular-nums text-xs font-bold">{formatTime(timer)}</span>
            {phase === "question" && (
              <span className={`text-[10px] ${timerWarning ? "text-rose-400" : "text-slate-500"}`}>
                {timerWarning ? "no time bonus" : "/ 15s"}
              </span>
            )}
          </div>
        </div>

        {/* Question text */}
        <p className="mt-6 text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
          {question.question}
        </p>

        {/* Hint area */}
{phase === "question" && (
  <div className="mt-4">
    {!hintVisible ? (
      // Button state — changes label based on whether AI is ready
      <button
        onClick={onHint}
        disabled={!hintReady}  // disabled until AI finishes
        className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition
          ${!hintReady
            ? "border-white/10 bg-white/5 text-slate-500 cursor-not-allowed"   // still generating
            : "border-amber-400/20 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 cursor-pointer" // ready
          }`}
      >
        <Lightbulb size={13} className={!hintReady ? "animate-pulse" : ""} />
        {!hintReady ? "Preparing hint…" : "Use hint (costs −1 bonus point)"}
      </button>
    ) : (
      // Hint revealed — no more loading spinner needed
      <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-3 py-2">
        <div className="flex items-center gap-1.5 text-amber-300">
          <Lightbulb size={12} />
          <span className="text-[10px] font-bold uppercase tracking-widest">Hint</span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-amber-100/80">{hintText}</p>
      </div>
    )}
  </div>
)}

        {/* Choices */}
        <div className="mt-5 space-y-3">
          {question.responses.map((resp) => (
            <button
              key={resp.rspns_id}
              onClick={() => onSelect(resp)}
              disabled={phase === "feedback"}
              className={`w-full rounded-2xl border p-4 text-left transition-all duration-200 ${getChoiceStyle(resp)}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-medium leading-relaxed text-white">
                  {resp.response}
                </span>
                {phase === "feedback" && resp.isCorrect && (
                  <CheckCircle2 size={17} className="shrink-0 text-emerald-400" />
                )}
                {phase === "feedback" &&
                  resp.rspns_id === selectedResponse?.rspns_id &&
                  !resp.isCorrect && <XCircle size={17} className="shrink-0 text-rose-400" />}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}