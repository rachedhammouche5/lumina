import { type Edge, type Node } from "@xyflow/react";
import type { RoadmapNodeData, RoadmapStatus, TopicRow, ScoreRow } from "./types";
import { getPerformanceTier } from "./types";

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
        // Removed the hardcoded cyan classes. 
        // This allows the dynamic colors from types.ts (Green, Orange, Red, Purple) to work properly.
        container: "bg-[#08080c] cursor-pointer transition-all duration-300",
        iconBox: "border-transparent",
        iconColor: "text-inherit",
        textTitle: "text-white",
        textSub: "opacity-70",
        handle: "shadow-none"
    }
};

export const clampDegree = (degree?: number) =>
    Math.max(0, Math.min(100, degree ?? 0));

export const getGlowClass = (status: RoadmapStatus, degree?: number) => {
    if (status !== "completed") return "";
    const tier = getPerformanceTier(clampDegree(degree));
    if (tier === "red") return "glow-red";
    if (tier === "orange") return "glow-orange";
    if (tier === "green") return "glow-green";
    return "glow-purple";
};

export const getHoverClass = (status: RoadmapStatus, degree?: number) => {
    if (status === "locked") return "";
    if (status === "unlocked") {
        return "hover:shadow-[0_0_36px_rgba(59,130,246,0.45)] hover:border-[#3b82f6]";
    }
    const tier = getPerformanceTier(clampDegree(degree));
    if (tier === "red") return "hover:shadow-[0_0_42px_rgba(239,68,68,0.9)] hover:border-[#ef4444]";
    if (tier === "orange") return "hover:shadow-[0_0_42px_rgba(249,115,22,0.8)] hover:border-[#f97316]";
    if (tier === "green") return "hover:shadow-[0_0_42px_rgba(16,185,129,0.8)] hover:border-[#10b981]";
    return "hover:shadow-[0_0_46px_rgba(168,85,247,0.9)] hover:border-[#a855f7]";
};

export const getIconColorClass = (status: RoadmapStatus, degree?: number) => {
    if (status !== "completed") return null;
    const tier = getPerformanceTier(clampDegree(degree));
    if (tier === "red") return "text-[#ef4444]";
    if (tier === "orange") return "text-[#f97316]";
    if (tier === "green") return "text-[#10b981]";
    return "text-[#a855f7]";
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

    const scoreamap = new Map(scores.map((s) => [s.tpc_id, s.score]));

    // Compute effective degrees
    const effectiveDegrees = new Map<string, number>();

    // Root effective degree
    const rootEffective = topics.length > 0 && topics.every((t) => (scoreamap.get(t.tpc_id) || 0) >= 50) ? 100 : 0;
    if (root) effectiveDegrees.set(root.id, rootEffective);

    // Recursive function to compute effective degrees
    function computeEffective(topicId: string, parentEffective: number) {
        const ownDegree = scoreamap.get(topicId) || 0;
        let effective = ownDegree;
        if (effective < 50 && parentEffective >= 50) {
            effective = parentEffective;
        }
        effectiveDegrees.set(topicId, effective);
        const children = childrenMap.get(topicId) || [];
        children.forEach(child => computeEffective(child.tpc_id, effective));
    }

    // Compute for root-level topics
    topics.filter(t => !t.parent_id).forEach(t => computeEffective(t.tpc_id, rootEffective));

    // Update passing based on effective degrees
    const effectivePassingIds = new Set([...effectiveDegrees.entries()].filter(([_, d]) => d >= 50).map(([id]) => id));

    // Update all topics completed
    const allTopicsEffectiveCompleted = rootEffective === 100;

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
      zIndex: getNodeZIndex(!isEnrolled ? "locked" : allTopicsEffectiveCompleted ? "completed" : "locked"),
      data: {
        title: root.title,
        subtitle: root.subtitle,
        status: !isEnrolled ? "locked" : allTopicsEffectiveCompleted ? "completed" : "locked",
        degree: rootEffective,
        id: root.id,
      }
    });
  }

    topics.forEach((topic) => {
        const userScore = scores.find((s) => s.tpc_id === topic.tpc_id);
        const effectiveDegree = effectiveDegrees.get(topic.tpc_id) || 0;
        const hasEffectiveScore = effectiveDegree > 0;
        const children = childrenMap.get(topic.tpc_id) ?? [];
        const areChildrenPassed = children.length > 0 && children.every((c) => (effectiveDegrees.get(c.tpc_id) || 0) >= 50);

        let currentStatus: RoadmapStatus = "locked";
        if (!isEnrolled) {
            currentStatus = "locked";
        } else if (hasEffectiveScore) {
            currentStatus = "completed";
        } else if (children.length === 0) {
            currentStatus = "unlocked";
        } else if (areChildrenPassed) {
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
                degree: effectiveDegree,
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
                animated: effectivePassingIds.has(t.tpc_id),
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
                animated: effectivePassingIds.has(t.tpc_id),
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