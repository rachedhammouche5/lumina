import RoadmapFlow from "@/app/ui/roadmapcomp/RoadmapFlow";
import EnrollSection from "@/app/ui/roadmapcomp/EnrollSection";

import { createClient } from "@/lib/supabase/server";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ skill_id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { skill_id } = await params;

  const { data: skill } = await supabase
    .from("Skill")
    .select("*")
    .eq("skl_id", skill_id)
    .single();

  let initialIsEnrolled = false;
  if (user) {
    const { data: student, error: studentError } = await supabase
    .from("Student")
    .select("std_id")
    .eq("user_id", user.id)
    .single();

  if (studentError || !student) return { error: "Student record not found" };

    const { data: enrollment ,error } = await supabase
      .from("enroll")
      .select("skill_id") 
      .eq("student_id", student.std_id)
      .eq("skill_id", skill_id)
      .maybeSingle();

    initialIsEnrolled = !!enrollment;
  }

  return (
    <main className="min-h-screen min-w-screen bg-slate-950 text-white flex flex-col items-center pt-16 md:pt-20 px-4 sm:px-6 relative overflow-hidden font-sans gap-3">
      <EnrollSection
        skill={skill}
        isLoggedIn={!!user}
        initialIsEnrolled={initialIsEnrolled}
      />
      <div className="w-full max-w-[1400px]">
        <h3 className="text-xl md:text-2xl font-black italic tracking-tight mb-4">
          COURSE PATH
        </h3>
        <RoadmapFlow />
      </div>
    </main>
  );
}
