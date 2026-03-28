import { Handle, Position, type NodeProps } from "@xyflow/react";
import { LockIcon, CheckCircle2, CircleDashed, LucideAirVent } from "lucide-react";
import { useRouter } from "next/navigation";
import { getNodeStyles, type RoadmapNodeData } from "@/app/ui/roadmapcomp/types";
import { getGlowClass, getHoverClass } from "./actions";

export default function RoadmapNode({ data }: NodeProps) {
  const { title, subtitle, status, degree = 0, icon: Icon = LucideAirVent, href } = data as RoadmapNodeData;
  const styles = getNodeStyles(status, degree);
  const hoverClass = getHoverClass(status, degree) ?? "";
  const glowClass = getGlowClass(status, degree) ?? "";

  const router = useRouter();
  const isLocked = status === "locked";
  const isPointer = !isLocked;
  const isClickable = Boolean(href) && !isLocked;

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
    if (!isClickable || !href) return;
    router.push(href);
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

      {isClickable && (
        <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-white/70 group-hover:text-orange-300 transition-colors">
          Open Module
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </div>
      )}

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
    </div>
  );
}
