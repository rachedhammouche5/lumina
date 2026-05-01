import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@/lib/supabase/server";

export interface FeynmanResult {
  mastery_score: number;
  strengths: string[];
  gaps: string[];
  follow_up: string;
  encouragement: string;
}

export async function POST(req: NextRequest) {
  const { explanation, topic_id, skill_id } = await req.json();

  if (!explanation?.trim()) {
    return NextResponse.json({ error: "Explanation is required" }, { status: 400 });
  }

  const supabase = await createClient();

  const [{ data: topic }, { data: contents }] = await Promise.all([
    supabase.from("Topic").select("tpc_title, tpc_description").eq("tpc_id", topic_id).single(),
    supabase.from("Content").select("cntnt_title, cntnt_type").eq("tpc_id", topic_id),
  ]);

  if (!topic) {
    return NextResponse.json({ error: "Topic not found" }, { status: 404 });
  }

  const materialsList = (contents ?? [])
    .map(c => `- ${c.cntnt_title} (${c.cntnt_type})`)
    .join("\n") || "- No specific materials listed";

  const prompt = `You are an expert AI learning coach applying the Feynman Technique to assess deep understanding.

TOPIC: ${topic.tpc_title}
DESCRIPTION: ${topic.tpc_description ?? "No description provided"}
LEARNING MATERIALS COVERED:
${materialsList}

A student has studied this topic and is now explaining it in their own words:

STUDENT EXPLANATION:
"${explanation.trim()}"

Evaluate how deeply they understood the topic. Be specific, honest, and encouraging.

Respond ONLY with valid JSON — no markdown, no extra text, exactly this shape:
{
  "mastery_score": <integer 0 to 100>,
  "strengths": [<up to 3 strings: specific things they got right or explained well>],
  "gaps": [<up to 3 strings: specific concepts they missed, oversimplified, or got wrong>],
  "follow_up": "<one targeted question that would reveal whether they truly understand the hardest part>",
  "encouragement": "<2 sentences: acknowledge their effort, then tell them exactly what to review next>"
}

SCORING GUIDE:
0–30   Major misconceptions or off-topic explanation
31–55  Basic awareness but large conceptual gaps
56–75  Good grasp but missing important details
76–90  Strong understanding with only minor gaps
91–100 Excellent — could teach this confidently to someone else`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: process.env.AI_TUTOR_MODEL?.trim() || "gemini-2.5-flash-lite" });

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();

    const jsonStr = raw.startsWith("```")
      ? raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
      : raw;

    const parsed: FeynmanResult = JSON.parse(jsonStr);

    // save to db (best-effort — don't fail the request if this fails)
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: student } = await supabase
        .from("Student").select("std_id").eq("user_id", user.id).maybeSingle();
      if (student) {
        await supabase.from("feynman_attempt").insert({
          student_id: student.std_id,
          topic_id,
          skill_id,
          explanation: explanation.trim(),
          mastery_score: parsed.mastery_score,
          strengths: parsed.strengths,
          gaps: parsed.gaps,
          follow_up: parsed.follow_up,
          encouragement: parsed.encouragement,
        });
      }
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Feynman API error:", err);
    return NextResponse.json({ error: "AI evaluation failed" }, { status: 500 });
  }
}
