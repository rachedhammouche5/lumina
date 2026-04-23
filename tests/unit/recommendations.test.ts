import { beforeEach, describe, expect, test, vi } from "vitest";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Hoisted mocks — must be declared before any imports that use them
// ---------------------------------------------------------------------------
const mocks = vi.hoisted(() => ({
  createClient: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: mocks.createClient,
}));

import { GET } from "@/app/api/recommendations/route";

// ---------------------------------------------------------------------------
// Fluent Supabase chain builder
// Makes any query chain awaitable: await client.from("X").select().eq()  ✓
// Also supports .maybeSingle() which returns a direct Promise             ✓
// ---------------------------------------------------------------------------
function makeChain(result: { data: unknown; error: { message: string } | null }) {
  const self: Record<string, unknown> = {
    select: () => self,
    eq: () => self,
    or: () => self,
    in: () => self,
    maybeSingle: () => Promise.resolve(result),
    then: (
      resolve: (v: unknown) => unknown,
      reject?: (e: unknown) => unknown
    ) => Promise.resolve(result).then(resolve, reject),
  };
  return self;
}

// ---------------------------------------------------------------------------
// Shared test data
// ---------------------------------------------------------------------------
const SKILLS = [
  { skl_id: "skill-1", skl_title: "Algorithmic Thinking", skl_dscrptn: "Core CS algorithms", skl_picture: null },
  { skl_id: "skill-2", skl_title: "Mastery Git",          skl_dscrptn: "Version control with Git", skl_picture: null },
  { skl_id: "skill-3", skl_title: "Testing Templates",    skl_dscrptn: "Test templates", skl_picture: null },
];

