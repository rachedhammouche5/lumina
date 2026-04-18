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
    onPreview,
    onAddQuiz,
    onRemove,
  } = data as RoadmapNodeData;
  const styles = getNodeStyles(status, degree);
  const hoverClass = getHoverClass(status, degree) ?? "";
  const glowClass = getGlowClass(status, degree) ?? "";

  const isRoot = !data.parentId;
  const showControlPanel = !!(onAddChild || onPreview || onRemove);
  const router = useRouter();
  const isLocked = status === "locked";

  return (
    <div className={`group relative flex flex-col overflow-visible h-36 w-44 md:h-44 md:w-52 bg-[#0F111A]/90 backdrop-blur-xl rounded-3xl p-4 items-center border-2 transition-all duration-500 transform-gpu will-change-transform pointer-events-auto ${styles.container} ${hoverClass} ${glowClass}`}>
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

      {showControlPanel && (
        <div className="absolute inset-x-3 bottom-0 z-50 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-[240px] rounded-[18px] border border-blue-500/20 bg-[#0a0c14] px-4 py-3 shadow-[0_20px_48px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.04)] opacity-0 translate-y-3 scale-95 transition-all duration-[280ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 before:content-[''] before:absolute before:left-1/2 before:top-[-6px] before:-translate-x-1/2 before:w-[60px] before:h-[2px] before:rounded-full before:bg-gradient-to-r before:from-transparent before:via-blue-400/70 before:to-transparent">
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-blue-300 bg-blue-500/15 border border-blue-500/20 rounded-md px-[7px] py-[2px]">
                Control Panel
              </span>
              <span className="text-[9.5px] text-slate-400/60 tracking-wide">Keep momentum →</span>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddChild?.();
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-150"
              >
                Add a child
                <span>→</span>
              </Button>

              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onPreview) {
                    onPreview();
                  } else if (learnHref) {
                    router.push(learnHref);
                  }
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-150"
              >
                Preview
                <span>→</span>
              </Button>
              
              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAddQuiz) {
                    onAddQuiz();
                  } else if (onPreview) {
                    onPreview();
                  } else if (learnHref) {
                    router.push(learnHref);
                  }
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-150"
              >
                Add Quiz
                <span>→</span>
              </Button>

              <Button
                variant="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.();
                }}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] transition-all duration-150"
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
