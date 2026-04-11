"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function uploadSkillImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || !file.name) return { error: "No file provided" };

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const folder = path.join(process.cwd(), "public", "uploads", "skills");
  await mkdir(folder, { recursive: true });

  const filename = `${Date.now()}-${file.name}`;
  await writeFile(path.join(folder, filename), buffer);

  return { url: `/uploads/skills/${filename}` };
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

  const { error } = await supabase.from("Skill").delete().eq("skl_id", skl_id);

  if (error) return { error: error.message };

  revalidatePath(`/teacher/skills`);
  return { success: true };
}