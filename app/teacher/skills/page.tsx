import Link from "next/link";

import AddCourseForm from "@/app/teacher/skills/AddCourseForm";
import { Skill } from "@/lib/database.types";
import { requireTeacherAccess } from "@/features/utils/auth/requireUserAccess";

export default async function TeacherSkillsPage() {
  const { supabase, teacherId, role } = await requireTeacherAccess();

  const { data } = await supabase
    .from("Skill")
    .select("*")
    .eq("teacher_id", teacherId);

  const skills: Skill[] = data ?? [];

  return (
    <div className="space-y-6">
      {role === "teacher" ? (
        <AddCourseForm />
      ) : (
        <div className="rounded-lg border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-amber-200">
          Your teacher application is still pending. Skill creation is disabled
          until an admin approves your request.
        </div>
      )}

      <div className="space-y-2">
        <p className="text-slate-300">Manage your existing skills here.</p>
      </div>

      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill.skl_id}>
            <Link
              href={`/teacher/skills/${skill.skl_id}`}
              className="block rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 transition hover:border-indigo-400 hover:bg-slate-700"
            >
              <p className="font-semibold text-white">{skill.skl_title}</p>
              <p className="text-sm text-slate-300">{skill.skl_dscrptn}</p>
              <p className="mt-1 text-xs text-slate-400">
                Duration: {skill.skl_duration}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
