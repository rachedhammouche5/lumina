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

export default function RoadmapFlow({ topics = [], scores = [] }: { topics?: TopicRow[]; scores?: ScoreRow[] }) {
  const { nodes, edges } = generateRoadmapElements(topics, scores);

  const maxY = nodes.length > 0 
    ? Math.max(...nodes.map(n => n.position.y)) + 400 
    : 800;

  return (
    <div className="w-full max-w-[1400px] border-2 border-slate-400/40 rounded-4xl shadow-2xl shadow-slate-400/40 mb-5 overflow-hidden">
      <div className="h-[560px] md:h-[720px] w-full overflow-auto bg-[#050508] roadmap-scroll">
        
        <div style={{ width: '1900px', height: `${maxY}px` }}>
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
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#334155" gap={28} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
