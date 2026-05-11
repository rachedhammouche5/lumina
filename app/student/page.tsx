import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import Button from "@/app/ui/Button";
import CourseCard from "@/app/ui/Skills/CourseCard";
import { BookOpen, ChevronRight } from "lucide-react";
import { calculateRoadmapProgress, normalizeTopicScores } from "@/app/actions/roadmap";
import type { TopicRow, ScoreRow } from "@/app/ui/roadmapcomp/types";
import { buildTopicGraph, getTopicStatus } from "@/app/ui/roadmapcomp/progression";
import type { Difficulty } from "@/app/skills/[skill_id]/[topic_id]/quiz/quiz.types";
import RecommendedSkills from "@/components/RecommendedSkills";

export default async function studentPage() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) { console.error("Auth error:", error.message); redirect("/"); }
  if (!user) redirect("/");

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
  const enrollSelect = "progress, Skill ( skl_id, skl_title, skl_dscrptn, skl_duration, skl_picture, teacher_id, Teacher ( tchr_fullname, tchr_pfp ) )";
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
    Teacher?: { tchr_fullname?: string | null; tchr_pfp?: string | null } | { tchr_fullname?: string | null; tchr_pfp?: string | null }[] | null;
  };
  type RawEnrollRow = { progress: number; Skill?: RawSkill | RawSkill[] | null };

  type ContinueCard = {
    skillTitle: string;
    topicTitle: string;
    href: string;
    progress: number;
    isComplete: boolean;
  };

  const enrolledRows = (enrolledData ?? []) as RawEnrollRow[];
  const enrolledSkillIds = enrolledRows
    .map((row) => { const s = Array.isArray(row.Skill) ? row.Skill[0] : row.Skill; return s?.skl_id ?? null; })
    .filter((id): id is string => Boolean(id));

  const { data: reviewRows } = enrolledSkillIds.length
    ? await supabase.from("review").select("skill_id, rating").in("skill_id", enrolledSkillIds)
    : { data: [] };

  const reviewStats = new Map<string, { total: number; count: number }>();
  (reviewRows ?? []).forEach((row) => {
    const next = reviewStats.get(row.skill_id) ?? { total: 0, count: 0 };
    next.total += row.rating ?? 0;
    next.count += 1;
    reviewStats.set(row.skill_id, next);
  });

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
    const teacherRow = skill?.Teacher ? (Array.isArray(skill.Teacher) ? skill.Teacher[0] : skill.Teacher) : null;
    const stats = reviewStats.get(id);

    return {
      id,
      title,
      description: skill?.skl_dscrptn ?? "No description yet.",
      image: skill?.skl_picture ?? undefined,
      progress: realProgress,
      teacher: teacherRow
        ? {
            name: teacherRow.tchr_fullname ?? "Teacher",
            avatar: teacherRow.tchr_pfp ?? null,
          }
        : null,
      rating: stats && stats.count > 0 ? stats.total / stats.count : null,
      reviewCount: stats?.count ?? 0,
    };
  });

  const scoreByTopicId = new Map(normalizedScores.map((row) => [row.tpc_id, row.score]));

  const buildContinueCard = (skillId: string, skillTitle: string): ContinueCard | null => {
    const skillTopics = topicsBySkill.get(skillId) ?? [];
    if (!skillTopics.length) {
      return {
        skillTitle,
        topicTitle: "Open the roadmap to pick up where you left off",
        href: `/skills/${skillId}`,
        progress: 0,
        isComplete: false,
      };
    }

    const skillScores = normalizedScores.filter((row) => skillTopics.some((topic) => topic.tpc_id === row.tpc_id));
    const graph = buildTopicGraph(skillTopics, skillScores);
    const sortedTopics = [...skillTopics].sort((a, b) => {
      const aStatus = getTopicStatus(a.tpc_id, graph);
      const bStatus = getTopicStatus(b.tpc_id, graph);
      const statusRank = { unlocked: 0, locked: 1, completed: 2 } as const;

      if (statusRank[aStatus] !== statusRank[bStatus]) {
        return statusRank[aStatus] - statusRank[bStatus];
      }

      const aScore = scoreByTopicId.get(a.tpc_id) ?? 0;
      const bScore = scoreByTopicId.get(b.tpc_id) ?? 0;
      if (aScore !== bScore) return aScore - bScore;

      return a.tpc_title.localeCompare(b.tpc_title);
    });

    const nextTopic = sortedTopics.find((topic) => (scoreByTopicId.get(topic.tpc_id) ?? 0) < 100) ?? sortedTopics[0];
    const progress = calculateRoadmapProgress(skillTopics, skillScores);
    const isComplete = progress >= 100;

    return {
      skillTitle,
      topicTitle: nextTopic?.tpc_title ?? skillTitle,
      href: nextTopic ? `/skills/${skillId}/${nextTopic.tpc_id}` : `/skills/${skillId}`,
      progress,
      isComplete,
    };
  };

  const activeEnrollment = enrolledSkills.find((skill) => skill.progress > 0 && skill.progress < 100)
    ?? enrolledSkills.find((skill) => skill.progress < 100)
    ?? enrolledSkills[0];

  const continueCard = activeEnrollment
    ? buildContinueCard(activeEnrollment.id, activeEnrollment.title)
    : null;

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
                <h2 className="text-xl md:text-2xl font-black tracking-tight mb-1">
                  {continueCard?.isComplete ? "Review Your Completed Path" : "Continue Where You Left Off"}
                </h2>
                <p className="text-xs uppercase tracking-widest text-white/50 mb-5">
                  {continueCard ? `${continueCard.skillTitle} / ${continueCard.topicTitle}` : "No enrolled skills yet"}
                </p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="primary"
                    size="m"
                    href={continueCard?.href ?? "/skills"}
                    className="rounded-xl flex-shrink-0"
                  >
                    {continueCard?.isComplete ? "Review Roadmap" : "Resume Learning"}
                    <ChevronRight size={15} className="ml-1" />
                  </Button>
                  <div className="h-2 flex-1 rounded-full bg-slate-800/80">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-300 shadow-[0_0_8px_rgba(249,115,22,0.4)]"
                      style={{ width: `${continueCard?.progress ?? 0}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="md:w-[200px] h-[110px] rounded-2xl border border-orange-200/20 bg-orange-200/8 flex items-center justify-center relative flex-shrink-0">
                <BookOpen className="text-orange-300/60" size={50} />
                <span className="absolute -top-3 -right-3 h-13 w-13 h-[52px] w-[52px] rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-white font-bold text-base flex items-center justify-center shadow-lg shadow-orange-500/30">
                  {continueCard?.progress ?? 0}%
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
                  teacher={skill.teacher}
                  rating={skill.rating}
                  reviewCount={skill.reviewCount}
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
