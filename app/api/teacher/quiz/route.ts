import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const topicId = url.searchParams.get("topicId");

  if (!topicId) {
    return NextResponse.json({ error: "Missing topicId" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("quiz")
    .select("qst_id,question,difficulty,q_response(rspns_id,response,isCorrect)")
    .eq("tpc_id", topicId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const questions = (data ?? []).map((row: any) => ({
    id: row.qst_id,
    question: row.question,
    difficulty: row.difficulty,
    responses: (row.q_response ?? []).map((response: any) => ({
      id: response.rspns_id,
      response: response.response,
      isCorrect: response.isCorrect,
    })),
  }));

  return NextResponse.json({ questions });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const questionId = body?.questionId as string | undefined;
  const skillId = body?.skillId as string | undefined;

  if (!questionId) {
    return NextResponse.json({ error: "Missing questionId" }, { status: 400 });
  }

  const supabase = await createClient();

  const { error: responseError } = await supabase
    .from("q_response")
    .delete()
    .eq("quizId", questionId);

  if (responseError) {
    return NextResponse.json({ error: responseError.message }, { status: 500 });
  }

  const { error } = await supabase
    .from("quiz")
    .delete()
    .eq("qst_id", questionId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (skillId) {
    revalidatePath(`/teacher/skills/${skillId}`);
  }

  return NextResponse.json({ ok: true });
}
