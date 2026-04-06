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

  const { data } = await supabase
    .from("Skill")
    .select("*")
    .eq("teacher_id", teacher?.tchr_id);

  const skills: Skill[] = data ?? [];

  return (
    <div className="space-y-6">
      <SkillsHeader teacher_id={teacher?.tchr_id ?? ""} />

      <p className="text-slate-300">Manage your existing Skills here.</p>

      <ul className="space-y-3">
        {skills.map((skill) => (
          <SkillCard
            key={skill.skl_id}
            skill={skill}
            teacher_id={teacher?.tchr_id ?? ""}
          />
        ))}
      </ul>
    </div>
  );
}