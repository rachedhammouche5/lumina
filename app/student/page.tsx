import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import Button from "@/app/ui/Button";
import { BookOpen, ChevronRight, Sparkles } from "lucide-react";

export default async function studentPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) {
    console.error("Auth error :", error.message);
    redirect("/");
  }
  if (!user) {
    redirect("/");
  }
   const studentName =
    (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
    (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
    (typeof user.email === "string" && user.email.split("@")[0]) ||
    "Student";

  const role = getRole(user);
  if (role !== "student") {
    redirect("/");
  }

  const progressCards = [
    { title: "Advance Python for Data Science", subtitle: "8 hours studied", progress: 40, tone: "blue" },
    { title: "Domain Title", subtitle: "12 hours studied", progress: 55, tone: "amber" },
    { title: "Domain Title", subtitle: "5 hours studied", progress: 20, tone: "indigo" },
    { title: "Domain Title", subtitle: "18 hours studied", progress: 80, tone: "rose" },
  ] as const;

  const cardStyles = {
    blue: {
      wrap: "from-blue-600/30 to-slate-900/80 border-blue-300/30",
      bar: "from-blue-500 to-cyan-300",
    },
    amber: {
      wrap: "from-orange-500/30 to-slate-900/80 border-orange-300/30",
      bar: "from-orange-500 to-amber-300",
    },
    indigo: {
      wrap: "from-indigo-500/30 to-slate-900/80 border-indigo-300/30",
      bar: "from-indigo-500 to-blue-300",
    },
    rose: {
      wrap: "from-rose-500/30 to-slate-900/80 border-rose-300/30",
      bar: "from-rose-500 to-orange-300",
    },
  } as const;

  
  return (
    
    <main className="min-h-screen bg-slate-950 pt-24 pb-20 px-4 sm:px-6 text-white">
      
      <div className="w-full max-w-6xl mx-auto space-y-8">
 <div>
            <h1 className=" text-xl  text-white/70 mt-1 text-2xl md:text-3xl font-black tracking-tight">Welcome back, {studentName} 👋</h1>
          </div>
        <section className="space-y-4">
          <article className="relative border border-orange-200/30 rounded-[26px] p-5 md:p-6 bg-gradient-to-br from-orange-200/20 via-orange-400/10 to-slate-900/60 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,164,84,0.35),transparent_45%)]" />
            <div className="relative z-10 flex flex-col md:flex-row gap-5 md:items-center">
              <div className="flex-1">
                <h2 className="text-xl md:text-2xl font-black tracking-tight">Continue Where You Left Off</h2>
                <p className="text-xs uppercase tracking-widest text-white/60 mt-1">Domain Title / Subdomain Title</p>
                <div className="mt-4 flex items-center gap-3">
                  <Button variant="primary" size="m" className="rounded-xl">
                    Resume Learning <ChevronRight size={16} className="ml-1" />
                  </Button>
                  <div className="h-2.5 flex-1 rounded-full bg-slate-800/80">
                    <div className="h-2.5 w-[65%] rounded-full bg-gradient-to-r from-orange-500 to-amber-300" />
                  </div>
                </div>
              </div>

              <div className="md:w-[210px] h-[110px] rounded-2xl border border-orange-100/30 bg-orange-200/10 flex items-center justify-center relative">
                <BookOpen className="text-orange-300" size={54} />
                <span className="absolute -top-3 -right-3 h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-300 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-orange-500/30">
                  65%
                </span>
              </div>
            </div>
          </article>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Sparkles className="text-orange-400" size={18} />
            <h2 className="text-xl md:text-2xl font-black tracking-tight flex-1 ml-2">Enrolled Skills</h2>
            <Button href="/skills" variant="ghost" className="text-sm text-white/70 hover:text-white">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {progressCards.map((card, index) => (
              <article
                key={`${card.title}-${index}`}
                className={`rounded-2xl border bg-gradient-to-br p-4 flex flex-col min-h-[220px] ${cardStyles[card.tone].wrap}`}
              >
                <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/20 mb-4" />
                <div className="flex-1">
                  <h3 className="font-bold leading-snug line-clamp-2">{card.title}</h3>
                  <p className="text-xs text-white/60 mt-2">{card.subtitle}</p>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="h-2 rounded-full bg-slate-900/70">
                    <div className={`h-2 rounded-full bg-gradient-to-r ${cardStyles[card.tone].bar}`} style={{ width: `${card.progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Button variant="outline" size="s" className="text-xs px-3 py-1.5 rounded-lg border-white/30">
                      Continue
                    </Button>
                    <span className="text-sm font-bold">{card.progress}%</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )}
