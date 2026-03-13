"use client";

import { useMemo } from "react";
import { ReactFlow, Background, Controls } from "@xyflow/react";
import type { Edge, NodeTypes } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import RoadmapNode, { type RoadmapNode as RoadmapNodeType } from "@/app/ui/roadmapcomp/node";
import type {
  RoadmapConnection,
  RoadmapStep,
  RoadmapNodeData,
} from "@/app/ui/roadmapcomp/types";

export const DEFAULT_ROADMAP_STEPS: RoadmapStep[] = [
  {
    id: "goal",
    title: "GIT MASTER",
    subtitle: "The Ultimate Goal: System Architect",
    status: "locked",
    position: { x: 260, y: 0 },
  },
  {
    id: "advanced",
    title: "GIT SURGERY",
    subtitle: "Rebase & History Rewriting",
    status: "locked",
    position: { x: 260, y: 200 },
  },
  {
    id: "collaboration",
    title: "REMOTE FLOW",
    subtitle: "Teamwork & PRs",
    status: "locked",
    position: { x: 40, y: 400 },
  },
  {
    id: "branching",
    title: "BRANCHING",
    subtitle: "Parallel Development",
    status: "completed",
    degree: 55,
    position: { x: 480, y: 400 },
  },
  {
    id: "basics",
    title: "GIT BASICS",
    subtitle: "Where your journey begins",
    status: "completed",
    degree: 40,
    position: { x: 260, y: 600 },
  },
];

export const DEFAULT_ROADMAP_CONNECTIONS: RoadmapConnection[] = [
  { id: "e-basics-collab", source: "basics", target: "collaboration" },
  { id: "e-basics-branch", source: "basics", target: "branching" },
  { id: "e-collab-adv", source: "collaboration", target: "advanced" },
  { id: "e-branch-adv", source: "branching", target: "advanced" },
  { id: "e-adv-goal", source: "advanced", target: "goal" },
];

type RoadmapFlowProps = {
  steps?: RoadmapStep[];
  connections?: RoadmapConnection[];
  nodes?: RoadmapNodeType[];
  edges?: Edge[];
  className?: string;
  layout?: "custom" | "vertical" | "zigzag";
  start?: { x: number; y: number };
  gap?: { x: number; y: number };
};

const toEdges = (connections: RoadmapConnection[]): Edge[] =>
  connections.map((connection) => ({
    id: connection.id ?? `e-${connection.source}-${connection.target}`,
    source: connection.source,
    target: connection.target,
    animated: connection.animated ?? false,
  }));

const resolvePositions = (
  steps: RoadmapStep[],
  layout: NonNullable<RoadmapFlowProps["layout"]>,
  start: { x: number; y: number },
  gap: { x: number; y: number }
): RoadmapStep[] => {
  const hasAllPositions = steps.every((step) => step.position);
  if (layout === "custom" && hasAllPositions) {
    return steps;
  }

  if (layout === "zigzag") {
    return steps.map((step, index) => {
      if (step.position) return step;
      if (index === 0) {
        return { ...step, position: { x: start.x, y: start.y } };
      }
      const side = index % 2 === 1 ? -1 : 1;
      const x = start.x + side * gap.x;
      const y = start.y + index * gap.y;
      return { ...step, position: { x, y } };
    });
  }

  return steps.map((step, index) => ({
    ...step,
    position: step.position ?? { x: start.x, y: start.y + index * gap.y },
  }));
};

const toNodes = (
  steps: RoadmapStep[],
  layout: NonNullable<RoadmapFlowProps["layout"]>,
  start: { x: number; y: number },
  gap: { x: number; y: number }
): RoadmapNodeType[] =>
  resolvePositions(steps, layout, start, gap).map((step) => ({
    id: step.id,
    type: "roadmap",
    position: step.position ?? { x: start.x, y: start.y },
    data: {
      title: step.title,
      subtitle: step.subtitle,
      status: step.status,
      degree: step.degree,
    } satisfies RoadmapNodeData,
  }));

export default function RoadmapFlow({
  steps: stepsProp,
  connections: connectionsProp,
  nodes: nodesProp,
  edges: edgesProp,
  className,
  layout = "custom",
  start = { x: 260, y: 0 },
  gap = { x: 220, y: 200 },
}: RoadmapFlowProps) {
  const nodeTypes = useMemo<NodeTypes>(() => ({ roadmap: RoadmapNode }), []);

  const nodes = useMemo(() => {
    if (nodesProp) return nodesProp;
    const steps = stepsProp ?? DEFAULT_ROADMAP_STEPS;
    return toNodes(steps, layout, start, gap);
  }, [nodesProp, stepsProp, layout, start, gap]);

  const edges = useMemo(() => {
    if (edgesProp) return edgesProp;
    const connections = connectionsProp ?? DEFAULT_ROADMAP_CONNECTIONS;
    return toEdges(connections);
  }, [edgesProp, connectionsProp]);

  return (
    <div
      className={`h-[75vh] w-full rounded-[40px] border border-white/10 shadow-2xl overflow-hidden ${className ?? ""}`}
      style={{
        backgroundColor: "#050508",
        backgroundImage:
          "radial-gradient(rgba(180,180,190,0.08) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      <ReactFlow<RoadmapNodeType, Edge>
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background gap={20} size={1} color="rgba(255,255,255,0.04)" />
        <Controls className="!bg-[#0a0a10]/80 !border-white/10 !backdrop-blur-md !rounded-2xl overflow-hidden" />
      </ReactFlow>

      <style jsx global>{`
        .react-flow__edge-path {
          stroke: rgba(255, 255, 255, 0.08);
          stroke-width: 2.5;
        }
        .react-flow__controls-button {
          background: rgba(8, 8, 12, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(255, 255, 255, 0.85);
        }
        .react-flow__controls-button:hover {
          background: rgba(12, 12, 18, 0.95);
        }
        .react-flow__controls-button svg {
          fill: currentColor;
          color: currentColor;
        }
      `}</style>
    </div>
  );
}
