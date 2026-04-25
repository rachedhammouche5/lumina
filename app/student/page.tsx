import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import Button from "@/app/ui/Button";
import CourseCard from "@/app/ui/Skills/CourseCard";
import { BookOpen, ChevronRight, Sparkles, TrendingUp } from "lucide-react";
import { calculateRoadmapProgress, normalizeTopicScores } from "@/app/actions/roadmap";
import type { TopicRow, ScoreRow } from "@/app/ui/roadmapcomp/types";
import type { Difficulty } from "@/app/skills/[skill_id]/[topic_id]/quiz/quiz.types";
import RecommendedSkills from "@/components/RecommendedSkills";

export default async function studentPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) { console.error("Auth error:", error.message); redirect("/"); }
  if (!user) redirect("/");

  const studentName =
    (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
    (typeof user.email === "string" && user.email.split("@")[0]) ||
    "Student";

  const role = getRole(user);
  if (role !== "student") redirect("/");

  // --- Student record ---
  const { data: student, error: studentError } = await supabase
    .from("Student")
    .select("std_id")
    .or(`user_id.eq.${user.id},std_id.eq.${user.id}`)
    .maybeSingle();
  if (studentError) console.error("[student] Failed to load student:", studentError.message);
  const studentId = student?.std_id ?? user.id;

  // --- Enrolled skills ---
  const enrollSelect = "progress, Skill ( skl_id, skl_title, skl_dscrptn, skl_duration, skl_picture )";
  const fetchEnroll = (col: "studentId" | "student_id") =>
    supabase.from("enroll").select(enrollSelect).eq(col, studentId).order("progress", { ascending: false });

  let { data: enrolledData, error: enrolledError } = await fetchEnroll("studentId");
  if (enrolledError?.message?.includes("studentId")) {
    ({ data: enrolledData, error: enrolledError } = await fetchEnroll("student_id"));
  }
  if (enrolledError) console.error("[student] Failed to load enrollments:", enrolledError.message);

  type RawSkill = {
    skl_id?: string; skl_title?: string; skl_dscrptn?: string | null;
    skl_duration?: number | null; skl_picture?: string | null;
  };
  type RawEnrollRow = { progress: number; Skill?: RawSkill | RawSkill[] | null };

  const enrolledRows = (enrolledData ?? []) as RawEnrollRow[];
  const enrolledSkillIds = enrolledRows
    .map((row) => { const s = Array.isArray(row.Skill) ? row.Skill[0] : row.Skill; return s?.skl_id ?? null; })
    .filter((id): id is string => Boolean(id));

  // --- Topics & scores for real progress ---
  const { data: allTopicsData } = enrolledSkillIds.length
    ? await supabase.from("Topic").select("tpc_id, skill_id, tpc_title, parent_id, tpc_description").in("skill_id", enrolledSkillIds)
    : { data: [] };

  const allTopics = (allTopicsData ?? []) as TopicRow[];
  const allTopicIds = allTopics.map((t) => t.tpc_id);

  const { data: allQuizData } = allTopicIds.length
    ? await supabase.from("quiz").select("tpc_id, difficulty").in("tpc_id", allTopicIds)
    : { data: [] };

  const { data: allScoresData } = await supabase.from("score").select("tpc_id, score").eq("studentId", studentId);

  const allScores = (allScoresData ?? []) as ScoreRow[];
  const normalizedScores = normalizeTopicScores(allScores, (allQuizData ?? []) as { tpc_id: string | null; difficulty: Difficulty }[]);

  const topicsBySkill = new Map<string, TopicRow[]>();
  allTopics.forEach((t) => {
    if (!t.skill_id) return;
    topicsBySkill.set(t.skill_id, [...(topicsBySkill.get(t.skill_id) ?? []), t]);
  });

  // --- Build enrolled cards with real progress ---
  const enrolledSkills = enrolledRows.map((row, index) => {
    const raw = row.Skill;
    const skill = Array.isArray(raw) ? raw[0] : raw;
    const id = skill?.skl_id ?? `unknown-${index}`;
    const title = skill?.skl_title ?? "Untitled skill";
    const skillTopics = topicsBySkill.get(id) ?? [];
    const realProgress = calculateRoadmapProgress(skillTopics, normalizedScores);

    return {
      id,
      title,
      description: skill?.skl_dscrptn ?? "No description yet.",
      image: skill?.skl_picture ?? undefined,
      progress: realProgress,
    };
  });

  // Stats
  const completedCount = enrolledSkills.filter((s) => s.progress === 100).length;
  const inProgressCount = enrolledSkills.filter((s) => s.progress > 0 && s.progress < 100).length;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-slate-950 pt-24 pb-20 px-4 sm:px-6 text-white">

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-orange-600/5 blur-[140px] rounded-full" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-blue-600/4 blur-[120px] rounded-full" />
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "32px 32px" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl space-y-12">

        {/* ── Welcome header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          {/* <div>
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 mb-2">Student Dashboard</p>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent">
                {studentName}
              </span>{" "}
              👋
            </h1>
          </div> */}

          
        </div>

        {/* ── Continue Where You Left Off ── */}
        <section>
          <SectionHeader label="Continue Learning" />
          <article className="relative border border-orange-200/25 rounded-[1.75rem] p-5 md:p-7 bg-gradient-to-br from-orange-200/15 via-orange-400/8 to-slate-900/60 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,164,84,0.28),transparent_50%)] pointer-events-none" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: "radial-gradient(circle, #ff7a00 1px, transparent 1px)", backgroundSize: "22px 22px" }}
            />

            <div className="relative z-10 flex flex-col md:flex-row gap-5 md:items-center">
              <div className="flex-1">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-orange-400/70 mb-1">Resume where you stopped</p>
                <h2 className="text-xl md:text-2xl font-black tracking-tight mb-1">Continue Where You Left Off</h2>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-5">Domain Title / Subdomain Title</p>
                <div className="flex items-center gap-3">
                  <Button variant="primary" size="m" className="rounded-xl flex-shrink-0">
                    Resume Learning <ChevronRight size={15} className="ml-1" />
                  </Button>
                  <div className="h-2 flex-1 rounded-full bg-slate-800/80">
                    <div className="h-2 w-[65%] rounded-full bg-gradient-to-r from-orange-500 to-amber-300 shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
                  </div>
                </div>
              </div>

              <div className="md:w-[200px] h-[110px] rounded-2xl border border-orange-200/20 bg-orange-200/8 flex items-center justify-center relative flex-shrink-0">
                <BookOpen className="text-orange-300/60" size={50} />
                <span className="absolute -top-3 -right-3 h-13 w-13 h-[52px] w-[52px] rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white font-bold text-base flex items-center justify-center shadow-lg shadow-orange-500/30">
                  65%
                </span>
              </div>
            </div>
          </article>
        </section>

        {/* ── Enrolled Skills ── */}
        <section>
          <SectionHeader label="Enrolled Skills" />

          {enrolledSkills.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledSkills.map((skill) => (
                <CourseCard
                  key={skill.id}
                  id={skill.id}
                  title={skill.title}
                  description={skill.description}
                  image={skill.image}
                  progress={skill.progress}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/6 bg-slate-900/40 p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/60 border border-white/5 flex items-center justify-center mx-auto mb-4">
                <BookOpen size={26} className="text-slate-600" />
              </div>
              <p className="text-white/60 text-sm font-semibold mb-1">No enrolled skills yet</p>
              <p className="text-slate-600 text-xs">Browse the catalog below to get started.</p>
            </div>
          )}
        </section>

        {/* ── AI Recommended Skills ── */}
        <RecommendedSkills userId={user.id} />

      </div>
    </main>
  );
}

/* ── Shared sub-components ── */

function SectionHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-4 w-1 rounded-full bg-orange-500" />
      <h2 className="text-lg font-black tracking-tight">{label}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/8 to-transparent" />
    </div>
  );
}

function StatPill({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl border text-sm ${
      accent
        ? "bg-orange-500/10 border-orange-500/20 text-orange-400"
        : "bg-slate-800/50 border-white/6 text-slate-400"
    }`}>
      {icon}
      <span className="font-bold tabular-nums">{value}</span>
      <span className="text-[10px] uppercase tracking-wider font-medium opacity-70">{label}</span>
    </div>
  );
}
