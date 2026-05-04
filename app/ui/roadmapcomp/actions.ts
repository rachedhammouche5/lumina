import { type Edge, type Node } from "@xyflow/react";
import type { RoadmapNodeData, RoadmapStatus, TopicRow, ScoreRow } from "./types";
import { getPerformanceTier } from "./types";
import {
  buildTopicGraph,
  getRootStatus,
  getTopicAggregateDegree,
  getTopicStatus,
  isTopicPassed,
} from "./progression";

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

const getNodeZIndex = () => 5;

export const generateRoadmapElements = (
  topics: TopicRow[] = [],
  scores: ScoreRow[] = [],
  root?: { id: string; title: string; subtitle?: string },
  isEnrolled = true,
  onAddChild?: (parentId: string | null) => void,
  onManageTopic?: (topicId: string) => void,
  onModifyQuizTopic?: (topicId: string) => void,
  onRemoveTopic?: (topicId: string) => void,
  forceUnlocked = false,
): { nodes: Node<RoadmapNodeData>[]; edges: Edge[]; width: number; height: number } => {
    const graph = buildTopicGraph(topics, scores);
    const degreeMemo = new Map<string, number>();
    const passMemo = new Map<string, boolean>();

    const computeDegree = (topicId: string) => getTopicAggregateDegree(topicId, graph, degreeMemo);
    const topicStatus = (topicId: string) => getTopicStatus(topicId, graph);
    const allTopicsEffectiveCompleted =
      graph.topLevelTopicIds.length > 0 &&
      graph.topLevelTopicIds.every((topicId) => isTopicPassed(topicId, graph, passMemo));

    const spacingX = 260;
    const spacingY = 260;
    const positions = new Map<string, { x: number; y: number }>();
    let leafCounter = 0;

    const layout = (topicId: string | "__ROOT__", depth: number): number => {
        const children = graph.childrenMap.get(topicId) ?? [];
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
        const rootDegree =
          graph.topLevelTopicIds.length > 0
            ? Math.round(
                graph.topLevelTopicIds.reduce(
                  (sum, topicId) => sum + computeDegree(topicId),
                  0,
                ) / graph.topLevelTopicIds.length,
              )
            : 0;
        const rootStatus: RoadmapStatus = forceUnlocked
            ? "unlocked"
            : getRootStatus(graph);

        nodes.push({
            id: root.id,
            type: "roadmap",
            position: positions.get(root.id) ?? { x: 0, y: 0 },
            zIndex: getNodeZIndex(),
            data: {
                title: root.title,
                subtitle: root.subtitle,
                status: rootStatus,
                degree: allTopicsEffectiveCompleted ? 100 : rootDegree,
                id: root.id,
                isRoot: true,
                onAddChild: () => onAddChild?.(null),
                onManageTopic: () => onManageTopic?.(root.id),
                onRemove: () => onRemoveTopic?.(root.id),
            },
        });
    }

    topics.forEach((topic) => {
        const effectiveDegree = computeDegree(topic.tpc_id);
        const currentStatus: RoadmapStatus = forceUnlocked ? "unlocked" : topicStatus(topic.tpc_id);

        nodes.push({
            id: topic.tpc_id,
            type: "roadmap",
            position: positions.get(topic.tpc_id) ?? { x: 0, y: spacingY },
            zIndex: getNodeZIndex(),
            data: {
                title: topic.tpc_title,
                subtitle: topic.tpc_description ?? undefined,
                status: currentStatus,
                degree: effectiveDegree,
                id: topic.tpc_id,
                parentId: topic.parent_id ?? undefined,
                isRoot: topic.parent_id === null,
                learnHref: `/skills/${topic.skill_id}/${topic.tpc_id}`,
                quizHref: `/skills/${topic.skill_id}/${topic.tpc_id}/quiz`,
                onAddChild: () => onAddChild?.(topic.tpc_id),
                onManageTopic: () => onManageTopic?.(topic.tpc_id),
                onModifyQuiz: () => onModifyQuizTopic?.(topic.tpc_id),
                onRemove: () => onRemoveTopic?.(topic.tpc_id),
            },
        });
    });

    const edges: Edge[] = [];

    if (root) {
        (graph.childrenMap.get("__ROOT__") ?? []).forEach((t) =>
            edges.push({
                id: `e-${root.id}-${t.tpc_id}`,
                source: root.id,
                target: t.tpc_id,
                animated: isTopicPassed(t.tpc_id, graph, passMemo),
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
                animated: isTopicPassed(t.tpc_id, graph, passMemo),
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
