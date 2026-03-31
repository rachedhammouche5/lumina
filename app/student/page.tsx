import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import Button from "@/app/ui/Button";
import CourseCard from "@/app/ui/Skills/CourseCard";
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

  const { data: recommendedSkillsData, error: recommendedSkillsError } = await supabase
    .from("Skill")
    .select("skl_id, skl_title, skl_dscrptn")
    .order("skl_title", { ascending: true })
    .limit(6);

  if (recommendedSkillsError) {
    console.error("[student] Failed to load recommended skills:", recommendedSkillsError.message);
  }

  const recommendedSkills =
    recommendedSkillsData?.map((skill) => ({
      id: skill.skl_id,
      title: skill.skl_title,
      description: skill.skl_dscrptn ?? "No description yet.",
    })) ?? [];

  const { data: student, error: studentError } = await supabase
    .from("Student")
    .select("std_id")
    .or(`user_id.eq.${user.id},std_id.eq.${user.id}`)
    .maybeSingle();

  if (studentError) {
    console.error("[student] Failed to load student record:", studentError.message);
  }

  const studentId = student?.std_id ?? user.id;

  const enrollSelect = "progress, Skill ( skl_id, skl_title, skl_dscrptn, skl_duration )";

  const fetchEnrollments = async (studentColumn: "studentId" | "student_id") =>
    supabase
      .from("enroll")
      .select(enrollSelect)
      .eq(studentColumn, studentId)
      .order("progress", { ascending: false });

  let { data: enrolledSkillsData, error: enrolledSkillsError } = await fetchEnrollments("studentId");

  if (enrolledSkillsError?.message?.includes("studentId")) {
    ({ data: enrolledSkillsData, error: enrolledSkillsError } = await fetchEnrollments("student_id"));
  }

  if (enrolledSkillsError) {
    console.error("[student] Failed to load enrolled skills:", enrolledSkillsError.message);
  }

  const tones = ["blue", "amber", "indigo", "rose"] as const;

  const enrolledSkills =
    enrolledSkillsData?.map((row, index) => {
      const rawSkill = (row as { Skill?: { skl_id?: string; skl_title?: string; skl_duration?: number } | null }).Skill;
      const skill = Array.isArray(rawSkill) ? rawSkill[0] : rawSkill;
      const progressValue = typeof row.progress === "number" ? Math.max(0, Math.min(100, row.progress)) : 0;
      const duration = typeof skill?.skl_duration === "number" ? skill.skl_duration : null;
      const studiedHours = duration !== null ? Math.round((progressValue / 100) * duration) : null;

      return {
        id: skill?.skl_id ?? `${index}`,
        title: skill?.skl_title ?? "Untitled skill",
        subtitle: studiedHours !== null ? `${studiedHours} hours studied` : "In progress",
        progress: progressValue,
        tone: tones[index % tones.length],
      };
    }) ?? [];

  const cardStyles = {
    blue: {
      wrap: "from-slate-950/80 via-slate-900/90 to-blue-950/60 border-blue-500/20",
      bar: "from-blue-700 to-blue-500",
    },
    amber: {
      wrap: "from-slate-950/80 via-slate-900/90 to-amber-950/60 border-amber-500/20",
      bar: "from-amber-700 to-amber-500",
    },
    indigo: {
      wrap: "from-slate-950/80 via-slate-900/90 to-indigo-950/60 border-indigo-500/20",
      bar: "from-indigo-700 to-indigo-500",
    },
    rose: {
      wrap: "from-slate-950/80 via-slate-900/90 to-rose-950/60 border-rose-500/20",
      bar: "from-rose-700 to-rose-500",
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
          </div>

          {enrolledSkills.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {enrolledSkills.map((card, index) => (
                <article
                  key={`${card.id}-${index}`}
                  className={`rounded-2xl border bg-gradient-to-br p-4 flex flex-col min-h-[220px] ${cardStyles[card.tone].wrap}`}
                >
                  <div className="w-full aspect-[5/2] rounded-2xl mb-4 bg-white/10 border border-white/20" />
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
          ) : (
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-sm text-white/70">
              No enrolled skills yet. Pick a recommendation to get started.
            </div>
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <Sparkles className="text-orange-400" size={18} />
            <h2 className="text-xl md:text-2xl font-black tracking-tight flex-1 ml-2">Recommended Skills</h2>
            
          </div>

          {recommendedSkills.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedSkills.map((skill) => (
                <CourseCard
                  key={skill.id}
                  id={skill.id}
                  title={skill.title}
                  description={skill.description}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-6 text-sm text-white/70">
              No recommendations yet. Explore the catalog to find skills you love.
            </div>
          )}
        </section>
      </div>
    </main>
  )}
