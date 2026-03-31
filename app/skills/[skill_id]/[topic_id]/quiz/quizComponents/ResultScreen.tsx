import { Trophy, TrendingUp, TrendingDown, CheckCircle2, XCircle, ArrowRight, LayoutDashboard, Star } from "lucide-react";
import { DIFFICULTY_STYLE, formatTime, maxPossiblePoints, calcSessionStats } from "../quiz.lib";
import type { AnswerRecord } from "../quiz.types";

type Props = {
  answers: AnswerRecord[];
  skillId: string;
  onGoRoadmap: () => void;
  onGoDashboard: () => void;
};

export default function ResultsScreen({ answers, onGoRoadmap, onGoDashboard }: Props) {
  const { totalPoints, totalTime, correctAnswers, wrongAnswers, hintsUsed, accuracy, avgTime } =
    calcSessionStats(answers);

  const max = maxPossiblePoints(answers.map((a) => a.question));
  const percentage = max > 0 ? Math.round((totalPoints / max) * 100) : 0;

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950/30 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_50%)]"
            aria-hidden
          />
          <div className="relative">

            {/* Score ring */}
            <div className="flex flex-col items-center">
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-orange-500/40 bg-orange-500/10">
                <Trophy
                  className="absolute -top-3 left-1/2 -translate-x-1/2 text-orange-400"
                  size={22}
                />
                <div className="text-center">
                  <p className="text-3xl font-black text-white">{totalPoints}</p>
                  <p className="text-xs text-slate-400">/ {max} pts</p>
                </div>
              </div>
              <h2 className="mt-4 text-2xl font-black tracking-tight text-white">
                {percentage >= 80
                  ? "Excellent work!"
                  : percentage >= 50
                  ? "Good effort!"
                  : "Keep practicing!"}
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                {correctAnswers.length}/{answers.length} correct · {formatTime(totalTime)} total
              </p>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs text-slate-400">Accuracy</p>
                <p className="mt-1 text-lg font-black text-white">{accuracy}%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs text-slate-400">Hints used</p>
                <p className="mt-1 text-lg font-black text-white">{hintsUsed}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
                <p className="text-xs text-slate-400">Avg time</p>
                <p className="mt-1 text-lg font-black text-white">{formatTime(avgTime)}</p>
              </div>
            </div>

            {/* Strong / Weak */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                <div className="flex items-center gap-2 text-emerald-400">
                  <TrendingUp size={15} />
                  <p className="text-xs font-bold uppercase tracking-widest">Strong points</p>
                </div>
                {correctAnswers.length === 0 ? (
                  <p className="mt-2 text-xs text-slate-400">No correct answers this session.</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {correctAnswers.map((a) => (
                      <li key={a.question.qst_id} className="flex items-start gap-2">
                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-400" />
                        <div>
                          <p className="text-xs leading-relaxed text-white/80">
                            {a.question.question}
                          </p>
                          <div className="mt-1 flex items-center gap-1">
                            <Star size={10} className="text-orange-400" />
                            <span className="text-[10px] font-semibold text-orange-300">
                              {a.pointsEarned} pts
                            </span>
                            <span
                              className={`ml-1 rounded px-1 text-[10px] font-bold ${DIFFICULTY_STYLE[a.question.difficulty]}`}
                            >
                              {a.question.difficulty}
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 p-4">
                <div className="flex items-center gap-2 text-rose-400">
                  <TrendingDown size={15} />
                  <p className="text-xs font-bold uppercase tracking-widest">Weak points</p>
                </div>
                {wrongAnswers.length === 0 ? (
                  <p className="mt-2 text-xs text-slate-400">No wrong answers — perfect!</p>
                ) : (
                  <ul className="mt-3 space-y-2">
                    {wrongAnswers.map((a) => (
                      <li key={a.question.qst_id} className="flex items-start gap-2">
                        <XCircle size={13} className="mt-0.5 shrink-0 text-rose-400" />
                        <div>
                          <p className="text-xs leading-relaxed text-white/80">
                            {a.question.question}
                          </p>
                          <span
                            className={`mt-1 inline-block rounded px-1 text-[10px] font-bold ${DIFFICULTY_STYLE[a.question.difficulty]}`}
                          >
                            {a.question.difficulty}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={onGoRoadmap}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <ArrowRight size={15} />
                Back to Roadmap
              </button>
              <button
                onClick={onGoDashboard}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-400"
              >
                <LayoutDashboard size={15} />
                Go to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}