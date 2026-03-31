import { DIFFICULTY_POINTS, DIFFICULTY_STYLE, SESSION_LENGTH } from "../quiz.lib";
import type { Difficulty, QuizWithResponses } from "../quiz.types";

type Props = {
  topicTitle: string;
  questions: QuizWithResponses[];
  onStart: () => void;
};

export default function IntroScreen({ topicTitle, questions, onStart }: Props) {
  const difficultyBreakdown = (["easy", "medium", "hard", "pro"] as Difficulty[]).filter(
    (d) => questions.some((q) => q.difficulty === d)
  );

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-lg">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950/30 p-8 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.15),transparent_50%)]" aria-hidden />
          <div className="relative">
            <span className="inline-block rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-300">
              Adaptive Quiz
            </span>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-white">{topicTitle}</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              {SESSION_LENGTH} questions that adapt to your performance. Answering correctly and
              quickly unlocks harder questions and more points. Hints are available but cost you
              bonus points.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ["Starting difficulty", "Medium"],
                ["Questions", SESSION_LENGTH.toString()],
                ["Time bonus", "≤ 15s per question"],
                ["Hint penalty", "−1 bonus point"],
              ].map(([label, val]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="mt-1 text-sm font-bold text-white">{val}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-300/80">
                Scoring
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {difficultyBreakdown.map((d) => (
                  <div
                    key={d}
                    className={`rounded-xl border px-3 py-1.5 text-xs font-bold ${DIFFICULTY_STYLE[d]}`}
                  >
                    {d} = {DIFFICULTY_POINTS[d]}pt
                  </div>
                ))}
                <div className="rounded-xl border border-sky-400/30 bg-sky-500/10 px-3 py-1.5 text-xs font-bold text-sky-300">
                  fast = +1pt
                </div>
                <div className="rounded-xl border border-violet-400/30 bg-violet-500/10 px-3 py-1.5 text-xs font-bold text-violet-300">
                  no hint = +1pt
                </div>
              </div>
            </div>

            <button
              onClick={onStart}
              className="mt-8 w-full rounded-2xl bg-orange-500 px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-orange-400 active:scale-[0.98]"
            >
              Start Quiz →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}