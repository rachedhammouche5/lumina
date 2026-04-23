import { Trophy } from "lucide-react";

interface Props {
  title: string;
  value?: number;
}

function ProgressBar({ title, value = 0 }: Props) {
  const clamped = Math.max(0, Math.min(100, value));
  const isComplete = clamped === 100;

  return (
    <div className="relative h-auto md:h-48 flex flex-col w-full border border-slate-700/40 rounded-[2rem] bg-gradient-to-br from-slate-800/40 to-slate-900/20 p-5 md:p-7 backdrop-blur-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.3)]">

      {/* Subtle top glow when complete */}
      {isComplete && (
        <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 w-48 h-20 bg-orange-500/15 blur-[50px] rounded-full" />
      )}

      <div className="relative z-10 flex flex-col h-full justify-between gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy
              size={14}
              className={isComplete ? "text-orange-400" : "text-slate-500"}
            />
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {title}
            </span>
          </div>
          <span className={`font-black italic text-2xl md:text-3xl leading-none ${isComplete ? "text-orange-400" : "text-white"}`}>
            {clamped}%
          </span>
        </div>

        {/* Bar */}
        <div className="flex-1 flex flex-col justify-center gap-2">
          <div className="w-full h-2 rounded-full bg-slate-800/80">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-orange-600 to-orange-400 transition-all duration-700 shadow-[0_0_8px_rgba(249,115,22,0.5)]"
              style={{ width: `${clamped}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-600 font-medium">Start</span>
            <span className="text-[10px] text-slate-600 font-medium">Complete</span>
          </div>
        </div>

        {/* Status label */}
        <div className="text-xs text-slate-500">
          {isComplete ? (
            <span className="text-orange-400 font-semibold">Course completed!</span>
          ) : clamped > 0 ? (
            <span>{clamped}% of topics passed — keep going!</span>
          ) : (
            <span>Start a quiz to track your progress.</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressBar;
