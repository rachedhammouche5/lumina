/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "@xyflow/react/dist/style.css";
import { Background, Controls, ReactFlow, type NodeTypes } from "@xyflow/react";
import { useEffect, useState } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const { nodes, edges, width, height } = generateRoadmapElements(topics, scores, root, isEnrolled);

  // Keep the viewport constrained while still allowing a comfortable drag margin.
  const margin = 220;
  const translateExtent: [[number, number], [number, number]] = [
    [-margin, -margin],
    [width + margin, height + margin],
  ];

  // Clamp the visible canvas height so the roadmap block stays compact.
  const clampedHeight = Math.min(height, isMobile ? 420 : 500);

  return (
    <div className="w-full overflow-auto border-2 border-slate-400/40 rounded-4xl shadow-2xl shadow-slate-400/40 mb-5 bg-linear-to-br from-slate-900 to-transparent">
      <div
        className="relative mx-auto w-full max-w-full"
        style={{
          width: "100%",
          maxWidth: "100vw",
          height: `${clampedHeight}px`,
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: isMobile ? 0.35 : 0.2, includeHiddenNodes: true }}
          minZoom={isMobile ? 0.45 : 0.6}
          maxZoom={isMobile ? 1.35 : 1.8}
          zoomOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          zoomActivationKeyCode="Control"
          panOnScroll={true}
          panOnDrag={true}
          translateExtent={translateExtent}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          preventScrolling={false}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="gray" gap={28} size={1} />
          <Controls
            position="bottom-right"
            showFitView
            className={isMobile ? "roadmap-controls roadmap-controls-mobile" : "roadmap-controls"}
          />
        </ReactFlow>
      </div>
    </div>
  );
}
