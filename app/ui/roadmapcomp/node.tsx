
import type { Node, NodeProps } from "@xyflow/react";
import { Handle, Position } from "@xyflow/react";
import { SquareParking, LockIcon } from "lucide-react";
import {
    NODE_THEMES,
    clampDegree,
    getGlowClass,
    getHoverClass,
    getIconColorClass,
} from "@/app/ui/roadmapcomp/actions";
import type { RoadmapNodeData } from "@/app/ui/roadmapcomp/types";

export type RoadmapNode = Node<RoadmapNodeData, "roadmap">;

export default function RoadmapNode({ data }: NodeProps<RoadmapNode>) {
    const currentTheme = NODE_THEMES[data.status] || NODE_THEMES.locked;
    const isLocked = data.status === "locked";
    const degree = clampDegree(data.degree);
    const glowClass = getGlowClass(data.status, degree);
    const hoverClass = getHoverClass(data.status, degree);
    const iconColorClass = getIconColorClass(data.status, degree) ?? currentTheme.iconColor;
    const subtitleClass =
        data.status === "completed" ? iconColorClass : currentTheme.textSub;

    return (
        <div className={`px-6 py-7 rounded-2xl transition-all duration-300 ease-in-out backdrop-blur-md ${currentTheme.container} ${glowClass} ${hoverClass}`}>
            <Handle type="target" position={Position.Bottom} className={`w-3 h-3 ${currentTheme.handle}`} />
            <div className={`flex flex-row items-center gap-3`}>
                <div className={`w-10 h-10 grid place-items-center rounded-xl ${currentTheme.iconBox}`}>
                    {isLocked ? (
                        <LockIcon className={`h-6 w-6 ${iconColorClass}`} />
                    ) : (
                        <SquareParking className={`h-6 w-6 ${iconColorClass}`} />
                    )}
                </div>
                <div className="leading-tight">
                    <h2 className={`text-sm font-semibold ${currentTheme.textTitle}`}>{data?.title ?? "Title"}</h2>
                        {data?.subtitle ? (
                            <p className={`text-xs ${subtitleClass}`}>{data.subtitle}</p>
                        ) : null}
                </div>
            </div>
            <Handle type="source" position={Position.Top} className={`w-3 h-3 ${currentTheme.handle}`} />
        </div>
  );
}
