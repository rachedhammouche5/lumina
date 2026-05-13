"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { ContentType } from "@/lib/database.types"
import { indexTopicContents } from "@/lib/ai/content-ingestion"
type TopicContentInput = {
  id?: string
  title: string
  type: ContentType
  value: string | null
}

export async function uploadContentFile(formData: FormData) {
  const file = formData.get("file") as File
  const type = formData.get("type") as string

  if (!file || !file.name) return { error: "No file provided" }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const folder = path.join(process.cwd(), "public", "uploads", type)
  await mkdir(folder, { recursive: true }) 

  const filename = `${Date.now()}-${file.name}`
  await writeFile(path.join(folder, filename), buffer)

  return { url: `/uploads/${type}/${filename}` }
}

export async function addTopic(
  skillId: string,
  parentId: string | null,
  form: {
    title: string
    description: string
    contents: TopicContentInput[]
  }
) {
  const supabase = await createClient()
  let indexingWarning: string | null = null

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

  // ✅ Only ONE block — IDs are generated once and reused for both insert and indexing
  if (form.contents.length > 0) {
    const contentRows = form.contents.map((content) => ({
      cntnt_id: content.id ?? crypto.randomUUID(),
      cntnt_title: content.title,
      cntnt_type: content.type,
      cntnt_value: content.value,
      tpc_id: newTopic.tpc_id,
    }))

    const { error: contentsError } = await supabase
      .from("Content")
      .insert(contentRows)

    if (contentsError) return { error: contentsError.message }

    const { skipped } = await indexTopicContents(
      contentRows.map((content) => ({
        contentId: content.cntnt_id,
        skillId,
        topicId: newTopic.tpc_id,
        level: null,
        title: content.cntnt_title,
        type: content.cntnt_type,
        value: content.cntnt_value,
      }))
    )

    if (skipped.length > 0) {
      indexingWarning = `Indexed with partial success. ${skipped.length} content item(s) were skipped.`
    }
  }

  revalidatePath(`/teacher/skills/${skillId}`)
  return { data: newTopic, warning: indexingWarning }
}

export async function updateTopic(
  skillId: string,
  topicId: string,
  parentId: string | null,
  form: {
    hasTopicChanges: boolean
    title: string
    description: string
    contents: TopicContentInput[]
  }
) {
  const supabase = await createClient()
  let updatedTopic = null
  let indexingWarning: string | null = null

  if (form.hasTopicChanges) {
    const { data, error: topicError } = await supabase
      .from("Topic")
      .update({
        tpc_title: form.title,
        tpc_description: form.description,
        parent_id: parentId,
      })
      .eq("tpc_id", topicId)
      .select()
      .single()

    if (topicError) return { error: topicError.message }

    updatedTopic = data
  }

  if (form.contents.length > 0) {
    const contentRows = form.contents.map((content) => ({
      cntnt_id: content.id ?? crypto.randomUUID(),
      cntnt_title: content.title,
      cntnt_type: content.type,
      cntnt_value: content.value,
      tpc_id: topicId,
    }))

    const { error: contentsError } = await supabase
      .from("Content")
      .upsert(contentRows)

    if (contentsError) return { error: contentsError.message }

    const { skipped } = await indexTopicContents(
      contentRows.map((content) => ({
        contentId: content.cntnt_id,
        skillId,
        topicId,
        level: null,
        title: content.cntnt_title,
        type: content.cntnt_type,
        value: content.cntnt_value,
      })),
    )

    if (skipped.length > 0) {
      indexingWarning = `Indexed with partial success. ${skipped.length} content item(s) were skipped.`
    }
  }

revalidatePath(`/teacher/skills/${skillId}`)

if (!form.hasTopicChanges && form.contents.length === 0) {
  return { data: { tpc_id: topicId }, skipped: true }
}

return { data: updatedTopic ?? { tpc_id: topicId }, warning: indexingWarning }
}

type QuizAnswerInput = {
  text: string
  correct: boolean
}

type GeneratedQuiz = {
  question: string
  answers: QuizAnswerInput[]
}

function parseGeneratedQuiz(raw: string): GeneratedQuiz {
  const cleaned = raw.startsWith("```")
    ? raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
    : raw;

  const parsed = JSON.parse(cleaned) as GeneratedQuiz;
  if (!parsed.question?.trim()) {
    throw new Error("Generated question was empty.");
  }
  if (!Array.isArray(parsed.answers) || parsed.answers.length !== 4) {
    throw new Error("Generated quiz must have exactly four answers.");
  }

  const normalizedAnswers = parsed.answers.map((answer) => ({
    text: answer.text?.trim() ?? "",
    correct: Boolean(answer.correct),
  }));

  const hasCorrect = normalizedAnswers.some((answer) => answer.correct);
  if (!hasCorrect) {
    normalizedAnswers[0].correct = true;
  } else {
    let foundCorrect = false;
    normalizedAnswers.forEach((answer) => {
      if (answer.correct && !foundCorrect) {
        foundCorrect = true;
        return;
      }
      answer.correct = false;
    });
  }

  return {
    question: parsed.question.trim(),
    answers: normalizedAnswers,
  };
}

