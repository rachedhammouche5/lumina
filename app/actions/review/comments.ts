'use server'

import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { revalidatePath } from "next/cache";

export async function addComment(skillId: string, content: string, parentId?: string, rating: number = 5) {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not authenticated" };

    const role = getRole(user);
    const isTeacher = role === "teacher" || role === "teacher_pending";

    let authorId: string | null = null;

    if (isTeacher) {
        const { data: teacher } = await supabase
            .from("Teacher")
            .select("tchr_id")
            .eq("tchr_id", user.id)
            .maybeSingle();

        authorId = teacher?.tchr_id ?? null;
    } else {
        const { data: student } = await supabase
            .from("Student")
            .select("std_id")
            .eq("user_id", user.id)
            .maybeSingle();

        authorId = student?.std_id ?? null;
    }

    if (!authorId) {
        return { success: false, error: isTeacher ? "Teacher profile not found" : "Student profile not found" };
    }

    // 3. Insert the review
    const { error } = await supabase.from("review").insert({
        comment: content,
        skill_id: skillId,
        parent_id: parentId || null,
        rating: rating,
        studentId: authorId,
    });

    if (error) {
        console.error("Error adding comment:", error);
        return { success: false, error: error.message };
    }

    // 4. Refresh the page data
    revalidatePath(`/skills/${skillId}`);
    return { success: true };
}

export async function likeComment(reviewId: string, skillId: string) {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: student } = await supabase
        .from("Student")
        .select("std_id")
        .eq("user_id", user.id)
        .single();

    if (!student) return;

    const { data: existingLike } = await supabase
        .from("review_likes")
        .select("id")
        .eq("review_id", reviewId)
        .eq("student_id", student.std_id)
        .maybeSingle();

    if (existingLike) {
        await supabase.from("review_likes").delete().eq("id", existingLike.id);
    } else {
        await supabase.from("review_likes").insert({
            review_id: reviewId,
            student_id: student.std_id,
        });
    }

    revalidatePath(`/skills/${skillId}`);   
}
