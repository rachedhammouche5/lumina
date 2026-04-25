import type { ScoreRow, TopicRow, RoadmapStatus } from "./types";

export const PASS_THRESHOLD = 50;

export type TopicGraph = {
  childrenMap: Map<string, TopicRow[]>;
  scoreMap: Map<string, number>;
  topLevelTopicIds: string[];
};

export function buildTopicGraph(topics: TopicRow[] = [], scores: ScoreRow[] = []): TopicGraph {
  const childrenMap = new Map<string, TopicRow[]>();
  topics.forEach((topic) => {
    const parentKey = topic.parent_id ?? "__ROOT__";
    const list = childrenMap.get(parentKey) ?? [];
    list.push(topic);
    childrenMap.set(parentKey, list);
  });

  return {
    childrenMap,
    scoreMap: new Map(scores.map((score) => [score.tpc_id, score.score])),
    topLevelTopicIds: topics.filter((topic) => !topic.parent_id).map((topic) => topic.tpc_id),
  };
}

export function getTopicAggregateDegree(
  topicId: string,
  graph: TopicGraph,
  memo = new Map<string, number>(),
): number {
  const cached = memo.get(topicId);
  if (typeof cached === "number") return cached;

  const ownScore = graph.scoreMap.get(topicId) ?? 0;
  const children = graph.childrenMap.get(topicId) ?? [];

  if (children.length === 0) {
    memo.set(topicId, ownScore);
    return ownScore;
  }

  const childDegrees = children.map((child) => getTopicAggregateDegree(child.tpc_id, graph, memo));
  const childAverage =
    childDegrees.length > 0
      ? Math.round(childDegrees.reduce((sum, value) => sum + value, 0) / childDegrees.length)
      : 0;

  const degree = Math.max(ownScore, childAverage);
  memo.set(topicId, degree);
  return degree;
}

export function areAllChildrenPassed(
  topicId: string,
  graph: TopicGraph,
  memo = new Map<string, boolean>(),
): boolean {
  const cached = memo.get(topicId);
  if (typeof cached === "boolean") return cached;

  const children = graph.childrenMap.get(topicId) ?? [];
  if (children.length === 0) {
    memo.set(topicId, false);
    return false;
  }

  const passed = children.every((child) => isTopicPassed(child.tpc_id, graph, memo));
  memo.set(topicId, passed);
  return passed;
}

export function isTopicPassed(
  topicId: string,
  graph: TopicGraph,
  memo = new Map<string, boolean>(),
): boolean {
  const cached = memo.get(topicId);
  if (typeof cached === "boolean") return cached;

  const ownScore = graph.scoreMap.get(topicId) ?? 0;
  if (ownScore >= PASS_THRESHOLD) {
    memo.set(topicId, true);
    return true;
  }

  const children = graph.childrenMap.get(topicId) ?? [];
  if (children.length === 0) {
    memo.set(topicId, false);
    return false;
  }

  const passed = children.every((child) => isTopicPassed(child.tpc_id, graph, memo));
  memo.set(topicId, passed);
  return passed;
}

export function getTopicStatus(
  topicId: string,
  graph: TopicGraph,
): RoadmapStatus {
  const ownScore = graph.scoreMap.get(topicId) ?? 0;
  const children = graph.childrenMap.get(topicId) ?? [];

  if (ownScore >= PASS_THRESHOLD) {
    return "completed";
  }

  if (children.length === 0) {
    return "unlocked";
  }

  return areAllChildrenPassed(topicId, graph) ? "unlocked" : "locked";
}

export function getRootStatus(graph: TopicGraph): RoadmapStatus {
  const allTopLevelPassed =
    graph.topLevelTopicIds.length > 0 &&
    graph.topLevelTopicIds.every((topicId) => isTopicPassed(topicId, graph));

  return allTopLevelPassed ? "completed" : "locked";
}
