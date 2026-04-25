import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import QuizClient from "./QuizClient";
import StreakCelebration from "@/app/features/streak/StreakCelebration";

export default async function QuizPage({
  params,
}: {
  params: Promise<{ skill_id: string; topic_id: string }>;
}) {
  const { skill_id, topic_id } = await params;
  const supabase = await createClient();

  const [{ data: topic }, { data: questions }] = await Promise.all([
    supabase
      .from("Topic")
      .select("tpc_title")
      .eq("tpc_id", topic_id)
      .eq("skill_id", skill_id)
      .single(),
    supabase
      .from("quiz")
      .select("qst_id, question, difficulty, q_response(*),tpc_id")
      .eq("tpc_id", topic_id),
  ]);

  if (!topic) notFound();

  if (!questions || questions.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 pt-24 text-white">
        <div className="rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] p-10 text-center">
          <h2 className="text-2xl font-black tracking-tight text-white">
            No questions yet
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-slate-400">
            This topic does not have any quiz questions yet. Check back later.
          </p>
        </div>
      </main>
    );
  }

  // Cap the session at 10 questions while keeping the order stable for the server render.
  const shuffled = [...questions]
    .sort((a, b) => a.qst_id.localeCompare(b.qst_id))
    .slice(0, 10);

  // Normalize the nested responses
  const normalized = shuffled.map((q) => ({
    tpc_id: q.tpc_id,
    qst_id: q.qst_id,
    question: q.question,
    difficulty: q.difficulty,
    responses: (q.q_response ?? []).map(
      (r: {
        quizId: string;
        rspns_id: string;
        response: string;
        isCorrect: boolean;
      }) => ({
        quizId: r.quizId,
        rspns_id: r.rspns_id,
        response: r.response,
        isCorrect: r.isCorrect,
      }),
    ),
  }));

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-24 text-white sm:px-6">
      <StreakCelebration />
      <QuizClient
        questions={normalized}
        topicTitle={topic.tpc_title}
        topicId={topic_id}
        skillId={skill_id}
      />
    </main>
  );
}
