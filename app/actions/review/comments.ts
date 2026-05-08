'use server'

import { createClient } from "@/lib/supabase/server";
import { getRole } from "@/features/utils/auth/getRole";
import { revalidatePath } from "next/cache";

type TeacherRow = {
    tchr_id: string;
    tchr_fullname: string;
    tchr_email: string;
    user_id: string | null;
};

type StudentRow = {
    std_id: string;
    std_fullname: string;
    std_email: string;
    user_id: string | null;
};

async function resolveAuthorId(supabase: Awaited<ReturnType<typeof createClient>>, role: ReturnType<typeof getRole>, userId: string) {
    const isTeacher = role === "teacher" || role === "teacher_pending";

    if (isTeacher) {
        const { data: teacher } = await supabase
            .from("Teacher")
            .select("tchr_id, tchr_fullname, tchr_email, user_id")
            .eq("user_id", userId)
            .maybeSingle() as { data: TeacherRow | null };

        if (!teacher) return { authorId: null, isTeacher: true };

        const { data: teacherMirror } = await supabase
            .from("Student")
            .select("std_id")
            .eq("std_id", teacher.tchr_id)
            .maybeSingle() as { data: Pick<StudentRow, "std_id"> | null };

        if (!teacherMirror) {
            const { error: insertError } = await supabase.from("Student").insert({
                std_id: teacher.tchr_id,
                std_fullname: teacher.tchr_fullname,
                std_email: teacher.tchr_email,
                std_level: "master",
                user_id: teacher.user_id ?? userId,
            });

            if (insertError) {
                console.error("[addComment] Failed to create teacher mirror student:", insertError);
                return { authorId: null, isTeacher: true };
            }
        }

        return { authorId: teacher.tchr_id, isTeacher: true };
    }

    const { data: student } = await supabase
        .from("Student")
        .select("std_id, std_fullname, std_email, user_id")
        .or(`user_id.eq.${userId},std_id.eq.${userId}`)
        .maybeSingle() as { data: StudentRow | null };

    return { authorId: student?.std_id ?? null, isTeacher: false };
}

export async function addComment(skillId: string, content: string, parentId?: string, rating: number = 5) {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Not authenticated" };

    const role = getRole(user);
    const { authorId, isTeacher } = await resolveAuthorId(supabase, role, user.id);

    if (!authorId) {
        const msg = isTeacher ? "Teacher profile not found" : "Student profile not found";
        console.error("[addComment]", msg, "user.id:", user.id);
        throw new Error(msg);
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
        console.error("[addComment] DB insert error:", error);
        throw new Error(error.message);
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
