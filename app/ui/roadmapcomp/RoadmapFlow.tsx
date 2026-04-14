/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "@xyflow/react/dist/style.css";
import { Background, Controls, ReactFlow, type NodeTypes } from "@xyflow/react";
import RoadmapNode from "@/app/ui/roadmapcomp/node";
import { generateRoadmapElements } from "./actions";
import type { ScoreRow, TopicRow } from "./types";

const nodeTypes: NodeTypes = {
  roadmap: RoadmapNode as any,
};

export default function RoadmapFlow({
  topics = [],
  scores = [],
  root,
  isEnrolled = true,
}: {
  topics?: TopicRow[];
  scores?: ScoreRow[];
  root?: { id: string; title: string; subtitle?: string };
  isEnrolled?: boolean;
}) {
  const { nodes, edges, width, height } = generateRoadmapElements(topics, scores, root, isEnrolled);

  // Keep the viewport constrained so users can't pan into endless negative space.
  const padding = 120;
  const translateExtent: [[number, number], [number, number]] = [
    [-padding, -padding],
    [width + padding, height + padding],
  ];

  // Clamp the visible canvas height so the roadmap block stays compact.
  const clampedHeight = Math.min(height, 500);

  return (
    <div className="w-full overflow-hidden border-2 border-slate-400/40 rounded-4xl shadow-2xl shadow-slate-400/40 mb-5 bg-linear-to-br from-slate-900 to-transparent">
      <div
        className="relative mx-auto max-w-full overflow-hidden"
        style={{ width: `${width}px`, height: `${clampedHeight}px` }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2, includeHiddenNodes: true }}
          minZoom={0.6}
          maxZoom={1.8}
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick={false}
          zoomActivationKeyCode="Control"
          panOnScroll
          panOnDrag
          translateExtent={translateExtent}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="gray" gap={28} size={1} />
          <Controls position="bottom-right" showFitView className="roadmap-controls" />
        </ReactFlow>
      </div>
    </div>
  );
}
