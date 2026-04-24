"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { revalidatePath } from "next/cache";

export async function uploadSkillImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || !file.name) return { error: "No file provided" };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const ext = file.name.split(".").pop() ?? "jpg";
  const filename = `${Date.now()}.${ext}`;

  const supabase = createAdminClient();
  const { error: uploadError } = await supabase.storage
    .from("skills-pictures")
    .upload(filename, buffer, { contentType: file.type, upsert: false });

  if (uploadError) return { error: uploadError.message };

  const { data } = supabase.storage.from("skills-pictures").getPublicUrl(filename);
  return { url: data.publicUrl };
}

export async function addSkill(formData: {
  skl_title: string;
  skl_dscrptn: string;
  skl_duration: number;
  teacher_id: string;
  skl_picture?: string | null;
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("Skill")
    .insert(formData)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath(`/teacher/skills`);
  return { data };
}

export async function updateSkill(formData: {
  skl_id: string;
  skl_title: string;
  skl_dscrptn: string;
  skl_duration: number;
  skl_picture?: string | null;
  teacher_id: string;
}) {
  const supabase = await createClient();

  const { skl_id, teacher_id, ...fields } = formData;

  const { data, error } = await supabase
    .from("Skill")
    .update(fields)
    .eq("skl_id", skl_id)
    .select()
    .single();

  if (error) return { error: error.message };

  revalidatePath(`/teacher/skills`);
  return { data };
}

export async function deleteSkill(skl_id: string, teacher_id: string) {
  const supabase = await createClient();

  if (!skl_id || !teacher_id) {
    return { error: "Missing skill or teacher id." };
  }

  const { data: ownedSkill, error: ownedSkillError } = await supabase
    .from("Skill")
    .select("skl_id")
    .eq("skl_id", skl_id)
    .eq("teacher_id", teacher_id)
    .maybeSingle();

  if (ownedSkillError) return { error: ownedSkillError.message };
  if (!ownedSkill) return { error: "Skill not found or not owned by this teacher." };

  const { data: topicRows, error: topicError } = await supabase
    .from("Topic")
    .select("tpc_id")
    .eq("skill_id", skl_id);

  if (topicError) return { error: topicError.message };

  const topicIds = (topicRows ?? []).map((topic) => topic.tpc_id);

  if (topicIds.length > 0) {
    const { data: quizRows, error: quizFetchError } = await supabase
      .from("quiz")
      .select("qst_id")
      .in("tpc_id", topicIds);
    if (quizFetchError) return { error: quizFetchError.message };

    const quizIds = (quizRows ?? []).map((quiz) => quiz.qst_id);

    if (quizIds.length > 0) {
      const { error: responseDeleteError } = await supabase
        .from("q_response")
        .delete()
        .in("quizId", quizIds);
      if (responseDeleteError) return { error: responseDeleteError.message };
    }

    const { error: quizDeleteError } = await supabase
      .from("quiz")
      .delete()
      .in("tpc_id", topicIds);
    if (quizDeleteError) return { error: quizDeleteError.message };

    const { error: scoreDeleteError } = await supabase
      .from("score")
      .delete()
      .in("tpc_id", topicIds);
    if (scoreDeleteError) return { error: scoreDeleteError.message };

    const { error: contentDeleteError } = await supabase
      .from("Content")
      .delete()
      .in("tpc_id", topicIds);
    if (contentDeleteError) return { error: contentDeleteError.message };

    const { error: topicDeleteError } = await supabase
      .from("Topic")
      .delete()
      .in("tpc_id", topicIds);
    if (topicDeleteError) return { error: topicDeleteError.message };
  }

  const { data: reviewRows, error: reviewFetchError } = await supabase
    .from("review")
    .select("id")
    .eq("skill_id", skl_id);
  if (reviewFetchError) return { error: reviewFetchError.message };

  const reviewIds = (reviewRows ?? []).map((review) => review.id);
  if (reviewIds.length > 0) {
    const { error: likesDeleteError } = await supabase
      .from("review_likes")
      .delete()
      .in("review_id", reviewIds);
    if (likesDeleteError) return { error: likesDeleteError.message };
  }

  const { error: reviewDeleteError } = await supabase.from("review").delete().eq("skill_id", skl_id);
  if (reviewDeleteError) return { error: reviewDeleteError.message };

  const { error: enrollDeleteError } = await supabase.from("enroll").delete().eq("skill_id", skl_id);
  if (enrollDeleteError) return { error: enrollDeleteError.message };

  const { error } = await supabase.from("Skill").delete().eq("skl_id", skl_id).eq("teacher_id", teacher_id);

  if (error) return { error: error.message };

  revalidatePath(`/teacher/skills`);
  revalidatePath(`/teacher/skills/${skl_id}`);
  return { success: true };
}