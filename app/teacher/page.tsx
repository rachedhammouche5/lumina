import Link from "next/link";
import { redirect } from "next/navigation";
import { BarChart3, BookOpenCheck, GraduationCap, Sparkles, Star, Users } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AnimatedStatNumber from "./AnimatedStatNumber";
import { getTeacherHomeData } from "./actions/home";

function formatRelativeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";

  const diffMs = Date.now() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default async function TeacherPage() {
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) redirect("/");
  const homeData = await getTeacherHomeData(user.id);
  if (!homeData) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/90 p-8 text-center">
          <h1 className="text-2xl font-semibold text-white">Teacher profile not found</h1>
          <p className="mt-2 text-slate-400">Please complete your teacher profile to access the home dashboard.</p>
        </div>
      </section>
    );
  }
  const currentHour = new Date().getHours();
  const dayGreeting =
    currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-28 sm:px-6 lg:px-8 lg:pb-7">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-700 via-slate-950 to-transparent p-5 shadow-2xl shadow-slate-700/70 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                <Sparkles size={14} />
                Teacher Home
              </p>
              <h1 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-4xl">
                {dayGreeting},{" "}
                <span className="block text-3xl uppercase text-transparent bg-linear-to-br from-orange-300 to-orange-600 bg-clip-text sm:inline sm:text-5xl">
                  {homeData.teacherName}
                </span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                Your space is ready: track activity, grow your skills, and keep learners engaged with polished content.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <Link href="/teacher/skills" className="rounded-xl bg-linear-to-br from-orange-400 to-orange-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-linear-0 from-orange-200 to-orange-200 hover:shadow-xl shadow-orange-400/30 sm:py-2">
                Manage Skills
              </Link>
              <Link href="/teacher/dashboard" className="rounded-xl border border-slate-600 bg-linear-to-br from-slate-500 to-transparent px-4 py-3 text-center text-sm font-semibold text-slate-100 transition hover:bg-slate-700 sm:py-2">
                Open Analytics
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-600 via-slate-950 to-transparent shadow-2xl shadow-slate-700/70 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Skills</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                <AnimatedStatNumber value={homeData.skillsCount} />
              </p>
              <BookOpenCheck className="text-cyan-300" size={18} />
            </div>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-600 via-slate-950 to-transparent shadow-2xl shadow-slate-700/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Topics</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                <AnimatedStatNumber value={homeData.topicsCount} />
              </p>
              <BarChart3 className="text-violet-300" size={18} />
            </div>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-600 via-slate-950 to-transparent shadow-2xl shadow-slate-700/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Quiz Questions</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                <AnimatedStatNumber value={homeData.quizzesCount} />
              </p>
              <GraduationCap className="text-emerald-300" size={18} />
            </div>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-600 via-slate-950 to-transparent shadow-2xl shadow-slate-700/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Active Learners</p>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-2xl font-bold text-white sm:text-3xl">
                <AnimatedStatNumber value={homeData.activeLearnersCount} />
              </p>
              <Users className="text-orange-300" size={18} />
            </div>
          </article>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-3xl border border-slate-700 bg-linear-to-br from-slate-700/80 via-slate-950 via-slate-800 to-transparent p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Last Activity</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Recent feedback
              </span>
            </div>

            {homeData.lastActivities.length > 0 ? (
              <ul className="space-y-3">
                {homeData.lastActivities.map((activity) => (
                  <li key={activity.id} className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-transparent p-4 shadow-2xl shadow-slate-950">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-white">{activity.skillTitle}</p>
                      <p className="text-xs text-slate-400">{formatRelativeDate(activity.time)}</p>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      by {activity.studentName}
                    </p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-300">
                      {activity.comment || "A student left a rating without a comment."}
                    </p>
                    <p className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-amber-300">
                      <Star size={12} /> {activity.rating}/5
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/80 p-6 text-center text-slate-400">
                No activity yet. Once students interact with your skills, updates will appear here.
              </div>
            )}
          </article>

          <article className="rounded-3xl border border-slate-700 bg-linear-to-br from-slate-800 via-slate-950 to-transparent p-5">
            <h2 className="text-xl font-semibold text-white">Snapshot</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-transparent shadow-2xl shadow-black/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Teaching Hours</p>
                <p className="mt-1 text-2xl font-bold text-white">
                  <AnimatedStatNumber value={homeData.totalHours} suffix="h" />
                </p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-transparent shadow-2xl shadow-black/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Latest Avg Rating</p>
                <p className="mt-1 text-2xl font-bold text-amber-300">{homeData.avgRating}</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-transparent shadow-2xl shadow-black/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Focus Today</p>
                <p className="mt-1 text-sm text-slate-300">
                  Add one quiz question for each skill to keep momentum high.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
