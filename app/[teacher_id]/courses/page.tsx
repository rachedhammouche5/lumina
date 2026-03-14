import Link from "next/link";
import AddCourseForm from "./AddCourseForm";
import { createClient } from "@/lib/supabase/server";
import { Skill } from "@/lib/database.types";
export default async function TeacherCoursesPage({
  params,
}: {
  params: Promise<{ teacher_id: string }>;
}) {
  const { teacher_id } = await params;
  const supabase = await createClient();

  const { data } = await supabase
    .from("Skill")
    .select("*")
    .eq("teacher_id", teacher_id);
  const skills: Skill[] = data ?? [];
  return (
    <div className="space-y-6">
      <AddCourseForm teacher_id={teacher_id} />

      <div className="space-y-2">
        <p className="text-slate-300">Manage your existing courses here.</p>
      </div>

      <ul className="space-y-3">
        {skills.map((skill) => (
          <li key={skill.skl_id}>
            <Link
              href={`/${teacher_id}/courses/${skill.skl_id}`}              className="block rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 transition hover:border-indigo-400 hover:bg-slate-700"
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

// const courses = [
//   {
//     "id": "course-101",
//     "title": "Introduction to Algebra",
//     "description": "Core algebraic concepts with guided practice.",
//     "duration": "6 weeks"
//   },
//   {
//     "id": "course-102",
//     "title": "World History Essentials",
//     "description": "A timeline-based overview from ancient to modern eras.",
//     "duration": "8 weeks"
//   },
//   {
//     "id": "course-103",
//     "title": "Fundamentals of Biology",
//     "description": "Cell biology, genetics, and ecosystems for beginners.",
//     "duration": "10 weeks"
//   }
// ]
