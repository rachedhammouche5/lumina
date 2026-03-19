import { Position, type Edge, type Node } from "@xyflow/react";
import type { RoadmapNodeData, RoadmapStatus, TopicRow, ScoreRow } from "./types";

export const NODE_THEMES = {
    locked: {
        container: "border-white/5 bg-[#0a0a0f] opacity-40 grayscale cursor-not-allowed shadow-none",
        iconBox: "border-white/50 bg-white/5",
        iconColor: "text-white/80",
        textTitle: "text-white/80",
        textSub: "text-white/50",
        handle: "opacity-0"
    },
    
    unlocked: {
        container: "border-[#3b82f6] bg-[#08080c] shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_35px_rgba(59,130,246,0.55)] cursor-pointer transition-all duration-300",
        iconBox: "border-blue-500/20 bg-blue-500/10",
        iconColor: "text-[#3b82f6]",
        textTitle: "text-white",
        textSub: "text-blue-400/70",
        handle: "bg-[#3b82f6] shadow-[0_0_10px_#3b82f6]"
    },

    completed: {
        container: "border-[#00f2fe] bg-[#08080c] shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:shadow-[0_0_35px_rgba(0,242,254,0.5)] cursor-pointer",
        iconBox: "border-cyan-500/20 bg-cyan-500/10",
        iconColor: "text-[#00f2fe]",
        textTitle: "text-white",
        textSub: "text-cyan-500/60",
        handle: "bg-[#00f2fe] shadow-[0_0_10px_#00f2fe]"
    }
};

export const clampDegree = (degree?: number) =>
    Math.max(0, Math.min(100, degree ?? 0));

export const getGlowClass = (status: RoadmapStatus, degree?: number) => {
    if (status !== "completed") return "";
    const d = clampDegree(degree);
    if (d <= 50) return "glow-red";
    if (d <= 60) return "glow-orange";
    if (d <= 80) return "glow-green";
    return "glow-purple";
};

export const getHoverClass = (status: RoadmapStatus, degree?: number) => {
    if (status !== "completed") return "";
    const d = clampDegree(degree);
    if (d <= 50) return "hover:shadow-[0_0_42px_rgba(255,0,85,0.9)] hover:border-[#ff0055]";
    if (d <= 60) return "hover:shadow-[0_0_42px_rgba(255,119,0,0.8)] hover:border-[#ff7700]";
    if (d <= 80) return "hover:shadow-[0_0_42px_rgba(0,242,254,0.8)] hover:border-[#00f2fe]";
    return "hover:shadow-[0_0_46px_rgba(191,0,255,0.9)] hover:border-[#bf00ff]";
};

export const getIconColorClass = (status: RoadmapStatus, degree?: number) => {
    if (status !== "completed") return null;
    const d = clampDegree(degree);
    if (d <= 50) return "text-[#ff0055]";
    if (d <= 60) return "text-[#ff7700]";
    if (d <= 80) return "text-[#00f2fe]";
    return "text-[#bf00ff]";
};





export const generateRoadmapElements = (
  topics: TopicRow[] = [],
  scores: ScoreRow[] = [],
): { nodes: Node<RoadmapNodeData>[]; edges: Edge[] } => {
    const topicMap = new Map(topics.map((t) => [t.tpc_id, t]));


    const getLevel = (topic: any): number => {
        if (!topic.parent_id) return 0;
        const parent = topicMap.get(topic.parent_id);
        return parent ? 1 + getLevel(parent) : 0;
    };

    const nodes: Node<RoadmapNodeData>[] = topics.map((topic) => {
        const userScore = scores.find((s) => s.tpc_id === topic.tpc_id);
        const isParentCompleted = topic.parent_id
            ? scores.some((s) => s.tpc_id === topic.parent_id)
            : true;

        let currentStatus: RoadmapStatus = "locked";
        if (userScore) currentStatus = "completed";
        else if (isParentCompleted) currentStatus = "unlocked";


        const siblings = topics.filter((t) => t.parent_id === topic.parent_id);
        const siblingIndex = siblings.findIndex((t) => t.tpc_id === topic.tpc_id);
        const xPos = siblings.length > 1 ? (siblingIndex - (siblings.length - 1) / 2) * 250 : 0;
    
        const level = getLevel(topic);
    
        return {
            id: topic.tpc_id,
            type: 'roadmap',
            position: { x: xPos, y: level * 300 },
            data: {
                title: topic.tpc_title,
                subtitle: topic.tpc_description ?? undefined,
                status: currentStatus,
                degree: userScore?.score || 0,
                id: topic.tpc_id,
                parentId: topic.parent_id ?? undefined
            }
        };
    });

    const edges: Edge[] = topics.filter((t) => t.parent_id !== null).map((t) => ({
        id: `e-${t.parent_id}-${t.tpc_id}`,
        source: t.parent_id as string,
        target: t.tpc_id,
        animated: scores.some((s) => s.tpc_id === t.parent_id),
    }));

    return { nodes, edges };
};
