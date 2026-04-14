import type { CommentItem } from "../../actions/review/types";
import { getRatingCounts, totalRating, STAR_LEVELS } from "../../actions/review/rating-utils";

type RatingProps = {
  comments: CommentItem[];
};

export default function Rating({ comments }: RatingProps) {
  const average = totalRating(comments);
  const counts = getRatingCounts(comments);
  const total = comments.length;

  return (
    <section className=" flex flex-1 mt-10 justify-center items-center max-h-60 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-transparent p-5 shadow-[0_20px_80px_rgba(0,0,0,0.25)]">
      <div className="flex flex-col gap-6 my-5 md:flex-row md:items-center md:justify-between h-30">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-5xl text-orange-400">
            ★
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Average rating</p>
            <div className="mt-1 flex items-end gap-2">
              <span className="text-5xl font-black tracking-tight text-white">
                {average ? average.toFixed(1) : "0.0"}
              </span>
              <span className="pb-1 text-sm text-slate-500">/ 5</span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              {total} {total === 1 ? "rating" : "ratings"} total
            </p>
          </div>
        </div>

        <div className="grid gap-2 text-sm text-slate-300 md:min-w-[280px]">
          {STAR_LEVELS.map((level) => {
            const count = counts[level] ?? 0;
            const percent = total ? Math.round((count / total) * 100) : 0;

            return (
              <div key={level} className="flex items-center gap-3">
                <span className="w-10 text-right font-semibold text-slate-400">{level}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-300"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-8 text-right tabular-nums text-slate-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
