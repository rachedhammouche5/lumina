import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Skill } from "@/lib/database.types";
import SkillsHeader from "./SkillsHeader";
import SkillCard from "./SkillCard";

export default async function TeacherCoursesPage() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) redirect("/");

  const { data: teacher } = await supabase
    .from("Teacher")
    .select("tchr_id")
    .eq("user_id", user.id)
    .single();

  if (!teacher?.tchr_id) {
    return (
      <div className="min-h-screen min-w-full bg-slate-950 text-white flex items-center justify-center py-24 px-6">
        <div className="rounded-3xl border border-slate-700 bg-slate-900 p-10 text-center shadow-xl">
          <h1 className="text-2xl font-semibold">Teacher profile not found</h1>
          <p className="mt-3 text-slate-400">Please complete your teacher account or contact support.</p>
        </div>
      </div>
    );
  }

  const { data } = await supabase
    .from("Skill")
    .select("*")
    .eq("teacher_id", teacher.tchr_id);

  const skills: Skill[] = data ?? [];
  const totalDuration = skills.reduce((sum, skill) => sum + (skill.skl_duration ?? 0), 0);

  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-28 sm:px-6 lg:px-8 lg:pb-8">
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-700 via-slate-950 to-transparent p-6 shadow-2xl shadow-slate-700/60 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-600/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-500">
                Teacher Skills
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Manage your{" "}
                <span className="block bg-linear-to-br from-orange-300 to-orange-600 bg-clip-text text-4xl uppercase text-transparent sm:inline sm:text-5xl">
                  skills library
                </span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                Build clean roadmaps, keep quizzes close to each skill, and stay organized on mobile or desktop.
              </p>
            </div>
            <SkillsHeader teacher_id={teacher.tchr_id} />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-600 via-slate-950 to-transparent p-4 shadow-2xl shadow-slate-900/30">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Skills</p>
              <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">{skills.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-600 via-slate-950 to-transparent p-4 shadow-2xl shadow-slate-900/30">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Hours</p>
              <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">{totalDuration}</p>
            </div>
            <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-600 via-slate-950 to-transparent p-4 shadow-2xl shadow-slate-900/30">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Avg Duration</p>
              <p className="mt-2 text-3xl font-bold text-white sm:text-4xl">
                {skills.length > 0 ? Math.round(totalDuration / skills.length) : 0}h
              </p>
            </div>
          </div>
        </div>

        <div className="pretty-scrollbar max-h-[calc(100vh-22rem)] overflow-y-scroll pr-1 sm:pr-2">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skills.length > 0 ? (
              skills.map((skill) => (
                <SkillCard key={skill.skl_id} skill={skill} teacher_id={teacher.tchr_id} />
              ))
            ) : (
              <li className="col-span-full rounded-3xl border border-dashed border-slate-700 bg-slate-900/80 p-8 text-center text-slate-300 sm:p-10">
                <p className="text-lg font-medium text-white">You don&apos;t have any skills yet.</p>
                <p className="mt-2 text-sm text-slate-400">Use the Add Skill button above to create your first roadmap.</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}




















// return (
//   //   <div className="space-y-6">
//   //     {/* <SkillsHeader teacher_id={teacher?.tchr_id ?? ""} />

//   //     <p className="text-slate-300">Manage your existing Skills here.</p>

//   //     <ul className="space-y-3">
//   //       {skills.map((skill) => (
//   //         <SkillCard
//   //           key={skill.skl_id}
//   //           skill={skill}
//   //           teacher_id={teacher?.tchr_id ?? ""}
//   //         />
//   //       ))}
//   //     </ul> */}
//   //   </div>
//   // );
