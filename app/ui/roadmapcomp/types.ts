import type { RoadmapStatus } from "@/app/ui/roadmapcomp/actions";

export type RoadmapNodeData = {
  title: string;
  subtitle?: string;
  status: RoadmapStatus;
  degree?: number;
};

export type RoadmapStep = RoadmapNodeData & {
  id: string;
  position?: { x: number; y: number };
};

export type RoadmapConnection = {
  id?: string;
  source: string;
  target: string;
  animated?: boolean;
};
