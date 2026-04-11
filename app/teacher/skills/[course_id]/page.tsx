import { createClient } from "@/lib/supabase/server";
import CourseDetailView from "./CourseDetailView";
import { Skill , Topic ,Content} from "@/lib/database.types"
export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ course_id: string }>;
}) {
  const { course_id } = await params  ;

  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("Skill")
    .select("*")
    .eq("skl_id", course_id)
    .single();

  if (!skill) return <p className="text-white">Skill not found</p>

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
