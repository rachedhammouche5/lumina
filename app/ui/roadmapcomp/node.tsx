import { Handle, Position, type NodeProps } from "@xyflow/react";
import { LockIcon, CheckCircle2, CircleDashed, LucideAirVent } from "lucide-react";
import { useRouter } from "next/navigation";
import { getNodeStyles, type RoadmapNodeData } from "@/app/ui/roadmapcomp/types";
import { getGlowClass, getHoverClass } from "./actions";
import Button from "../Button";

export default function RoadmapNode({ data }: NodeProps) {
  const { title, subtitle, status, degree = 0, icon: Icon = LucideAirVent, learnHref, quizHref, isRoot } = data as RoadmapNodeData;
  const styles = getNodeStyles(status, degree);
  const hoverClass = getHoverClass(status, degree) ?? "";
  const glowClass = getGlowClass(status, degree) ?? "";

  const showKnowledgePanel = !isRoot;

  const router = useRouter();
  const isLocked = status === "locked";
  const isPointer = !isLocked;
  const isClickable = Boolean(learnHref) && status !== "locked";

  const shadowClass =
    status === "completed"
      ? "shadow-[0_14px_36px_rgba(0,242,254,0.28)]"
      : status === "unlocked"
        ? "shadow-[0_12px_32px_rgba(59,130,246,0.24)]"
        : "shadow-[0_10px_24px_rgba(0,0,0,0.35)]";

  const hoverMotionClass =
    status === "completed"
      ? "hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_0_46px_rgba(0,242,254,0.6)] hover:saturate-125"
      : status === "unlocked"
        ? "hover:-translate-y-2 transition-transform duration-300 hover:shadow-[0_0_42px_rgba(59,130,246,0.55)] hover:saturate-125"
        : "hover:-translate-y-1 transition-transform duration-300 hover:shadow-[0_0_26px_rgba(0,0,0,0.45)]";

  const baseClassName = `group relative flex flex-col h-36 w-44 md:h-44 md:w-52 bg-[#0F111A]/90 backdrop-blur-xl rounded-3xl p-4 items-center border-2 transition-all duration-500 transform-gpu will-change-transform pointer-events-auto ${styles.container} ${shadowClass} ${hoverClass} ${glowClass}`;
  const interactiveClassName = isPointer
    ? `cursor-pointer ${hoverMotionClass}`
    : `cursor-not-allowed ${hoverMotionClass}`;

  const handleActivate = () => {
    if (!isClickable || !learnHref) return;
    router.push(learnHref);
  };

  const content = (
    <>
      <Handle type="target" position={Position.Top} className="!bg-slate-600 !border-none !w-2 !h-2" />

      <div className={`h-14 w-14 rounded-2xl justify-center items-center flex border mb-2 transition-all duration-500 ${styles.iconBox}`}>
        {isLocked ? <LockIcon size={24} /> : <Icon size={28} />}
      </div>

      <div className="w-full text-center leading-tight">
        <h3 className="font-black uppercase italic text-sm tracking-tighter text-white truncate">
          {title}
        </h3>
        <div className={`h-[1px] w-full bg-gradient-to-r from-transparent to-transparent my-2 ${styles.divider}`} />
      </div>

      <div className="w-full px-1">
        <p className="text-[10px] text-white/40 leading-tight line-clamp-2 text-center">
          {subtitle || "Explore this module to master your skills."}
        </p>
      </div>

      <div className={`mt-auto flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest ${styles.statusText}`}>
        {status === "completed" && <CheckCircle2 size={10} />}
        {status === "unlocked" && <CircleDashed size={10} className="animate-spin" />}
        <span>{status} {status === "completed" && `(${degree}%)`}</span>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-slate-600 !border-none !w-2 !h-2" />
    </>
  );

  return (
    <div
      role={isClickable ? "link" : undefined}
      tabIndex={isClickable ? 0 : -1}
      aria-label={isClickable ? `Open ${title}` : undefined}
      onClick={handleActivate}
      onKeyDown={(event) => {
        if (!isClickable) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleActivate();
        }
      }}
      className={`${baseClassName} ${interactiveClassName} ${isClickable ? "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70" : ""}`}
    >
      {content}
      {showKnowledgePanel && (
        <div className="pointer-events-none absolute inset-x-0 top-[calc(100%+10px)] flex justify-center z-[1000]">
          <div
            className="
              relative pointer-events-auto w-[220px]
              rounded-[18px] px-[14px] py-3
              bg-[#0a0c14] backdrop-blur-xl
              border border-blue-500/20
              shadow-[0_20px_48px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.04)]
              opacity-0 translate-y-2 scale-95
              transition-all duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)]
              group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
              before:content-[''] before:absolute before:top-[-1px] before:left-1/2 before:-translate-x-1/2
              before:w-[60px] before:h-[2px] before:rounded-full
              before:bg-gradient-to-r before:from-transparent before:via-blue-400/70 before:to-transparent
            "
          >
            <div className="flex items-center gap-1.5 mb-2">
              <span className="
                text-[9px] font-extrabold uppercase tracking-[0.14em] text-blue-300
                bg-blue-500/15 border border-blue-500/20 rounded-md px-[7px] py-[2px]
              ">
                Next up
              </span>
              <span className="text-[9.5px] text-slate-400/60 tracking-wide">Keep momentum →</span>
            </div>

            <p className="text-[11px] text-slate-200/80 leading-relaxed mb-3">
              {isLocked
                ? "Prove your knowledge to unlock this topic."
                : "Already know this topic?"}
            </p>

            <div className="flex flex-col gap-[7px]">
              <div className="flex gap-1.5">
                {!isLocked && learnHref && (
                  <Button
                    variant="outline"
                    href={learnHref}
                    onClick={(e) => e.stopPropagation()}
                    className="
                      flex-1 inline-flex items-center justify-center gap-1.5
                      rounded-[10px] px-3 py-2
                      text-[10px] font-bold uppercase tracking-[0.1em]
                      transition-all duration-150
                    "
                  >
                    Open Module
                    <span>→</span>
                  </Button>
                )}
                {quizHref && (
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(quizHref);
                    }}
                    className="
                      flex-1 inline-flex items-center justify-center gap-1.5
                      rounded-[10px] px-3 py-2
                      text-[10px] font-bold uppercase tracking-[0.1em]
                      transition-all duration-150
                    "
                  >
                    {isLocked ? "Take Quiz" : "Quiz Me"}
                    <span>→</span>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
