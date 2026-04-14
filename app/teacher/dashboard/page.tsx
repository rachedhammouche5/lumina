import { getTeacherDashboardData } from "@/app/actions/teacherGlobalDashboard";
import BaseAreaChart from "@/app/ui/teacherDashboard/chart/BaseAreaChart";  
import ChartContainer from "@/app/ui/teacherDashboard/chart/container";
import GeneralCards from "@/app/ui/teacherDashboard/generalCards";
import { Suspense } from "react";

export default async function TeacherDashboardPage() {
  const stats = await getTeacherDashboardData();
  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617]">
        <p className="text-slate-400">Loading teacher data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pb-20">
      

      {/* 2. Main Content Area */}
      <main className="w-screen mx-auto px-6 pt-12">
        
        {/* Header Section */}
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Teacher <span className="text-orange-500">Dashboard</span>
          </h2>
          <p className="text-slate-500 mt-2 text-lg">
            Welcome back, <span className="text-white font-semibold">{stats.teacherName}</span>.
          </p>
          <p className="text-slate-500 mt-1 text-sm">
            Your dashboard is powered by live course, score, review, and enrollment data.
          </p>
        </header>

        <Suspense fallback={<div className="h-32 bg-white/5 animate-pulse rounded-3xl" />}>
          <GeneralCards stats={stats} />
        </Suspense>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[400px] bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
            <div className="w-full">
              <ChartContainer title="Engagement by Skill" subtitle="Students, likes, comments, and interactions">
                <BaseAreaChart data={stats.chartData} />
              </ChartContainer>
            </div>
          </div>

          <div className="lg:col-span-1 h-[400px] bg-white/5 border border-white/10 rounded-[2.5rem] p-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold">Top Performers</h4>
              <span className="text-xs uppercase tracking-[0.25em] text-slate-500">{stats.totalStudents} students</span>
            </div>
            <div className="space-y-4 overflow-auto pr-1">
              {stats.topPerformers.length ? (
                stats.topPerformers.map((student) => (
                  <div key={student.id} className="rounded-2xl bg-white/[0.02] border border-white/5 p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500/30 to-slate-700 border border-white/10 flex items-center justify-center text-white font-bold">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-white font-semibold truncate">{student.name}</p>
                        <p className="text-xs text-slate-500 capitalize">
                          {student.level} · {student.reviews} reviews · {student.streak} day streak
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-orange-400 font-bold tabular-nums">{student.avgScore}%</p>
                        <p className="text-xs text-slate-500">{student.progress}% progress</p>
                      </div>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-300"
                        style={{ width: `${Math.min(student.progress, 100)}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-slate-500">
                      Last active {new Date(student.lastActive).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-500">No students matched this teacher yet.</p>
              )}
            </div>
          </div>
        </div>

        <section className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.skillInsights.slice(0, 3).map((skill) => (
            <article key={skill.id} className="rounded-[2rem] bg-white/5 border border-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Skill overview</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{skill.title}</h4>
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-black/20 border border-white/5 p-3">
                  <p className="text-xs text-slate-500">Students</p>
                  <p className="mt-1 text-xl font-bold text-white">{skill.students}</p>
                </div>
                <div className="rounded-2xl bg-black/20 border border-white/5 p-3">
                  <p className="text-xs text-slate-500">Score</p>
                  <p className="mt-1 text-xl font-bold text-cyan-300">{skill.avgScore}%</p>
                </div>
                <div className="rounded-2xl bg-black/20 border border-white/5 p-3">
                  <p className="text-xs text-slate-500">Reviews</p>
                  <p className="mt-1 text-xl font-bold text-orange-300">{skill.reviews}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

      </main>
    </div>
  );
}
