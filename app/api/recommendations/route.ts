import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type GrokRec = {
  skillId: string;
  skillName: string;
  relevanceScore: number;
  reason: string;
};

type CandidateSkill = {
  id: string;
  title: string;
  description: string;
  topics: string[];
  image: string | null;
};

export type RecommendationItem = {
  skillId: string;
  skillName: string;
  relevanceScore: number;
  reason: string;
  image: string | null;
  description: string;
};

// ---------------------------------------------------------------------------
// Service-role Supabase client
// ---------------------------------------------------------------------------
function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key);
}

// ---------------------------------------------------------------------------
// GET /api/recommendations?userId=<auth_user_id>
// ---------------------------------------------------------------------------
export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ recommendations: [], error: "userId is required" }, { status: 400 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.warn("[recommendations] GROQ_API_KEY not set");
    return NextResponse.json({ recommendations: [], error: "GROQ_API_KEY not configured" }, { status: 500 });
  }

  try {
    const supabase = getAdminClient();

    // ── 1. Resolve std_id ────────────────────────────────────────────────────
    const { data: student } = await supabase
      .from("Student")
      .select("std_id")
      .or(`user_id.eq.${userId},std_id.eq.${userId}`)
      .maybeSingle();

    const studentId = student?.std_id ?? userId;

    // ── 2. Enrolled skill IDs ────────────────────────────────────────────────
    let { data: enrollData, error: enrollError } = await supabase
      .from("enroll")
      .select("skill_id")
      .eq("studentId", studentId);

    if (enrollError?.message?.includes("studentId")) {
      ({ data: enrollData } = await supabase
        .from("enroll")
        .select("skill_id")
        .eq("student_id", studentId));
    }

    const enrolledIds = new Set(
      (enrollData ?? [])
        .map((e: { skill_id?: string }) => e.skill_id)
        .filter(Boolean) as string[]
    );

    // ── 3. All skills ────────────────────────────────────────────────────────
    const { data: allSkillsData } = await supabase
      .from("Skill")
      .select("skl_id, skl_title, skl_dscrptn, skl_picture");

    const allSkills = (allSkillsData ?? []) as {
      skl_id: string;
      skl_title: string;
      skl_dscrptn: string | null;
      skl_picture: string | null;
    }[];

    // ── 4. Topics per skill ──────────────────────────────────────────────────
    const allSkillIds = allSkills.map((s) => s.skl_id);

    const { data: allTopicsData } = allSkillIds.length
      ? await supabase
          .from("Topic")
          .select("tpc_title, skill_id")
          .in("skill_id", allSkillIds)
      : { data: [] };

    const topicsBySkill = new Map<string, string[]>();
    (allTopicsData ?? []).forEach(
      (t: { tpc_title: string; skill_id: string | null }) => {
        if (!t.skill_id) return;
        const list = topicsBySkill.get(t.skill_id) ?? [];
        list.push(t.tpc_title);
        topicsBySkill.set(t.skill_id, list);
      }
    );

    // ── 5. Split enrolled / candidates ──────────────────────────────────────
    const enrolledSkills = allSkills
      .filter((s) => enrolledIds.has(s.skl_id))
      .map((s) => ({
        id: s.skl_id,
        title: s.skl_title,
        description: s.skl_dscrptn ?? "",
        topics: (topicsBySkill.get(s.skl_id) ?? []).slice(0, 8),
      }));

    const candidateSkills: CandidateSkill[] = allSkills
      .filter((s) => !enrolledIds.has(s.skl_id))
      .map((s) => ({
        id: s.skl_id,
        title: s.skl_title,
        description: s.skl_dscrptn ?? "",
        topics: (topicsBySkill.get(s.skl_id) ?? []).slice(0, 8),
        image: s.skl_picture,
      }));

    if (enrolledSkills.length === 0 || candidateSkills.length === 0) {
      return NextResponse.json({ recommendations: [] });
    }

    // ── 6. Build prompt ──────────────────────────────────────────────────────
    const systemInstruction =
      "You are a learning path advisor for a computer science education platform. " +
      "Your task: given what a student is currently studying, recommend catalog skills they should learn ALONGSIDE or BEFORE their current courses. " +
      "Recommend a skill if it falls into one of these categories:\n" +
      "  A) PREREQUISITE — knowledge the student needs to understand their current course (e.g., 'Data Structures' before 'Algorithms').\n" +
      "  B) ESSENTIAL TOOL — a practical tool directly used in the current subject (e.g., 'Git' for anyone studying programming or debugging — version control is used every day by developers).\n" +
      "  C) COMPLEMENTARY SKILL — a skill that directly supports success in the current course (e.g., 'Linux Command Line' for a debugging course).\n" +
      "RULES:\n" +
      "1. Use ONLY the exact skillId values from the catalog — never invent or paraphrase IDs.\n" +
      "2. The connection must be CONCRETE and PRACTICAL, not superficial (e.g., do NOT recommend 'Testing Templates' just because it mentions testing).\n" +
      "3. Think about what a real developer or CS student actually needs day-to-day when working on the enrolled subjects.\n" +
      "4. If a catalog skill has no meaningful relationship to the enrolled skills, omit it entirely.\n" +
      "5. Return ONLY a valid JSON object with key \"recommendations\" (array). Each item: skillId (string), skillName (string), relevanceScore (0.0–1.0), reason (one concrete sentence on why this skill matters for the current enrollment).";

    const enrolledText = enrolledSkills
      .map((s) => {
        const desc = s.description ? ` — ${s.description}` : "";
        const topics = s.topics.length ? `\n  Topics covered: ${s.topics.join(", ")}` : "";
        return `• ${s.title}${desc}${topics}`;
      })
      .join("\n");

    const candidateText = candidateSkills
      .map((s) => {
        const desc = s.description ? ` — ${s.description}` : "";
        const topics = s.topics.length ? ` | topics: ${s.topics.join(", ")}` : "";
        return `  skillId="${s.id}" | ${s.title}${desc}${topics}`;
      })
      .join("\n");

    const userMessage =
      `The student is currently enrolled in these skills:\n${enrolledText}\n\n` +
      `Available catalog skills (not yet enrolled):\n${candidateText}\n\n` +
      `Which of these catalog skills should the student learn FIRST or ALONGSIDE their current enrollment as foundational prerequisites? ` +
      `Return { "recommendations": [...] } sorted by relevanceScore descending. Only include skills with a genuine prerequisite relationship.`;

    console.log("[recommendations] enrolled:", enrolledSkills.map(s => `${s.title} (topics: ${s.topics.join(", ") || "none"})`));
    console.log("[recommendations] candidates:", candidateSkills.map(s => `${s.title} (topics: ${s.topics.join(", ") || "none"})`));

    // ── 7. Call Groq ─────────────────────────────────────────────────────────
    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemInstruction },
          { role: "user", content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 1024,
        response_format: { type: "json_object" },
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!groqRes.ok) {
      const body = await groqRes.text();
      console.error(`[recommendations] Groq ${groqRes.status}:`, body.slice(0, 400));
      return NextResponse.json({ recommendations: [], error: "AI service unavailable" });
    }

    const groqData = await groqRes.json();
    const rawText: string = groqData?.choices?.[0]?.message?.content ?? "{}";
    console.log("[recommendations] AI raw response:", rawText.slice(0, 800));

    // ── 8. Parse + filter ────────────────────────────────────────────────────
    let parsed: GrokRec[] = [];
    try {
      const clean = rawText.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
      const result = JSON.parse(clean);
      parsed = Array.isArray(result) ? result : (result?.recommendations ?? []);
    } catch {
      console.error("[recommendations] JSON parse failed:", rawText.slice(0, 300));
      return NextResponse.json({ recommendations: [], error: "Failed to parse AI response" });
    }

    const metaMap = new Map(candidateSkills.map((s) => [s.id, s]));

    const recommendations: RecommendationItem[] = parsed
      .filter((r) => {
        if (typeof r.skillId !== "string") return false;
        if (!metaMap.has(r.skillId)) {
          console.warn("[recommendations] AI returned unknown skillId, discarding:", r.skillId);
          return false;
        }
        return r.relevanceScore >= 0.65;
      })
      .slice(0, 6)
      .map((r) => {
        const meta = metaMap.get(r.skillId)!;
        return {
          skillId: r.skillId,
          skillName: meta.title,
          relevanceScore: r.relevanceScore,
          reason: r.reason ?? "",
          image: meta.image,
          description: meta.description,
        };
      });

    return NextResponse.json({ recommendations });
  } catch (err) {
    console.error("[recommendations] Unexpected error:", err);
    return NextResponse.json({ recommendations: [], error: "Internal server error" }, { status: 500 });
  }
}
