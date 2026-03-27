import Link from "next/link";
import { redirect } from "next/navigation";
import AddCourseForm from "./AddCourseForm";
import { createClient } from "@/lib/supabase/server";
import { Skill } from "@/lib/database.types";
export default async function TeacherCoursesPage({}: {}) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) redirect("/");
  
  const { data: teacher, error: studentError } = await supabase
    .from("Teacher")
    .select("tchr_id")
    .eq("user_id", user.id)
    .single();

  const { data } = await supabase
    .from("Skill")
    .select("*")
    .eq("teacher_id", teacher?.tchr_id);

  const skills: Skill[] = data ?? [];

  return (
    <div className="space-y-6">
      <AddCourseForm teacher_id={user.id} />

      <div className="space-y-2">
        <p className="text-slate-300">Manage your existing Skills here.</p>
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
