import { Handle, Position, type NodeProps } from "@xyflow/react";
import { LockIcon, CheckCircle2, CircleDashed, LucideAirVent } from "lucide-react";
import { useRouter } from "next/navigation";
import { getNodeStyles, type RoadmapNodeData } from "@/app/ui/roadmapcomp/types";
import { getGlowClass, getHoverClass } from "../actions";
import Button from "../../Button";

export default function TRoadmapNode({ data }: NodeProps) {
  const {
    title,
    subtitle,
    status,
    degree = 0,
    icon: Icon = LucideAirVent,
    learnHref,
    onAddChild,
    onManageTopic,
    onModifyQuiz,
    onRemove,
  } = data as RoadmapNodeData;
  const styles = getNodeStyles(status, degree);
  const hoverClass = getHoverClass(status, degree) ?? "";
  const glowClass = getGlowClass(status, degree) ?? "";

  const showControlPanel = !!(onAddChild || onManageTopic || onModifyQuiz || onRemove);
  const router = useRouter();
  const isLocked = status === "locked";

  return (
    <div className={`group relative flex flex-col overflow-visible h-32 w-40 rounded-3xl border-2 bg-[#0F111A]/90 p-3 items-center backdrop-blur-xl transition-all duration-500 transform-gpu will-change-transform pointer-events-auto sm:h-36 sm:w-44 md:h-44 md:w-52 md:p-4 ${styles.container} ${hoverClass} ${glowClass}`}>
      <Handle type="target" position={Position.Top} className="!bg-slate-600 !border-none !w-2 !h-2" />

      <div className={`mb-1.5 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-500 sm:mb-2 sm:h-14 sm:w-14 ${styles.iconBox}`}>
        {isLocked ? <LockIcon size={20} className="sm:hidden" /> : <Icon size={22} className="sm:hidden" />}
        {isLocked ? <LockIcon size={24} className="hidden sm:block" /> : <Icon size={28} className="hidden sm:block" />}
      </div>

      <div className="w-full text-center leading-tight">
        <h3 className="truncate text-[11px] font-black uppercase italic tracking-tighter text-white sm:text-sm">
          {title}
        </h3>
        <div className={`my-1.5 h-[1px] w-full bg-gradient-to-r from-transparent to-transparent sm:my-2 ${styles.divider}`} />
      </div>

      <div className="w-full px-1">
        <p className="line-clamp-2 text-center text-[9px] leading-tight text-white/40 sm:text-[10px]">
          {subtitle || "Explore this module to master your skills."}
        </p>
      </div>

      <div className={`mt-auto flex items-center gap-1 text-[8px] font-bold uppercase tracking-widest sm:text-[9px] ${styles.statusText}`}>
        {status === "completed" && <CheckCircle2 size={9} className="sm:hidden" />}
        {status === "unlocked" && <CircleDashed size={9} className="animate-spin sm:hidden" />}
        {status === "completed" && <CheckCircle2 size={10} className="hidden sm:block" />}
        {status === "unlocked" && <CircleDashed size={10} className="hidden sm:block animate-spin" />}
        <span>{status} {status === "completed" && `(${degree}%)`}</span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-slate-600 !border-none !w-2 !h-2" />

      {showControlPanel && (
        <div className="absolute inset-x-2 bottom-0 z-50 pointer-events-none sm:inset-x-3">
          <div className="pointer-events-auto w-full max-w-[210px] rounded-[16px] border border-orange-500/20 bg-[#0a0c14] px-3 py-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.04)] opacity-0 translate-y-3 scale-95 transition-all duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 before:content-[''] before:absolute before:left-1/2 before:top-[-6px] before:-translate-x-1/2 before:h-[2px] before:w-[48px] before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-orange-400/70 before:to-transparent sm:max-w-[240px] sm:px-4 sm:py-3">
            <div className="mb-1.5 flex items-center gap-1 sm:mb-2 sm:gap-1.5">
              <span className="rounded-md border border-orange-500/20 bg-orange-500/15 px-[6px] py-[1px] text-[8px] font-extrabold uppercase tracking-[0.12em] text-orange-200 sm:px-[7px] sm:py-[2px] sm:text-[9px]">
                Control Panel
              </span>
              <span className="hidden text-[9px] tracking-wide text-slate-400/60 sm:inline">Keep momentum →</span>
            </div>

            <div className="flex flex-col gap-1.5 sm:gap-2">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddChild?.();
                }}
                className="inline-flex h-9 w-full items-center justify-center gap-1 rounded-[11px] border border-slate-600 bg-slate-900/80 px-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-slate-100 transition-all duration-150 hover:border-orange-400/60 hover:bg-orange-500/10 sm:h-10 sm:gap-1.5 sm:px-3 sm:text-[10px] sm:tracking-[0.12em]"
              >
                Add a child
                <span>→</span>
              </Button>

              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onManageTopic) {
                    onManageTopic();
                  } else if (learnHref) {
                    router.push(learnHref);
                  }
                }}
                className="inline-flex h-9 w-full items-center justify-center gap-1 rounded-[11px] border border-orange-400/40 bg-orange-500/10 px-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-orange-100 transition-all duration-150 hover:bg-orange-500/20 sm:h-10 sm:gap-1.5 sm:px-3 sm:text-[10px] sm:tracking-[0.12em]"
              >
                Manage topic
                <span>→</span>
              </Button>
              
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onModifyQuiz) {
                    onModifyQuiz();
                  } else if (learnHref) {
                    router.push(learnHref);
                  }
                }}
                className="inline-flex h-9 w-full items-center justify-center gap-1 rounded-[11px] border border-orange-400/40 bg-orange-500/10 px-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-orange-100 transition-all duration-150 hover:bg-orange-500/20 sm:h-10 sm:gap-1.5 sm:px-3 sm:text-[10px] sm:tracking-[0.12em]"
              >
                Modify quiz
                <span>→</span>
              </Button>

              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.();
                }}
                className="inline-flex h-9 w-full items-center justify-center gap-1 rounded-[11px] border border-red-500/40 bg-red-500/10 px-2.5 text-[9px] font-bold uppercase tracking-[0.1em] text-red-100 transition-all duration-150 hover:bg-red-500/20 sm:h-10 sm:gap-1.5 sm:px-3 sm:text-[10px] sm:tracking-[0.12em]"
              >
                Remove Node
                <span>→</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
