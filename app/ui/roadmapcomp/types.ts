import { LucideIcon } from "lucide-react";

export type RoadmapStatus = "completed" | "locked" | "unlocked";

export type RoadmapNodeData = {
  title: string;
  subtitle?: string;
  status: RoadmapStatus;
  degree?: number;
  icon?: LucideIcon;
  href?: string;
};

export type NodeTheme = {
  container: string;
  iconBox: string;
  statusText: string;
  divider: string;
};

export const getNodeStyles = (status: RoadmapStatus, degree: number = 0): NodeTheme => {
  if (status === "completed") {
    if (degree >= 80) {
      return {
        container: "border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.4)] opacity-100",
        iconBox: "text-purple-400 border-purple-500/40 bg-purple-500/10",
        statusText: "text-purple-400",
        divider: "via-purple-500"
      };
    }
    if (degree >= 60) {
      return {
        container: "border-lime-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] opacity-100",
        iconBox: "text-lime-400 border-emerald-500/40 bg-emerald-500/10",
        statusText: "text-lime-400",
        divider: "via-emerald-500"
      };
    }
    if (degree >= 40) {
      return {
        container: "border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] opacity-100",
        iconBox: "text-orange-400 border-orange-500/40 bg-orange-500/10",
        statusText: "text-orange-400",
        divider: "via-orange-500"
      };
    }
    return {
      container: "border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)] opacity-100",
      iconBox: "text-red-400 border-red-500/40 bg-red-500/10",
      statusText: "text-red-400",
      divider: "via-red-500"
    };
  }

  if (status === "unlocked") {
    return {
      container: "border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] opacity-100",
      iconBox: "text-cyan-400 border-cyan-400/40 bg-cyan-400/5",
      statusText: "text-cyan-400",
      divider: "via-cyan-400"
    };
  }

  return {
    container: "border-slate-700 opacity-50 grayscale-[0.8]",
    iconBox: "text-slate-500 border-white/5 bg-slate-900/50",
    statusText: "text-slate-600",
    divider: "via-slate-700"
  };
};