export async function addQuizzes(
  topicId: string,
  teacherId: string | null,
  questions: {
    question: string;
    difficulty: "easy" | "medium" | "hard" | "pro";
    answers: QuizAnswerInput[];
  }[]
) {
  const supabase = await createClient();

  if (questions.length === 0) return { error: "No questions provided" };

  const quizRows = questions.map((question) => ({
    qst_id: crypto.randomUUID(),
    question: question.question.trim(),
    tpc_id: topicId,
    difficulty: question.difficulty,  // ← from payload now
  }));

  const { data: insertedQuizzes, error: quizError } = await supabase
    .from("quiz")
    .insert(quizRows)
    .select("qst_id");

  if (quizError) {
    console.error("Quiz Insert Error:", quizError);
    return { error: quizError.message };
  }

  const responses = insertedQuizzes.flatMap((quiz, index) =>
    questions[index].answers.map((answer) => ({
      rspns_id: crypto.randomUUID(),
      quizId: quiz.qst_id,
      response: answer.text.trim(),
      isCorrect: Boolean(answer.correct),
    }))
  );

  const { error: responseError } = await supabase
    .from("q_response")
    .insert(responses);

  if (responseError) {
    console.error("Response Insert Error:", responseError);
    return { error: responseError.message };
  }

  revalidatePath(`/teacher/courses`);
  return { ok: true };
}

export async function generateQuizFromContent(args: {
  skillId: string;
  topicId: string;
  contentTitle: string;
  contentValue: string;
  contentType: ContentType;
}) {
  const { skillId, topicId, contentTitle, contentValue, contentType } = args;

  if (!process.env.GEMINI_API_KEY) {
    return { error: "Missing Gemini API key." };
  }

  const supabase = await createClient();

  const { data: topic } = await supabase
    .from("Topic")
    .select("tpc_title, tpc_description")
    .eq("tpc_id", topicId)
    .maybeSingle();

  const prompt = `You are helping a teacher generate a multiple-choice quiz question from course content.

Return valid JSON only in this exact shape:
{
  "question": "string",
  "answers": [
    {"text": "string", "correct": true},
    {"text": "string", "correct": false},
    {"text": "string", "correct": false},
    {"text": "string", "correct": false}
  ]
}

Rules:
- Base the question directly on the content.
- Use exactly 4 answers.
- Make the question classroom-friendly and concise.

Topic title: ${topic?.tpc_title ?? "Untitled topic"}
Topic description: ${topic?.tpc_description ?? "No description"}
Content title: ${contentTitle}
Content type: ${contentType}
Content text:
${contentValue}`;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: process.env.AI_TUTOR_MODEL?.trim() || "gemini-2.5-flash-lite",
    });

    const result = await model.generateContent(prompt);
    const raw = result.response.text().trim();
    const generated = parseGeneratedQuiz(raw);

    const insertResult = await addQuizzes(topicId, null, [
      {
        question: generated.question,
        difficulty: "medium",
        answers: generated.answers,
      },
    ]);

    if ("error" in insertResult) {
      return insertResult;
    }

    revalidatePath(`/teacher/skills/${skillId}`);
    return { ok: true, question: generated.question };
  } catch (error) {
    console.error("[generateQuizFromContent]", error);
    return { error: error instanceof Error ? error.message : "Failed to generate quiz." };
  }
}
export async function deleteContent(contentId: string, skillId: string) {
  const supabase = await createClient();

  await supabase.from("content_chunks").delete().eq("content_id", contentId);

  const { error } = await supabase
    .from("Content")
    .delete()
    .eq("cntnt_id", contentId);

  if (error) return { error: error.message };

  revalidatePath(`/teacher/skills/${skillId}`);
  return { success: true };
}
export async function deleteTopic(topicId: string, skillId: string) {
  const supabase = await createClient();

  const idsToDelete: string[] = [topicId];
  const queue = [topicId];

  while (queue.length > 0) {
    const current = queue.pop();
    if (!current) continue;

    const { data: children, error: childError } = await supabase
      .from("Topic")
      .select("tpc_id")
      .eq("parent_id", current);

    if (childError) return { error: childError.message };

    const childIds = (children ?? []).map((child) => child.tpc_id);
    queue.push(...childIds);
    idsToDelete.push(...childIds);
  }

  const { data: contentToDelete } = await supabase
    .from("Content")
    .select("cntnt_id")
    .in("tpc_id", idsToDelete);
  const contentIds = (contentToDelete ?? []).map((c) => c.cntnt_id);
  if (contentIds.length > 0) {
    await supabase.from("content_chunks").delete().in("content_id", contentIds);
  }

  await supabase.from("Content").delete().in("tpc_id", idsToDelete);
  const { error } = await supabase.from("Topic").delete().in("tpc_id", idsToDelete);

  if (error) return { error: error.message };

  revalidatePath(`/teacher/skills/${skillId}`);
  return { success: true };
}
