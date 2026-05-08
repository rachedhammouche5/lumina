import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { Flame, BookCheck, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProgressChart from "./_components/ProgressChart";
import LeaderboardPanel, { type LeaderboardEntry } from "./_components/LeaderboardPanel";

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
    .select("std_streak, std_id, std_last_activeDate")
    .eq("user_id", user.id)
    .single();

  const [{ count: completedSkills }, { data: scores }, { data: enrolled }] = await Promise.all([
    supabase
      .from("enroll")
      .select("*", { count: "exact", head: true })
      .eq("student_id", student?.std_id ?? "")
      .eq("progress", 100),
    supabase
      .from("score")
      .select("score, tpc_id, Topic(tpc_title, skill_id, Skill(skl_id, skl_title))")
      .eq("studentId", student?.std_id ?? ""),
    supabase
      .from("enroll")
      .select("progress, Skill(skl_title)")
      .eq("student_id", student?.std_id ?? ""),
  ]);

  const streak = student?.std_streak ?? 0;
  const skills = completedSkills ?? 0;

  const mapScore = (s: any) => ({
    tpc_id: s.tpc_id as string,
    topic: s.Topic?.tpc_title ?? "",
    skill: s.Topic?.Skill?.skl_title ?? "",
    score: Math.round(s.score),
    href: `/skills/${s.Topic?.skill_id}/${s.tpc_id}`,
  });

  const weakPoints = (scores ?? [])
    .filter((s) => s.score < 70)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map(mapScore);

  const strongPoints = (scores ?? [])
    .filter((s) => s.score >= 70)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(mapScore);

  const chartData = (enrolled ?? []).map((e: any) => ({
    name: (e.Skill?.skl_title as string)?.slice(0, 14) || "Skill",
    score: Math.round(e.progress),
  }));

  const studentName =
    (typeof student?.std_fullname === "string" && student.std_fullname.trim()) ||
    (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
    (typeof user.email === "string" && user.email.split("@")[0]) ||
    "Student";

  const leaderboardEntries = buildLeaderboard(
    (allStudentsData ?? []) as { std_id: string; std_fullname: string; std_pfp: string | null }[],
    (allScoresData ?? []) as { studentId: string; score: number }[],
    currentStudentId,
    studentName,
    student?.std_pfp ?? null,
  );

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6">
      <div className="w-full max-w-5xl mx-auto space-y-7">

        {/* Header */}
        <header className="space-y-1">
          <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Dashboard</p>
          <h1 className="text-2xl font-bold text-white">My Learning</h1>
          <p className="text-sm text-slate-400">
            Welcome back,{" "}
            <span className="font-semibold text-orange-400">{studentName}</span>
          </p>
        </header>

        {/* Stat cards */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <article className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 flex items-start gap-4">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-orange-500/8 rounded-full pointer-events-none" />
            <div className="shrink-0 w-10 h-10 rounded-xl bg-orange-500/15 border border-orange-500/25 flex items-center justify-center">
              <Flame size={18} className="text-orange-400" />
            </div>
            <div className="relative">
              <p className="text-xs font-medium text-slate-500 mb-0.5">Current streak</p>
              <p className="text-2xl font-bold text-white">
                    {streak} {streak === 1 ? "day" : "days"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {streak === 0 ? "Study today to start your streak!" : "Keep learning today"}
              </p>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 flex items-start gap-4">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-sky-500/8 rounded-full pointer-events-none" />
            <div className="shrink-0 w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center">
              <TrendingUp size={18} className="text-sky-400" />
            </div>
            <div className="relative">
              <p className="text-xs font-medium text-slate-500 mb-0.5">Strong topics</p>
              <p className="text-2xl font-bold text-white">{strongPoints.length}</p>
              <p className="text-xs text-slate-500 mt-0.5">
                {strongPoints.length === 0 ? "Take quizzes to track progress!" : "Topics scored ≥ 70%"}
              </p>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-5 flex items-start gap-4">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-violet-500/8 rounded-full pointer-events-none" />
            <div className="shrink-0 w-10 h-10 rounded-xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center">
              <BookCheck size={18} className="text-violet-400" />
            </div>
            <div className="relative">
              <p className="text-xs font-medium text-slate-500 mb-0.5">Skills completed</p>
              <p className="text-2xl font-bold text-white">
                {skills} {skills === 1 ? "skill" : "skills"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {skills === 0 ? "Complete your first skill!" : "Keep it up!"}
              </p>
            </div>
          </article>
        </section>

            <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 flex items-start gap-4 sm:p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-sky-500/8 rounded-full pointer-events-none" />
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-500/25 bg-sky-500/15">
                <Award size={18} className="text-sky-400" />
              </div>
              <div className="relative">
                <p className="mb-0.5 text-xs font-medium text-slate-500">Badges earned</p>
                <p className="text-xl font-bold text-white sm:text-2xl">8 badges</p>
                <p className="text-xs text-slate-500 mt-0.5">Latest: Consistent Learner</p>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-4 flex items-start gap-4 sm:p-5">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-transparent pointer-events-none" />
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-violet-500/8 rounded-full pointer-events-none" />
              <div className="shrink-0 flex h-10 w-10 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/15">
                <BookCheck size={18} className="text-violet-400" />
              </div>
              <h2 className="text-sm font-semibold text-slate-200">Weak points</h2>
            </div>
            <div className="space-y-5">
              {weakPoints.length === 0 ? (
                <p className="text-sm text-slate-500">No weak areas yet — take some quizzes to get personalized feedback!</p>
              ) : weakPoints.map((item, i) => (
                <div key={item.tpc_id ?? item.topic}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.topic || "Topic"}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.skill}</p>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-rose-600 to-rose-400"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 mt-2.5 text-xs font-semibold text-sky-400 hover:text-sky-300 transition-colors group"
                    >
                      Study this topic
                      <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                    {i < weakPoints.length - 1 && (
                    <div className="mt-4 border-t border-slate-800 sm:mt-5" />
                    )}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={13} className="text-emerald-400" />
                </div>
                <h2 className="text-sm font-semibold text-slate-200">Strong points</h2>
              </div>
              <h2 className="text-sm font-semibold text-slate-200">Strong points</h2>
            </div>
            <div className="space-y-5">
              {strongPoints.length === 0 ? (
                <p className="text-sm text-slate-500">No strong areas yet — keep practicing to build mastery!</p>
              ) : strongPoints.map((item, i) => (
                <div key={item.tpc_id ?? item.topic}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-white">{item.topic || "Topic"}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.skill}</p>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                    {i < strongPoints.length - 1 && (
                    <div className="mt-4 border-t border-slate-800 sm:mt-5" />
                    )}
                  </div>
                  {i < strongPoints.length - 1 && (
                    <div className="mt-5 border-t border-slate-800" />
                  )}
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* Progress chart */}
        <section className="relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 p-6">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative">
            <div className="mb-5">
              <h2 className="text-sm font-semibold text-slate-200">Skill progress</h2>
              <p className="text-xs text-slate-500 mt-0.5">Completion % per enrolled skill</p>
            </div>
            <ProgressChart data={chartData} />
          </div>
        </section>

        <div className="h-fit xl:sticky xl:top-28">
          <LeaderboardPanel entries={leaderboardEntries} currentStudentId={currentStudentId} />
        </div>
      </div>
    </main>
  );
}

function buildLeaderboard(
  students: { std_id: string; std_fullname: string; std_pfp: string | null }[],
  scores: { studentId: string; score: number }[],
  currentStudentId: string,
  currentStudentName: string,
  currentStudentPfp: string | null,
): LeaderboardEntry[] {
  const pointsByStudent = new Map<string, number>();

  scores.forEach((row) => {
    pointsByStudent.set(row.studentId, (pointsByStudent.get(row.studentId) ?? 0) + row.score);
  });

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
