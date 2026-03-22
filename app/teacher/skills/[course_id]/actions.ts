"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { requireApprovedTeacherAccess } from "@/features/utils/auth/requireUserAccess"

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
  const { teacherId } = await requireApprovedTeacherAccess()
  const supabase = await createClient()

  const { data: skill } = await supabase
    .from("Skill")
    .select("skl_id")
    .eq("skl_id", skillId)
    .eq("teacher_id", teacherId)
    .maybeSingle()

  if (!skill) {
    return { error: "Unauthorized skill access" }
  }

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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cntnt_type: content.type as any, // Cast to any or your Enum type
          cntnt_value: content.value,
          tpc_id: newTopic.tpc_id,
        }))
      )

    if (contentsError) return { error: contentsError.message }
  }

  revalidatePath(`/teacher/skills/${skillId}`)
  return { data: newTopic }
}

type QuizAnswerInput = {
  text: string
  correct: boolean
}

export async function addQuizzes(
  topicId: string,
  questions: {
    question: string
    answers: QuizAnswerInput[]
  }[]
) {
  const { teacherId } = await requireApprovedTeacherAccess()
  const supabase = await createClient()

  if (questions.length === 0) {
    return { error: "No questions provided" }
  }

  const { data: topic } = await supabase
    .from("Topic")
    .select("skill_id")
    .eq("tpc_id", topicId)
    .maybeSingle()

  if (!topic?.skill_id) {
    return { error: "Topic not found" }
  }

  const { data: skill } = await supabase
    .from("Skill")
    .select("skl_id")
    .eq("skl_id", topic.skill_id)
    .eq("teacher_id", teacherId)
    .maybeSingle()

  if (!skill) {
    return { error: "Unauthorized topic access" }
  }

  // Build rows using tpc_id as required by the new schema
  const quizRows = questions.map((question) => ({
    qst_id: crypto.randomUUID(),
    question: question.question.trim(),
    tpc_id: topicId, 
    difficulty: "easy" as const,
  }))

  const { data: insertedQuizzes, error: quizError } = await supabase
    .from("quiz")
    .insert(quizRows)
    .select("qst_id")

  if (quizError) {
    console.error("Quiz Insert Error:", quizError)
    return { error: quizError.message }
  }

  // FlatMap responses linked to the new quiz IDs
  const responses = insertedQuizzes.flatMap((quiz, index) =>
    questions[index].answers.map((answer) => ({
      rspns_id: crypto.randomUUID(),
      quizId: quiz.qst_id,
      response: answer.text.trim(),
      isCorrect: Boolean(answer.correct),
    }))
  )

  const { error: responseError } = await supabase
    .from("q_response")
    .insert(responses)

  if (responseError) {
    console.error("Response Insert Error:", responseError)
    return { error: responseError.message }
  }

  // Refresh the teacher view
  revalidatePath(`/teacher/skills/${topic.skill_id}`)
  
  return { ok: true }
}
