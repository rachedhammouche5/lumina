import { createClient } from "@/lib/supabase/server";
import CourseDetailView from "@/app/teacher/skills/[course_id]/CourseDetailView";
import { requireApprovedTeacherAccess } from "@/features/utils/auth/requireUserAccess";

export default async function TeacherSkillDetailPage({
  params,
}: {
  params: Promise<{ course_id: string }>;
}) {
  const { course_id } = await params;
  const { teacherId } = await requireApprovedTeacherAccess();

  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("Skill")
    .select("*")
    .eq("skl_id", course_id)
    .eq("teacher_id", teacherId)
    .single();

  if (!skill) {
    return <p className="text-white">Skill not found</p>;
  }

  const { data: topics } = await supabase
    .from("Topic")
    .select("*")
    .eq("skill_id", course_id);

  const { data: contents } = await supabase
    .from("Content")
    .select("*")
    .in("tpc_id", topics?.map((topic) => topic.tpc_id) ?? []);

  return (
    <CourseDetailView
      skill={skill}
      topics={topics ?? []}
      contents={contents ?? []}
    />
  );
}
