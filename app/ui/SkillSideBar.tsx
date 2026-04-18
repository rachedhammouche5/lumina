import { createClient } from "@/lib/supabase/server";
import SkillSideBarClient from "./SkillSideBarClient";

export default async function SkillSideBar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="w-full rounded-lg border border-slate-700/50 bg-[#0a0c14]/50 p-4">
        <h2 className="text-lg font-semibold text-white">No teacher session found</h2>
        <p className="mt-2 text-sm text-slate-400">
          Log in with your teacher account to manage skills from the sidebar.
        </p>
      </div>
    );
  }

  const { data: teacher } = await supabase
    .from("Teacher")
    .select("tchr_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!teacher?.tchr_id) {
    return (
      <div className="w-full rounded-lg border border-slate-700/50 bg-[#0a0c14]/50 p-4">
        <h2 className="text-lg font-semibold text-white">Teacher profile not found</h2>
      </div>
    );
  }

  const { data: skills } = await supabase
    .from("Skill")
    .select("skl_id,skl_title,skl_picture")
    .eq("teacher_id", teacher.tchr_id)
    .order("skl_title", { ascending: true });

  return <SkillSideBarClient teacherId={teacher.tchr_id} skills={skills ?? []} />;
}