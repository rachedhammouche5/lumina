"use client";

import "@xyflow/react/dist/style.css";
import { Background, Controls, MiniMap, ReactFlow, type Edge, type Node } from "@xyflow/react";
import {
  GitBranch,
  GitCommit,
  GitMerge,
  GitPullRequest,
  Rocket,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import RoadmapNode from "@/app/ui/roadmapcomp/node";
import type { RoadmapNodeData } from "@/app/ui/roadmapcomp/types";

const baseNodes = [
  {
    id: "start",
    type: "roadmap",
    position: { x: 0, y: 0 },
    data: {
      title: "Git Foundations",
      subtitle: "CLI basics, repos, and the mental model",
      status: "completed",
      degree: 85,
      icon: GitCommit,
    },
  },
  {
    id: "branching",
    type: "roadmap",
    position: { x: 280, y: -40 },
    data: {
      title: "Branching Strategy",
      subtitle: "Feature branches, rebase vs merge",
      status: "completed",
      degree: 65,
      icon: GitBranch,
    },
  },
  {
    id: "prs",
    type: "roadmap",
    position: { x: 560, y: 20 },
    data: {
      title: "Pull Requests",
      subtitle: "Review workflow and approvals",
      status: "unlocked",
      icon: GitPullRequest,
    },
  },
  {
    id: "conflicts",
    type: "roadmap",
    position: { x: 840, y: -30 },
    data: {
      title: "Merge Conflicts",
      subtitle: "Resolve conflicts with confidence",
      status: "locked",
      icon: GitMerge,
    },
  },
  {
    id: "hooks",
    type: "roadmap",
    position: { x: 1120, y: 40 },
    data: {
      title: "Git Hooks",
      subtitle: "Linting and pre-commit safety nets",
      status: "locked",
      icon: Wrench,
    },
  },
  {
    id: "security",
    type: "roadmap",
    position: { x: 1400, y: -10 },
    data: {
      title: "Secure Practices",
      subtitle: "Signed commits and protected branches",
      status: "locked",
      icon: ShieldCheck,
    },
  },
  {
    id: "release",
    type: "roadmap",
    position: { x: 1680, y: 30 },
    data: {
      title: "Release Workflow",
      subtitle: "Tags, changelogs, and versioning",
      status: "locked",
      icon: Rocket,
    },
  },
] satisfies Node<RoadmapNodeData>[];

const edges: Edge[] = [
  {
    id: "e-start-branching",
    source: "start",
    target: "branching",
    type: "smoothstep",
    animated: true,
    style: { stroke: "violet", strokeWidth: 2 },
  },
  {
    id: "e-branching-prs",
    source: "branching",
    target: "prs",
    type: "smoothstep",
    animated: true,
    style: { stroke: "#ADF802", strokeWidth: 2 },
  },
  {
    id: "e-prs-conflicts",
    source: "prs",
    target: "conflicts",
    type: "smoothstep",
    style: { stroke: "#64748b", strokeWidth: 2 },
  },
  {
    id: "e-conflicts-hooks",
    source: "conflicts",
    target: "hooks",
    type: "smoothstep",
    style: { stroke: "#64748b", strokeWidth: 2 },
  },
  {
    id: "e-hooks-security",
    source: "hooks",
    target: "security",
    type: "smoothstep",
    style: { stroke: "#64748b", strokeWidth: 2 },
  },
  {
    id: "e-security-release",
    source: "security",
    target: "release",
    type: "smoothstep",
    style: { stroke: "#64748b", strokeWidth: 2 },
  },
];

const nodeTypes = {
  roadmap: RoadmapNode,
};

export default function RoadmapFlow({ backHref = "/skills" }: { backHref?: string }) {
  const nodes = baseNodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      href: backHref,
    },
  }));

  return (
    <div className="mb-5 w-full max-w-[1400px] rounded-4xl border-2 border-slate-400/40 shadow-2xl shadow-slate-400/40">
      <div className="roadmap-scroll h-[560px] w-full overflow-x-auto overflow-y-hidden rounded-[32px] border border-white/20 bg-gradient-to-br from-white/15 via-white/0 to-orange-500/5 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:h-[720px]">
        <div className="h-full min-w-[1500px] md:min-w-[1900px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
            minZoom={1}
            maxZoom={1}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            panOnScroll={false}
            panOnDrag
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            proOptions={{ hideAttribution: true }}
            className="cursor-grab active:cursor-grabbing"
          >
            <Background color="#334155" gap={28} size={1} />
            <MiniMap
              nodeColor={(node) => {
                if (node.data?.status === "completed") return "#f97316";
                if (node.data?.status === "unlocked") return "#22d3ee";
                return "#475569";
              }}
              maskColor="rgba(2, 6, 23, 0.7)"
              className="!bg-slate-950/60 !border !border-white/10 !rounded-xl"
            />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