const TOPICS = [
  { tpc_title: "Sorting algorithms",       skill_id: "skill-1" },
  { tpc_title: "Big-O notation",           skill_id: "skill-1" },
  { tpc_title: "Branching and merging",    skill_id: "skill-2" },
  { tpc_title: "Git bisect for debugging", skill_id: "skill-2" },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function setupSupabase({
  enrolledSkillIds = ["skill-1"],
  enrollError = null as { message: string } | null,
  allSkills = SKILLS,
  topics = TOPICS,
  studentRow = { std_id: "student-1" } as { std_id: string } | null,
} = {}) {
  const client = {
    from: vi.fn((table: string) => {
      if (table === "Student")
        return makeChain({ data: studentRow, error: null });
      if (table === "enroll")
        return makeChain({
          data: enrolledSkillIds.map((id) => ({ skill_id: id })),
          error: enrollError,
        });
      if (table === "Skill")
        return makeChain({ data: allSkills, error: null });
      if (table === "Topic")
        return makeChain({ data: topics, error: null });
      return makeChain({ data: [], error: null });
    }),
  };
  mocks.createClient.mockReturnValue(client);
  return client;
}

function groqOkResponse(recommendations: unknown[]) {
  return {
    ok: true,
    json: () =>
      Promise.resolve({
        choices: [{ message: { content: JSON.stringify({ recommendations }) } }],
      }),
  };
}

function makeReq(userId = "user-1") {
  return new NextRequest(
    `http://localhost/api/recommendations?userId=${userId}`
  );
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------
describe("GET /api/recommendations", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.stubGlobal("fetch", mocks.fetch);

    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "service-key";
    process.env.GROQ_API_KEY = "test-groq-key";
  });

  // ── Input validation ────────────────────────────────────────────────────

  test("returns 400 when userId query param is missing", async () => {
    const req = new NextRequest("http://localhost/api/recommendations");
    const res = await GET(req);
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/userId/);
  });

  test("returns 500 when GROQ_API_KEY env var is not set", async () => {
    delete process.env.GROQ_API_KEY;
    const res = await GET(makeReq());
    expect(res.status).toBe(500);
    expect((await res.json()).error).toMatch(/GROQ_API_KEY/);
  });

  // ── Early-exit: nothing to recommend ───────────────────────────────────

  test("returns empty array and skips Groq when student has no enrollments", async () => {
    setupSupabase({ enrolledSkillIds: [] });
    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toEqual([]);
    expect(mocks.fetch).not.toHaveBeenCalled();
  });

  test("returns empty array and skips Groq when every skill is already enrolled", async () => {
    setupSupabase({ enrolledSkillIds: SKILLS.map((s) => s.skl_id) });
    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toEqual([]);
    expect(mocks.fetch).not.toHaveBeenCalled();
  });

  // ── Happy path ──────────────────────────────────────────────────────────

  test("returns recommendations from Groq with correct fields", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue(
      groqOkResponse([
        {
          skillId: "skill-2",
          skillName: "Mastery Git",
          relevanceScore: 0.9,
          reason: "Git bisect is essential for tracing bugs in algorithms.",
        },
      ])
    );

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toHaveLength(1);
    expect(body.recommendations[0].skillId).toBe("skill-2");
    expect(body.recommendations[0].relevanceScore).toBe(0.9);
    expect(body.recommendations[0].reason).toBe(
      "Git bisect is essential for tracing bugs in algorithms."
    );
  });

  test("uses catalog metadata for skillName and description, not AI-provided values", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue(
      groqOkResponse([
        { skillId: "skill-2", skillName: "WRONG AI NAME", relevanceScore: 0.9, reason: "..." },
      ])
    );

    const body = await (await GET(makeReq())).json();
    // skillName must come from the DB catalog, never from the AI response
    expect(body.recommendations[0].skillName).toBe("Mastery Git");
    expect(body.recommendations[0].description).toBe("Version control with Git");
  });

  // ── Hallucination guard ─────────────────────────────────────────────────

  test("discards recommendations whose skillId does not exist in the catalog", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue(
      groqOkResponse([
        { skillId: "HALLUCINATED-ID", skillName: "Ghost Skill", relevanceScore: 0.95, reason: "..." },
        { skillId: "skill-2",         skillName: "Mastery Git",  relevanceScore: 0.8,  reason: "Real skill." },
      ])
    );

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toHaveLength(1);
    expect(body.recommendations[0].skillId).toBe("skill-2");
  });

  test("returns empty array when every AI suggestion is a hallucinated ID", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue(
      groqOkResponse([
        { skillId: "FAKE-1", skillName: "Ghost A", relevanceScore: 0.9,  reason: "..." },
        { skillId: "FAKE-2", skillName: "Ghost B", relevanceScore: 0.85, reason: "..." },
      ])
    );

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toEqual([]);
  });

  // ── Relevance threshold (0.65) ──────────────────────────────────────────

  test("filters out recommendations with relevanceScore below 0.65", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue(
      groqOkResponse([
        { skillId: "skill-2", skillName: "Mastery Git",      relevanceScore: 0.5,  reason: "Weak." },
        { skillId: "skill-3", skillName: "Testing Templates", relevanceScore: 0.3,  reason: "Very weak." },
      ])
    );

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toEqual([]);
  });

  test("includes a recommendation with relevanceScore exactly at the threshold (0.65)", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue(
      groqOkResponse([
        { skillId: "skill-2", skillName: "Mastery Git", relevanceScore: 0.65, reason: "At the boundary." },
      ])
    );

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toHaveLength(1);
  });

  // ── Result cap ──────────────────────────────────────────────────────────

  test("returns at most 6 recommendations even when Groq suggests more", async () => {
    const extraSkills = Array.from({ length: 10 }, (_, i) => ({
      skl_id: `extra-${i}`,
      skl_title: `Extra Skill ${i}`,
      skl_dscrptn: "desc",
      skl_picture: null,
    }));
    setupSupabase({
      enrolledSkillIds: ["skill-1"],
      allSkills: [SKILLS[0], ...extraSkills],
    });
    mocks.fetch.mockResolvedValue(
      groqOkResponse(
        extraSkills.map((s) => ({
          skillId: s.skl_id,
          skillName: s.skl_title,
          relevanceScore: 0.9,
          reason: "relevant",
        }))
      )
    );

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations.length).toBeLessThanOrEqual(6);
  });

  // ── Groq API errors ─────────────────────────────────────────────────────

  test("returns empty recommendations and error message when Groq responds with non-OK status", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue({
      ok: false,
      status: 429,
      text: () => Promise.resolve("rate limited"),
    });

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toEqual([]);
    expect(body.error).toBe("AI service unavailable");
  });

  test("returns empty recommendations when Groq returns malformed JSON", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          choices: [{ message: { content: "this is {{{ not valid json" } }],
        }),
    });

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toEqual([]);
  });

  test("returns empty recommendations when Groq returns an empty choices array", async () => {
    setupSupabase({ enrolledSkillIds: ["skill-1"] });
    mocks.fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ choices: [] }),
    });

    const body = await (await GET(makeReq())).json();
    expect(body.recommendations).toEqual([]);
  });
});
