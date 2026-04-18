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
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 to-transparent px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-800 via-slate-950 to-slate-950 p-5 shadow-2xl shadow-slate-800/40 sm:p-7">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white sm:text-4xl">Teacher Skills Studio</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                  Build modern learning paths, switch to quiz management quickly, and keep every skill organized.
                </p>
              </div>
              <SkillsHeader teacher_id={teacher.tchr_id} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-transparent shadow-2xl shadow-black/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Skills</p>
                <p className="mt-1 text-2xl font-semibold text-white">{skills.length}</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-transparent shadow-2xl shadow-black/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Hours</p>
                <p className="mt-1 text-2xl font-semibold text-white">{totalDuration}</p>
              </div>
              <div className="rounded-2xl border border-slate-700 bg-linear-to-br from-slate-900 via-slate-800 to-transparent shadow-2xl shadow-black/70 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg Duration</p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  {skills.length > 0 ? Math.round(totalDuration / skills.length) : 0}h
                </p>
              </div>
            </div>
          </div>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <SkillCard key={skill.skl_id} skill={skill} teacher_id={teacher.tchr_id} />
            ))
          ) : (
            <li className="col-span-full rounded-3xl border border-dashed border-slate-700 bg-slate-900 p-10 text-center text-slate-300">
              <p className="text-lg font-medium text-white">You don't have any skills yet.</p>
              <p className="mt-2 text-sm text-slate-400">Use the Add Skill button above to create your first roadmap.</p>
            </li>
          )}
        </ul>
      </div>
    </div>
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