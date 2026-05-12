import { describe, expect, test } from "vitest";
import { generateRoadmapElements } from "@/app/ui/roadmapcomp/actions";

describe("roadmap unlock gating", () => {
  const topics = [
    {
      tpc_id: "topic-1",
      tpc_title: "Leaf topic",
      tpc_description: null,
      parent_id: null,
      skill_id: "skill-1",
    },
  ];

  test("keeps leaf topics locked for guests who are not enrolled", () => {
    const { nodes } = generateRoadmapElements(topics, [], { id: "root", title: "Root" }, undefined, undefined, undefined, undefined, false);

    const leaf = nodes.find((node) => node.id === "topic-1");
    expect(leaf?.data.status).toBe("locked");
  });

  test("still allows enrolled students to unlock leaf topics", () => {
    const { nodes } = generateRoadmapElements(
      topics,
      [],
      { id: "root", title: "Root" },
      undefined,
      undefined,
      undefined,
      undefined,
      true,
    );

    const leaf = nodes.find((node) => node.id === "topic-1");
    expect(leaf?.data.status).toBe("unlocked");
  });

  test("keeps teacher preview override working even if enrollment is false", () => {
    const { nodes } = generateRoadmapElements(
      topics,
      [],
      { id: "root", title: "Root" },
      undefined,
      undefined,
      undefined,
      undefined,
      false,
      true,
    );

    const leaf = nodes.find((node) => node.id === "topic-1");
    expect(leaf?.data.status).toBe("unlocked");
  });
});
