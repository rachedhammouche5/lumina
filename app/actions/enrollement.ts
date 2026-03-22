'use server'

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireStudentAccess } from "@/features/utils/auth/requireUserAccess";


export async function Enrollment(skillId: string) {
    const { studentId } = await requireStudentAccess();
    const supabase = await createClient();

    const {error} = await supabase
      .from("enroll")
      .insert({ studentId, skill_id: skillId, progress: 0 });

    if (error) return {error: error.message}

    revalidatePath(`/skills/${skillId}`);
    return { success: true }
}
