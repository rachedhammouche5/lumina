import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import Button from "@/app/ui/Button";
import { Award, Flame, Target, TrendingUp, TrendingDown } from "lucide-react";
import { BookCheck } from "lucide-react"; // add to imports
import ProgressChart from "./_components/ProgressChart";
const progressData = [
  { week: "Week 1", score: 58 },
  { week: "Week 2", score: 63 },
  { week: "Week 3", score: 70 },
  { week: "Week 4", score: 76 },
];
const weakPoints = [
  { skill: "Python for Data Science", topic: "Pandas GroupBy", score: 48 },
  { skill: "Modern Backend Systems", topic: "JWT Refresh Flow", score: 52 },
  { skill: "Debugging Techniques", topic: "Race Conditions", score: 45 },
] as const;

const strongPoints = [
  { skill: "Python for Data Science", topic: "Data Cleaning", score: 91 },
  { skill: "SQL for Developers", topic: "Joins & Aggregation", score: 88 },
  { skill: "Product Thinking Basics", topic: "User Stories", score: 94 },
] as const;

const skillTopicScores = [
  {
    skill: "Python for Data Science",
    topics: [
      { name: "NumPy Basics", score: 86 },
      { name: "Pandas GroupBy", score: 48 },
      { name: "Visualization", score: 74 },
    ],
  },
  {
    skill: "Modern Backend Systems",
    topics: [
      { name: "API Design", score: 81 },
      { name: "JWT Refresh Flow", score: 52 },
      { name: "Caching", score: 69 },
    ],
  },
] as const;

export default async function StudentDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/");
  }

  const role = getRole(user);
  if (role !== "student") {
    redirect("/");
  }

  const studentName =
    (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
    (typeof user.email === "string" && user.email.split("@")[0]) ||
    "Student";

  return (
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 text-white">
      <div className="w-full max-w-6xl mx-auto space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight">My Learning Dashboard</h1>
          <p className="text-white/70">Track streaks, badges, weak points, strong points, and topic-level skill scores for {studentName}.</p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <article className="rounded-2xl border border-orange-300/25 bg-gradient-to-br from-orange-400/20 to-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-white/60">Current Streak</h2>
              <Flame className="text-orange-300" size={18} />
            </div>
            <p className="mt-3 text-3xl font-black">12 days</p>
            <p className="text-sm text-white/70 mt-1">Keep learning today to maintain it.</p>
          </article>

          <article className="rounded-2xl border border-blue-300/25 bg-gradient-to-br from-blue-500/20 to-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-white/60">Badges Earned</h2>
              <Award className="text-blue-300" size={18} />
            </div>
            <p className="mt-3 text-3xl font-black">8 badges</p>
            <p className="text-sm text-white/70 mt-1">Latest: Consistent Learner.</p>
          </article>


          <article className="rounded-2xl border border-violet-300/25 bg-gradient-to-br from-violet-500/20 to-slate-900/80 p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-widest text-white/60">Courses Completed</h2>
              <BookCheck className="text-violet-300" size={18} />
            </div>
            <p className="mt-3 text-3xl font-black">5 courses</p>
            <p className="text-sm text-white/70 mt-1">+2 this month.</p>
          </article>
        </section>
        <section className="rounded-3xl border border-white/10 bg-slate-900/50 p-6">
  <div className="mb-4">
    <h2 className="text-xl font-black">Progress Over Time</h2>
    <p className="text-sm text-white/60 mt-1">Average topic score per week</p>
  </div>
  <ProgressChart />
</section>
        

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="rounded-3xl border border-rose-300/20 bg-slate-900/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingDown className="text-rose-300" size={18} />
              <h2 className="text-xl font-black">Weak Points by Topic</h2>
            </div>
            <div className="space-y-3">
              {weakPoints.map((item) => (
                <div key={`${item.skill}-${item.topic}`} className="rounded-xl border border-white/10 bg-slate-950/60 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{item.topic}</p>
                    <p className="text-xs text-white/60 mt-1">{item.skill}</p>
                  </div>
                  <span className="text-rose-300 font-black">{item.score}%</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-3xl border border-emerald-300/20 bg-slate-900/50 p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-emerald-300" size={18} />
              <h2 className="text-xl font-black">Strong Points by Topic</h2>
            </div>
            <div className="space-y-3">
              {strongPoints.map((item) => (
                <div key={`${item.skill}-${item.topic}`} className="rounded-xl border border-white/10 bg-slate-950/60 p-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{item.topic}</p>
                    <p className="text-xs text-white/60 mt-1">{item.skill}</p>
                  </div>
                  <span className="text-emerald-300 font-black">{item.score}%</span>
                </div>
              ))}
              
            </div>
          </article>
        </section>
       

        
      </div>
    </main>
  );
}