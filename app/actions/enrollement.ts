'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";


export async function Enrollment(SkillId :string, studentId:string){
    const supabase = await createClient();

    const {error} = await supabase.from("enroll").insert({studentId:studentId , skill_id: SkillId, progress: 0 });
    if (error) return {error: error.message}

    revalidatePath(`/student/${studentId}/courses/${SkillId}`);
    return { success: true }
}