/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "@xyflow/react/dist/style.css";
import { Background, ReactFlow, type NodeTypes } from "@xyflow/react";
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
}: {
  topics?: TopicRow[];
  scores?: ScoreRow[];
  root?: { id: string; title: string; subtitle?: string };
}) {
  const { nodes, edges, width, height } = generateRoadmapElements(topics, scores, root);

  return (
    <div className="w-full border-2 border-slate-400/40 rounded-4xl shadow-2xl shadow-slate-400/40 mb-5 bg-linear-to-br from-slate-900 to-transparent">
      <div style={{ width: `${width}px`, height: `${height}px`, margin: "0 auto" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView={false}
          minZoom={1}
          maxZoom={1}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          panOnScroll={false}
          panOnDrag={false}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="gray" gap={28} size={1} />
        </ReactFlow>
      </div>
    </div>
  );
}
