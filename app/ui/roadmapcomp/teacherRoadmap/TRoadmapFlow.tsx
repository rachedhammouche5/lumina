"use client";

import "@xyflow/react/dist/style.css";
import { Background, Controls, ReactFlow, type NodeProps, type NodeTypes } from "@xyflow/react";
import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import TRoadmapNode from "./Tnode";
import type { ScoreRow, TopicRow } from "../types";
import { generateRoadmapElements } from "../actions";

import type { RoadmapNode } from "../types";

const nodeTypes: NodeTypes = {
  roadmap: TRoadmapNode as ComponentType<NodeProps<RoadmapNode>>,
};

export default function RoadmapFlow({
  topics = [],
  scores = [],
  root,
  isEnrolled = true,
  forceUnlocked = false,
  onAddChild,
  onManageTopic,
  onModifyQuizTopic,
  onRemoveTopic,
}: {
  topics?: TopicRow[];
  scores?: ScoreRow[];
  root?: { id: string; title: string; subtitle?: string };
  isEnrolled?: boolean;
  forceUnlocked?: boolean;
  onAddChild?: (parentId: string | null) => void;
  onManageTopic?: (topicId: string) => void;
  onModifyQuizTopic?: (topicId: string) => void;
  onRemoveTopic?: (topicId: string) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const { nodes, edges, width, height } = generateRoadmapElements(
    topics,
    scores,
    root,
    isEnrolled,
    onAddChild,
    onManageTopic,
    onModifyQuizTopic,
    onRemoveTopic,
    forceUnlocked,
  );

  const padding = 120;
  const translateExtent: [[number, number], [number, number]] = [
    [-padding, -padding],
    [width + padding, height + padding],
  ];

  // Clamp the visible canvas height so the roadmap block stays compact.
  const clampedHeight = Math.min(height, isMobile ? 420 : 500);

  return (
    <div className="w-full overflow-hidden border-2 border-slate-400/40 rounded-4xl shadow-2xl shadow-slate-400/40 mb-5 bg-linear-to-br from-slate-900 to-transparent">
      <div
        className="relative mx-auto w-full max-w-full overflow-hidden"
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
