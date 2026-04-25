import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { Award, Flame, BookCheck, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import ProgressChart from "./_components/ProgressChart";
import LeaderboardPanel, { type LeaderboardEntry } from "./_components/LeaderboardPanel";

const weakPoints = [
  { skill: "Python", topic: "Pandas GroupBy", score: 48, href: "/courses/python-data-science/pandas-groupby" },
  { skill: "Modern Backend Systems", topic: "JWT Refresh Flow", score: 52, href: "/courses/backend-systems/jwt-refresh" },
  { skill: "Debugging Techniques", topic: "Race Conditions", score: 45, href: "/courses/debugging/race-conditions" },
] as const;

const strongPoints = [
  { skill: "Python for Data Science", topic: "Data Cleaning", score: 91 },
  { skill: "SQL for Developers", topic: "Joins & Aggregation", score: 88 },
  { skill: "Product Thinking Basics", topic: "User Stories", score: 94 },
] as const;

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
    .select("std_streak,std_id,std_fullname,std_pfp,std_last_activeDate")
    .or(`user_id.eq.${user.id},std_id.eq.${user.id}`)
    .maybeSingle();

  const currentStudentId = student?.std_id ?? user.id;
  const { count: completedSkills } = await supabase
    .from("enroll")
    .select("*", { count: "exact", head: true })
    .eq("student_id", currentStudentId)
    .eq("progress", 100);

  const [{ data: allStudentsData }, { data: allScoresData }] = await Promise.all([
    supabase.from("Student").select("std_id,std_fullname,std_pfp"),
    supabase.from("score").select("studentId,score"),
  ]);

  const streak = student?.std_streak ?? 0;
  const skills = completedSkills ?? 0;

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
    <main className="relative min-h-screen overflow-hidden bg-slate-950 pt-24 pb-20 px-4 sm:px-6 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{ backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)", backgroundSize: "30px 30px" }}
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-6 xl:grid-cols-[minmax(0,1fr)_390px]">
        <div className="space-y-7">
          {/* Header */}
          <header className="space-y-1">
            <p className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Dashboard</p>
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
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
                <Award size={18} className="text-sky-400" />
              </div>
              <div className="relative">
                <p className="text-xs font-medium text-slate-500 mb-0.5">Badges earned</p>
                <p className="text-2xl font-bold text-white">8 badges</p>
                <p className="text-xs text-slate-500 mt-0.5">Latest: Consistent Learner</p>
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
                  {skills === 0 ? "Complete your first skill!" : "+2 this month"}
                </p>
                <p className="text-xs text-emerald-400 font-semibold mt-0.5">+2 this month</p>
              </div>
            </article>
          </section>

          {/* Weak & Strong points */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <article className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/20 flex items-center justify-center">
                  <TrendingDown size={13} className="text-rose-400" />
                </div>
                <h2 className="text-sm font-semibold text-slate-200">Weak points</h2>
              </div>
              <div className="space-y-5">
                {weakPoints.map((item, i) => (
                  <div key={item.topic}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.topic}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.skill}</p>
                      </div>
                      <span className="text-sm font-bold text-rose-400 tabular-nums">{item.score}%</span>
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
                      <div className="mt-5 border-t border-slate-800" />
                    )}
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-2xl bg-slate-900 border border-slate-800 p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                  <TrendingUp size={13} className="text-emerald-400" />
                </div>
                <h2 className="text-sm font-semibold text-slate-200">Strong points</h2>
              </div>
              <div className="space-y-5">
                {strongPoints.map((item, i) => (
                  <div key={item.topic}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm font-semibold text-white">{item.topic}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.skill}</p>
                      </div>
                      <span className="text-sm font-bold text-emerald-400 tabular-nums">{item.score}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                        style={{ width: `${item.score}%` }}
                      />
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
                <h2 className="text-sm font-semibold text-slate-200">Progress over time</h2>
                <p className="text-xs text-slate-500 mt-0.5">Average topic score per week</p>
              </div>
              <ProgressChart />
            </div>
          </section>
        </div>

        <div className="xl:sticky xl:top-28 h-fit">
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
