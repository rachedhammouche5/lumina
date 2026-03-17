import { createClient } from "@/lib/supabase/server";

export async function dynamicRoadmapPage(skillId: string, studentId: string) {
    
    const supabase = await createClient();

    const { data: skill } = await supabase.from("Skill").select("*").eq("skill_id", skillId).single();
    const { data: enrollment } = await supabase.from("enroll").select("*").eq("studentId", studentId).eq("skill_id", skillId).single();
    const { data: topics } = await supabase.from("Topic").select("*").eq("skill_id", skillId);
    const { data: scores } = await supabase.from("score").select("*").eq("studentId", studentId);

    return {
        skill,
        enrollment,
        topics,
        scores
    };
}