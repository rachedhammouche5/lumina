"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function addTopic(
  skillId: string,
  parentId: string | null,
  form: {
    title: string
    description: string
    contents: {
      title: string
      type: string
      value: string | null
    }[]
  }
) {
  const supabase = await createClient()

  const { data: newTopic, error: topicError } = await supabase
    .from("Topic")
    .insert({
      tpc_id: crypto.randomUUID(),
      tpc_title: form.title,
      tpc_description: form.description,
      skill_id: skillId,
      parent_id: parentId,
    })
    .select()
    .single()

  if (topicError) return { error: topicError.message }

  if (form.contents.length > 0) {
    const { error: contentsError } = await supabase
      .from("Content")
      .insert(
        form.contents.map((content) => ({
          cntnt_id: crypto.randomUUID(),
          cntnt_title: content.title,
          cntnt_type: content.type,
          cntnt_value: content.value,
          tpc_id: newTopic.tpc_id,
        }))
      )

    if (contentsError) return { error: contentsError.message }
  }

  revalidatePath(`/teacher/courses/${skillId}`)  
  return { data: newTopic }
}