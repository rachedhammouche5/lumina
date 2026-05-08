import Link from "next/link";
import { getTeacherDashboardData } from "@/app/actions/teacherGlobalDashboard";
import BaseAreaChart from "@/app/ui/teacherDashboard/chart/BaseAreaChart";
import ChartContainer from "@/app/ui/teacherDashboard/chart/container";
import GeneralCards from "@/app/ui/teacherDashboard/generalCards";
import { Suspense } from "react";

export default async function TeacherDashboardPage() {
  const stats = await getTeacherDashboardData();
  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-slate-400">Loading teacher data...</p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-28 sm:px-6 lg:px-8 lg:pb-8">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-700 via-slate-950 to-transparent p-6 shadow-2xl shadow-slate-700/60 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                Teacher Analytics
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Dashboard for{" "}
                <span className="block bg-linear-to-br from-orange-300 to-orange-600 bg-clip-text text-4xl uppercase text-transparent sm:inline sm:text-5xl">
                  {stats.teacherName}
                </span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                Track course activity, learner momentum, and review trends from one calm overview.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link
                href="/teacher"
                className="rounded-xl border border-slate-600 bg-linear-to-br from-slate-500 to-transparent px-4 py-3 text-center text-sm font-semibold text-slate-100 transition hover:bg-slate-700 sm:py-2"
              >
                Teacher Home
              </Link>
              <Link
                href="/teacher/skills"
                className="rounded-xl bg-linear-to-br from-orange-400 to-orange-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-orange-400/30 transition hover:shadow-xl sm:py-2"
              >
                Open Skills
              </Link>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="h-32 animate-pulse rounded-3xl border border-slate-700 bg-slate-900/80" />}>
          <GeneralCards stats={stats} />
        </Suspense>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-linear-to-br from-slate-700/80 via-slate-950 to-transparent p-4 shadow-2xl shadow-slate-900/40 lg:col-span-2 sm:p-5">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent" />
            <div className="w-full">
              <ChartContainer title="Engagement by Skill" subtitle="Students, likes, comments, and interactions">
                <BaseAreaChart data={stats.chartData} />
              </ChartContainer>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-3xl border border-slate-700 bg-linear-to-br from-slate-700/80 via-slate-950 to-transparent p-4 shadow-2xl shadow-slate-900/40 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h4 className="font-semibold text-white">Top Performers</h4>
              <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                {stats.totalStudents} students
              </span>
            </div>
            <div className="space-y-3 overflow-auto pr-1">
              {stats.topPerformers.length ? (
                stats.topPerformers.map((student) => (
                  <div key={student.id} className="rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-2xl shadow-black/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-orange-500/20 bg-gradient-to-br from-orange-500/30 to-slate-700 font-bold text-white">
                        {student.name
                          .split(" ")
                          .map((part) => part[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-white">{student.name}</p>
                        <p className="text-xs capitalize text-slate-500">
                          {student.level} · {student.reviews} reviews · {student.streak} day streak
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="tabular-nums font-bold text-orange-400">{student.avgScore}%</p>
                        <p className="text-xs text-slate-500">{student.progress}% progress</p>
                      </div>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
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

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.skillInsights.slice(0, 3).map((skill) => (
            <article key={skill.id} className="rounded-3xl border border-slate-700 bg-linear-to-br from-slate-700/80 via-slate-950 to-transparent p-5 shadow-2xl shadow-slate-900/30">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Skill overview</p>
              <h4 className="mt-2 text-lg font-semibold text-white">{skill.title}</h4>
              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3">
                  <p className="text-xs text-slate-500">Students</p>
                  <p className="mt-1 text-xl font-bold text-white">{skill.students}</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3">
                  <p className="text-xs text-slate-500">Score</p>
                  <p className="mt-1 text-xl font-bold text-cyan-300">{skill.avgScore}%</p>
                </div>
                <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-3">
                  <p className="text-xs text-slate-500">Reviews</p>
                  <p className="mt-1 text-xl font-bold text-orange-300">{skill.reviews}</p>
                </div>
              </div>
            </article>
          ))}
        </section>

      </div>
    </section>
  );
}
