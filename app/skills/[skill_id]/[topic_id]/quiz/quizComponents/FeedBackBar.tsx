import { ChevronRight, Loader2 } from "lucide-react";
import { DIFFICULTY_POINTS, TIME_LIMIT } from "../quiz.lib";
import type { AnswerRecord } from "../quiz.types";

type Props = {
  lastAnswer: AnswerRecord;
  isLastQuestion: boolean;
  saving: boolean;
  onNext: () => void;
};

export default function FeedbackBar({ lastAnswer, isLastQuestion, saving, onNext }: Props) {
  const wasCorrect = lastAnswer.chosen?.isCorrect ?? false;
  const wasFast = lastAnswer.timeTaken <= TIME_LIMIT;
  const wasHinted = lastAnswer.hintUsed;

  return (
    <div className="mt-6 flex items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`text-sm font-bold ${wasCorrect ? "text-emerald-400" : "text-rose-400"}`}>
          {wasCorrect ? "✓ Correct" : "✗ Wrong"}
        </span>

        {wasCorrect && (
          <>
            <span className="rounded-lg bg-orange-500/20 px-2 py-0.5 text-xs font-bold text-orange-300">
              +{DIFFICULTY_POINTS[lastAnswer.question.difficulty]} difficulty
            </span>
            {wasFast && (
              <span className="rounded-lg bg-sky-500/20 px-2 py-0.5 text-xs font-bold text-sky-300">
                +1 speed
              </span>
            )}
            {!wasHinted && (
              <span className="rounded-lg bg-violet-500/20 px-2 py-0.5 text-xs font-bold text-violet-300">
                +1 no hint
              </span>
            )}
            <span className="text-xs font-black text-white">= {lastAnswer.pointsEarned}pts</span>
          </>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={saving}
        className="flex shrink-0 items-center gap-2 rounded-2xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-400 disabled:opacity-60"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        {saving ? "Saving…" : isLastQuestion ? "See Results" : "Next"}
        {!saving && <ChevronRight size={15} />}
      </button>
    </div>
  );
}