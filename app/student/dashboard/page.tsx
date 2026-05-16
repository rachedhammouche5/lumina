import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, BookCheck, Flame, Medal, TrendingUp } from "lucide-react";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getRole } from "@/features/utils/auth/getRole";
import { loadPrestigeBadgeViews } from "@/features/achievements/prestige";
import ProgressChart from "./_components/ProgressChart";
import LeaderboardPanel, { type LeaderboardEntry } from "./_components/LeaderboardPanel";
import PrestigeBadgesPanel from "./_components/PrestigeBadgesPanel";

type StudentRow = {
  std_id: string;
  std_fullname: string | null;
  std_pfp: string | null;
  std_streak: number;
  std_last_activeDate: string | null;
};

type TopicScoreRow = {
  tpc_id: string | null;
  score: number;
  Topic?: {
    tpc_title?: string | null;
    skill_id?: string | null;
    Skill?: { skl_id?: string | null; skl_title?: string | null } | { skl_id?: string | null; skl_title?: string | null }[] | null;
  } | null;
};

type EnrollRow = {
  progress: number;
  Skill?: {
    skl_title?: string | null;
  } | {
    skl_title?: string | null;
  }[] | null;
};

type StudentScoreRow = {
  studentId: string;
  score: number;
};

type StudentLeaderboardRow = {
  std_id: string;
  std_fullname: string | null;
  std_pfp: string | null;
};

const getSkillTitle = (skill: EnrollRow["Skill"]) => {
  const current = Array.isArray(skill) ? skill[0] : skill;
  return current?.skl_title ?? "Skill";
};

const getStudentName = (student: Pick<StudentRow, "std_fullname">, userName: string) =>
  (typeof student.std_fullname === "string" && student.std_fullname.trim()) || userName;

function buildLeaderboard(
  students: StudentLeaderboardRow[],
  scores: StudentScoreRow[],
  currentStudentId: string,
  currentStudentName: string,
  currentStudentPfp: string | null,
): LeaderboardEntry[] {
  const pointsByStudent = new Map<string, number>();

  for (const row of scores) {
    pointsByStudent.set(row.studentId, (pointsByStudent.get(row.studentId) ?? 0) + row.score);
  }

  const normalized = students.map((student) => ({
    id: student.std_id,
    fullName: student.std_fullname?.trim() || "Student",
    pfp: student.std_pfp ?? null,
    points: pointsByStudent.get(student.std_id) ?? 0,
  }));

  if (!normalized.some((student) => student.id === currentStudentId)) {
    normalized.push({
      id: currentStudentId,
      fullName: currentStudentName,
      pfp: currentStudentPfp,
      points: pointsByStudent.get(currentStudentId) ?? 0,
    });
  }

  return normalized
    .sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      return a.fullName.localeCompare(b.fullName);
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
}

