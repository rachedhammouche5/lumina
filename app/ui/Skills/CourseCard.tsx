import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  compact?: boolean;
  progress?: number;
}

const GRADIENTS = [
  { from: "from-orange-600/40", via: "via-orange-900/20", accent: "bg-orange-500/10", text: "text-orange-400/40" },
  { from: "from-blue-600/40", via: "via-blue-900/20", accent: "bg-blue-500/10", text: "text-blue-400/40" },
  { from: "from-violet-600/40", via: "via-violet-900/20", accent: "bg-violet-500/10", text: "text-violet-400/40" },
  { from: "from-emerald-600/40", via: "via-emerald-900/20", accent: "bg-emerald-500/10", text: "text-emerald-400/40" },
  { from: "from-rose-600/40", via: "via-rose-900/20", accent: "bg-rose-500/10", text: "text-rose-400/40" },
  { from: "from-cyan-600/40", via: "via-cyan-900/20", accent: "bg-cyan-500/10", text: "text-cyan-400/40" },
];

export function hashTitle(title: string): number {
  let h = 0;
  for (const c of title) h = (h * 31 + c.charCodeAt(0)) & 0xffff;
  return h % GRADIENTS.length;
}

export { GRADIENTS };

function CourseCard({ id, title, description, image, compact = false, progress }: CourseCardProps) {
  const g = GRADIENTS[hashTitle(title)];
  const isEnrolled = typeof progress === "number";
  const initials = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

  return (
    <Link
      href={`/skills/${id}`}
      prefetch={true}
      className="group relative flex flex-col bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-orange-500/25 hover:shadow-[0_8px_48px_rgba(249,115,22,0.1)] hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50"
    >
      {/* Thumbnail */}
      <div className={`relative w-full ${compact ? "aspect-[3/1]" : "aspect-[2/1]"} overflow-hidden`}>
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className={`relative h-full w-full bg-gradient-to-br ${g.from} ${g.via} to-slate-900 flex items-center justify-center overflow-hidden`}>
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
            />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 ${g.accent} blur-3xl rounded-full`} />
            <span className={`relative ${compact ? "text-3xl" : "text-4xl"} font-black italic tracking-tighter ${g.text} select-none`}>
              {initials}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />

        {/* Progress badge overlay (enrolled only) */}
        {isEnrolled && (
          <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur-sm border border-white/10 rounded-full px-2 py-0.5 text-[10px] font-bold text-orange-400">
            {progress}%
          </div>
        )}
      </div>

      {/* Content */}
      <div className={`flex flex-col flex-grow ${compact ? "p-4 gap-2" : "p-5 gap-3"}`}>
        <div className="flex items-center gap-1.5">
          <BookOpen size={10} className="text-orange-500/70 flex-shrink-0" />
          <span className="text-[9px] font-bold tracking-[0.15em] uppercase text-orange-500/70">
            {isEnrolled ? "Enrolled" : "Course"}
          </span>
        </div>

        <div className="flex-grow">
          <h3 className={`${compact ? "text-[13px]" : "text-[15px]"} font-bold text-white group-hover:text-orange-400 transition-colors duration-300 line-clamp-1 leading-snug mb-1`}>
            {title}
          </h3>
          <p className={`text-slate-400 ${compact ? "text-[11px]" : "text-[12px]"} leading-relaxed line-clamp-2`}>
            {description}
          </p>
        </div>

        {/* Footer */}
        {isEnrolled ? (
          <div className="flex flex-col gap-1.5 pt-1 border-t border-white/5">
            <div className="w-full h-1 rounded-full bg-slate-800/80">
              <div
                className="h-1 rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-medium">{progress}% complete</span>
              <span className="text-[10px] text-orange-400 font-bold flex items-center gap-0.5">
                Continue <ArrowRight size={9} />
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between pt-1 border-t border-white/5">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-500">
              Start learning
            </span>
            <div className="w-6 h-6 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:border-orange-500 transition-all duration-300">
              <ArrowRight size={11} className="text-orange-400 group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseCard;
