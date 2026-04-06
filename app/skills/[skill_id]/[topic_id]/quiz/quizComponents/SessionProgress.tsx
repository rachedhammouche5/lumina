import { Star } from "lucide-react";
import { DIFFICULTY_STYLE, SESSION_LENGTH } from "../quiz.lib";
import type { Difficulty } from "../quiz.types";

type Props = {
  questionsServed: number;
  totalPoints: number;
  currentDifficulty: Difficulty;
};

export default function SessionProgress({ questionsServed, totalPoints, currentDifficulty }: Props) {
  const progress = (questionsServed / SESSION_LENGTH) * 100;

  return (
    <div className="mb-6">
      {/* Progress bar */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-1.5 rounded-full bg-orange-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="shrink-0 text-xs font-semibold text-slate-400">
          {questionsServed} / {SESSION_LENGTH}
        </span>
      </div>

      {/* Running score footer */}
      <div className="mt-4 flex items-center justify-center gap-3 text-xs text-slate-500">
        <Star size={11} className="text-orange-400" />
        <span>{totalPoints} pts earned so far</span>
        <span>·</span>
        <span className={`font-semibold ${DIFFICULTY_STYLE[currentDifficulty]}`}>
          {currentDifficulty} track
        </span>
      </div>
    </div>
  );
}