export default async function StudentDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) redirect("/");

  const role = getRole(user);
  if (role !== "student") redirect("/");

  const { data: student } = await supabase
    .from("Student")
    .select("std_streak, std_id, std_last_activeDate, std_fullname, std_pfp")
    .eq("user_id", user.id)
    .single();

  const currentStudent = student as StudentRow | null;
  const currentStudentId = currentStudent?.std_id ?? user.id;
  const currentStudentName = getStudentName(currentStudent ?? { std_fullname: null }, (user.user_metadata?.full_name as string | undefined)?.trim() || (user.email?.split("@")[0] ?? "Student"));

  const [
    { count: completedSkills },
    { data: scoreRows },
    { data: enrolledRows },
    { data: allStudentsData },
    { data: allScoresData },
  ] = await Promise.all([
    supabase
      .from("enroll")
      .select("*", { count: "exact", head: true })
      .eq("student_id", currentStudentId)
      .eq("progress", 100),
    supabase
      .from("score")
      .select("score, tpc_id, Topic(tpc_title, skill_id, Skill(skl_id, skl_title))")
      .eq("studentId", currentStudentId),
    supabase
      .from("enroll")
      .select("progress, Skill(skl_title)")
      .eq("student_id", currentStudentId),
    supabase.from("Student").select("std_id, std_fullname, std_pfp"),
    supabase.from("score").select("studentId, score"),
  ]);

  const streak = currentStudent?.std_streak ?? 0;
  const skills = completedSkills ?? 0;

  const topicScores = (scoreRows ?? []) as TopicScoreRow[];
  const enrollments = (enrolledRows ?? []) as EnrollRow[];
  const allStudents = (allStudentsData ?? []) as StudentLeaderboardRow[];
  const allScores = (allScoresData ?? []) as StudentScoreRow[];

  const mapScore = (row: TopicScoreRow) => ({
    tpc_id: row.tpc_id ?? "",
    topic: row.Topic?.tpc_title ?? "",
    skill: Array.isArray(row.Topic?.Skill) ? row.Topic?.Skill[0]?.skl_title ?? "" : row.Topic?.Skill?.skl_title ?? "",
    score: Math.round(row.score),
    href: `/skills/${row.Topic?.skill_id ?? ""}/${row.tpc_id ?? ""}`,
  });

  const weakPointsAll = topicScores.filter((row) => row.score < 70);
  const weakPoints = weakPointsAll
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(mapScore);

  const strongPointsAll = topicScores.filter((row) => row.score >= 70);
  const strongPoints = strongPointsAll
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(mapScore);

  const totalQuizzesTaken = topicScores.length;
  const strongTopicsCount = strongPointsAll.length;
  const averageScore = totalQuizzesTaken > 0 ? topicScores.reduce((sum, row) => sum + row.score, 0) / totalQuizzesTaken : 0;

  const chartData = enrollments.map((row, index) => ({
    name: `${getSkillTitle(row.Skill)} ${index + 1}`,
    score: Math.round(row.progress),
  }));

  const leaderboardEntries = buildLeaderboard(
    allStudents,
    allScores,
    currentStudentId,
    currentStudentName,
    currentStudent?.std_pfp ?? null,
  );

  const currentRank = leaderboardEntries.find((entry) => entry.id === currentStudentId)?.rank ?? leaderboardEntries.length;
  const adminClient = process.env.SUPABASE_SERVICE_ROLE_KEY ? createAdminClient() : null;
  const prestigeBadges = await loadPrestigeBadgeViews({
    adminClient,
    studentId: currentStudentId,
    stats: {
      streak,
      skillsCompleted: skills,
      quizzesTaken: totalQuizzesTaken,
      strongTopics: strongTopicsCount,
      averageScore,
      currentRank,
      totalStudents: leaderboardEntries.length,
    },
  });

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6">
      <div className="mx-auto w-full max-w-6xl space-y-8">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Dashboard</p>
          <h1 className="text-2xl font-bold text-white">My Learning</h1>
          <p className="text-sm text-slate-400">
            Welcome back, <span className="font-semibold text-orange-400">{currentStudentName}</span>
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-orange-500/8 pointer-events-none" />
            <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/15">
              <Flame size={18} className="text-orange-400" />
            </div>
            <div className="relative">
              <p className="mb-0.5 text-xs font-medium text-slate-500">Current streak</p>
              <p className="text-2xl font-bold text-white">
                {streak} {streak === 1 ? "day" : "days"}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {streak === 0 ? "Study today to start your streak!" : "Keep learning today"}
              </p>
            </div>
          </article>

          <article className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-sky-500/8 pointer-events-none" />
            <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/15">
              <TrendingUp size={18} className="text-sky-400" />
            </div>
            <div className="relative">
              <p className="mb-0.5 text-xs font-medium text-slate-500">Strong topics</p>
              <p className="text-2xl font-bold text-white">{strongPointsAll.length}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                {strongPointsAll.length === 0 ? "Take quizzes to track progress!" : "Topics scored at 70% or higher"}
              </p>
            </div>
          </article>

          <article className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-violet-500/8 pointer-events-none" />
            <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/15">
              <BookCheck size={18} className="text-violet-400" />
            </div>
            <div className="relative">
              <p className="mb-0.5 text-xs font-medium text-slate-500">Skills completed</p>
              <p className="text-2xl font-bold text-white">
                {skills} {skills === 1 ? "skill" : "skills"}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {skills === 0 ? "Complete your first skill!" : "Keep it up!"}
              </p>
            </div>
          </article>

          <article className="relative flex items-start gap-4 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-emerald-500/8 pointer-events-none" />
            <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/25 bg-emerald-500/15">
              <Medal size={18} className="text-emerald-400" />
            </div>
            <div className="relative">
              <p className="mb-0.5 text-xs font-medium text-slate-500">Quizzes taken</p>
              <p className="text-2xl font-bold text-white">
                {totalQuizzesTaken} {totalQuizzesTaken === 1 ? "quiz" : "quizzes"}
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                {totalQuizzesTaken === 0 ? "Take your first quiz!" : "Keep it up!"}
              </p>
            </div>
          </article>
        </section>

        <PrestigeBadgesPanel badges={prestigeBadges} />

        <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/15">
                  <BookCheck size={13} className="text-emerald-400" />
                </div>
                <h2 className="text-sm font-semibold text-slate-200">Weak points</h2>
              </div>

              <div className="space-y-5">
                {weakPoints.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No weak areas yet. Take some quizzes to get personalized feedback.
                  </p>
                ) : (
                  weakPoints.map((item, index) => (
                    <div key={item.tpc_id || `${item.topic}-${index}`} className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{item.topic || "Topic"}</p>
                          <p className="text-xs text-slate-500">{item.skill}</p>
                        </div>
                        <span className="text-xs font-semibold text-rose-300 tabular-nums">{item.score}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-rose-600 to-rose-400"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-sky-400 transition-colors hover:text-sky-300"
                      >
                        Study this topic
                        <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                      </Link>
                      {index < weakPoints.length - 1 && <div className="border-t border-slate-800 pt-1" />}
                    </div>
                  ))
                )}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <div className="mb-5 flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-sky-500/20 bg-sky-500/15">
                  <TrendingUp size={13} className="text-sky-400" />
                </div>
                <h2 className="text-sm font-semibold text-slate-200">Strong points</h2>
              </div>

              <div className="space-y-5">
                {strongPoints.length === 0 ? (
                  <p className="text-sm text-slate-500">
                    No strong areas yet. Keep practicing to build mastery.
                  </p>
                ) : (
                  strongPoints.map((item, index) => (
                    <div key={item.tpc_id || `${item.topic}-${index}`} className="space-y-2">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{item.topic || "Topic"}</p>
                          <p className="text-xs text-slate-500">{item.skill}</p>
                        </div>
                        <span className="text-xs font-semibold text-emerald-300 tabular-nums">{item.score}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      {index < strongPoints.length - 1 && <div className="border-t border-slate-800 pt-1" />}
                    </div>
                  ))
                )}
              </div>
            </article>
          </div>

          <div className="space-y-6">
            <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="relative">
                <div className="mb-5">
                  <h2 className="text-sm font-semibold text-slate-200">Skill progress</h2>
                  <p className="mt-0.5 text-xs text-slate-500">Completion % per enrolled skill</p>
                </div>
                <ProgressChart data={chartData} />
              </div>
            </article>

            <div className="xl:sticky xl:top-28">
              <LeaderboardPanel entries={leaderboardEntries} currentStudentId={currentStudentId} />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
