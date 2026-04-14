import { type Edge, type Node } from "@xyflow/react";
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
    if (status === "locked") return "";
    if (status === "unlocked") {
        return "hover:shadow-[0_0_36px_rgba(59,130,246,0.45)] hover:border-[#3b82f6]";
    }
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

const getNodeZIndex = (status: RoadmapStatus) => {
    if (status === "locked") return 100;
    if (status === "completed") return 30;
    return 20;
};





export const generateRoadmapElements = (
  topics: TopicRow[] = [],
  scores: ScoreRow[] = [],
  root?: { id: string; title: string; subtitle?: string },
  isEnrolled = true,
): { nodes: Node<RoadmapNodeData>[]; edges: Edge[]; width: number; height: number } => {
    const childrenMap = new Map<string, TopicRow[]>();
    topics.forEach((t) => {
        const parentKey = t.parent_id ?? "__ROOT__";
        const list = childrenMap.get(parentKey) ?? [];
        list.push(t);
        childrenMap.set(parentKey, list);
    });

    const completedIds = new Set(scores.map((s) => s.tpc_id));
    const allTopicsCompleted = topics.length > 0 && topics.every((t) => completedIds.has(t.tpc_id));

    const spacingX = 260;
    const spacingY = 260;
    const positions = new Map<string, { x: number; y: number }>();
    let leafCounter = 0;

    const layout = (topicId: string | "__ROOT__", depth: number): number => {
        const children = childrenMap.get(topicId) ?? [];
        const sortedChildren = [...children].sort((a, b) => a.tpc_title.localeCompare(b.tpc_title));

        if (sortedChildren.length === 0 && topicId !== "__ROOT__") {
            const x = leafCounter * spacingX;
            leafCounter += 1;
            positions.set(topicId, { x, y: depth * spacingY });
            return x;
        }

        const childXs: number[] = [];
        sortedChildren.forEach((child) => {
            childXs.push(layout(child.tpc_id, depth + 1));
        });

        const x = childXs.length > 0 ? childXs.reduce((a, b) => a + b, 0) / childXs.length : leafCounter * spacingX;
        if (topicId !== "__ROOT__") {
            positions.set(topicId, { x, y: depth * spacingY });
        }
        return x;
    };

    if (root) {
        positions.set(root.id, { x: 0, y: 0 });
    }

    layout("__ROOT__", root ? 1 : 0);

    const nodes: Node<RoadmapNodeData>[] = [];

    if (root) {
    nodes.push({
      id: root.id,
      type: 'roadmap',
      position: positions.get(root.id) ?? { x: 0, y: 0 },
      zIndex: getNodeZIndex(!isEnrolled ? "locked" : allTopicsCompleted ? "completed" : "locked"),
      data: {
        title: root.title,
        subtitle: root.subtitle,
        // Root stays locked until every topic is completed, then becomes completed.
        status: !isEnrolled ? "locked" : allTopicsCompleted ? "completed" : "locked",
        degree: allTopicsCompleted ? 100 : 0,
        id: root.id,
      }
    });
  }

    topics.forEach((topic) => {
        const userScore = scores.find((s) => s.tpc_id === topic.tpc_id);
        const children = childrenMap.get(topic.tpc_id) ?? [];
        const areChildrenCompleted = children.length > 0 && children.every((c) => completedIds.has(c.tpc_id));

        let currentStatus: RoadmapStatus = "locked";
        if (!isEnrolled) {
            currentStatus = "locked";
        } else if (userScore) {
            currentStatus = "completed";
        } else if (children.length === 0) {
            currentStatus = "unlocked";
        } else if (areChildrenCompleted) {
            currentStatus = "unlocked";
        }

        nodes.push({
            id: topic.tpc_id,
            type: 'roadmap',
            position: positions.get(topic.tpc_id) ?? { x: 0, y: spacingY },
            zIndex: getNodeZIndex(currentStatus),
            data: {
                title: topic.tpc_title,
                subtitle: topic.tpc_description ?? undefined,
                status: currentStatus,
                degree: userScore?.score || 0,
                id: topic.tpc_id,
                parentId: topic.parent_id ?? undefined,
                learnHref: `/skills/${topic.skill_id}/${topic.tpc_id}`,
                quizHref: `/skills/${topic.skill_id}/${topic.tpc_id}/quiz`,
            }
        });
    });

    const edges: Edge[] = [];

    if (root) {
        (childrenMap.get("__ROOT__") ?? []).forEach((t) =>
            edges.push({
                id: `e-${root.id}-${t.tpc_id}`,
                source: root.id,
                target: t.tpc_id,
                animated: scores.some((s) => s.tpc_id === t.tpc_id),
            }),
        );
    }

    topics
        .filter((t) => t.parent_id !== null)
        .forEach((t) =>
            edges.push({
                id: `e-${t.parent_id}-${t.tpc_id}`,
                source: t.parent_id as string,
                target: t.tpc_id,
                animated: scores.some((s) => s.tpc_id === t.parent_id),
            }),
        );

    if (nodes.length === 0) {
        return { nodes, edges, width: 1400, height: 800 };
    }

    const minX = Math.min(...nodes.map((n) => n.position.x));
    const maxX = Math.max(...nodes.map((n) => n.position.x));
    const centerX = (minX + maxX) / 2;
    nodes.forEach((n) => {
        n.position = { ...n.position, x: n.position.x - centerX };
    });

    const minXShift = Math.min(...nodes.map((n) => n.position.x));
    const maxXShift = Math.max(...nodes.map((n) => n.position.x));
    const paddingX = 200;
    nodes.forEach((n) => {
        n.position = { ...n.position, x: n.position.x + paddingX - minXShift };
    });

    const width = Math.max(1200, maxXShift - minXShift + paddingX * 2);

    const minY = Math.min(...nodes.map((n) => n.position.y));
    const paddingY = 120;
    nodes.forEach((n) => {
        n.position = { ...n.position, y: n.position.y - minY + paddingY };
    });

    const height = Math.max(...nodes.map((n) => n.position.y)) + 280;

    return { nodes, edges, width, height };
};
