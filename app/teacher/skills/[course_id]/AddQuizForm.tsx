"use client";

import { useState } from "react";
import { Skill, Topic } from "@/lib/database.types";
import { addQuizzes } from "./actions";

type AnswerInput = { id: string; text: string; correct: boolean };

type QuestionInput = {
  id: string;
  question: string;
  difficulty: "easy" | "medium" | "hard" | "pro";
  topicId: string;
  answers: AnswerInput[];
};

const buildAnswer = (markCorrect = false): AnswerInput => ({
  id: crypto.randomUUID(),
  text: "",
  correct: markCorrect,
});

// Update the builder
const buildQuestion = (topicId: string): QuestionInput => ({
  id: crypto.randomUUID(),
  question: "",
  difficulty: "easy", // ← default
  topicId,
  answers: [
    buildAnswer(true),
    buildAnswer(false),
    buildAnswer(false),
    buildAnswer(false),
  ],
});
export default function AddQuizForm({
  skill,
  topic,
  onClose,
}: {
  skill: Skill;
  topic: Topic;
  onClose: () => void;
}) {
  const [questions, setQuestions] = useState<QuestionInput[]>([
    buildQuestion(topic.tpc_id),
  ]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const setCorrectAnswer = (questionId: string, answerId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) => ({
                ...a,
                correct: a.id === answerId,
              })),
            }
          : q,
      ),
    );
  };

  const updateAnswerText = (
    questionId: string,
    answerId: string,
    text: string,
  ) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map((a) =>
                a.id === answerId ? { ...a, text } : a,
              ),
            }
          : q,
      ),
    );
  };

  const addQuestion = () => {
    setQuestions((prev) => [...prev, buildQuestion(topic.tpc_id)]);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    for (const question of questions) {
      if (!question.question.trim()) {
        setError("Each question needs text.");
        return;
      }
      if (
        question.answers.length !== 4 ||
        question.answers.some((a) => !a.text.trim())
      ) {
        setError("Every question must have four answers filled in.");
        return;
      }
      if (!question.answers.some((a) => a.correct)) {
        setError("Mark the correct answer for each question.");
        return;
      }
    }

    setSubmitting(true);
    const payload = questions.map((q) => ({
      question: q.question,
      difficulty: q.difficulty, // ← add this
      answers: q.answers.map((a) => ({ text: a.text, correct: a.correct })),
    }));

    // FIXED: Now passing topic.tpc_id to match the new database schema
    const result = await addQuizzes(
      topic.tpc_id,
      skill.teacher_id ?? null,
      payload,
    );

    setSubmitting(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4">
      <div className="flex min-h-full items-end justify-center sm:items-center">
        <div className="no-scrollbar flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/40">
          <div className="flex items-start justify-between gap-3 border-b border-slate-700 px-4 py-4 sm:px-5">
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:text-xs">New quiz</p>
              <h4 className="mt-1 truncate text-base font-semibold text-white sm:text-lg">
                Add Quiz to {topic.tpc_title}
              </h4>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:border-slate-500 hover:text-white"
              aria-label="Close quiz form"
            >
              ✕
            </button>
          </div>

          <form className="space-y-4 px-4 py-4 sm:px-5 sm:py-5" onSubmit={onSubmit}>
            {questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="space-y-4 rounded-2xl border border-orange-500/10 bg-slate-950/60 p-3 shadow-inner shadow-black/10 sm:p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm font-semibold text-white">Question {qIndex + 1}</p>
                  <span className="w-fit rounded-full border border-orange-400/20 bg-orange-500/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-orange-200">
                    {question.difficulty}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                      Question Text
                    </label>
                    <input
                      value={question.question}
                      onChange={(e) =>
                        setQuestions((prev) =>
                          prev.map((q) =>
                            q.id === question.id
                              ? { ...q, question: e.target.value }
                              : q,
                          ),
                        )
                      }
                      className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                      Difficulty
                    </label>

                    <select
                      value={question.difficulty}
                      onChange={(e) =>
                        setQuestions((prev) =>
                          prev.map((q) =>
                            q.id === question.id
                              ? {
                                  ...q,
                                  difficulty: e.target
                                    .value as QuestionInput["difficulty"],
                                }
                              : q,
                          ),
                        )
                      }
                      className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-orange-400"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="pro">Pro</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 sm:text-xs">
                    Answers (mark the correct one)
                  </p>
                  {question.answers.map((answer, aIndex) => (
                    <div
                      key={answer.id}
                      className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 sm:flex-row sm:items-center"
                    >
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={answer.correct}
                        onChange={() =>
                          setCorrectAnswer(question.id, answer.id)
                        }
                        className="h-4 w-4 shrink-0 accent-orange-400"
                      />
                      <input
                        type="text"
                        placeholder={`Answer ${aIndex + 1}`}
                        value={answer.text}
                        onChange={(e) =>
                          updateAnswerText(
                            question.id,
                            answer.id,
                            e.target.value,
                          )
                        }
                        className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={addQuestion}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-orange-400 px-3 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/20 sm:w-auto"
              >
                + Add Question
              </button>
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <div className="flex flex-col-reverse gap-2 border-t border-slate-700 pt-4 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-500 px-4 text-sm text-slate-200 transition hover:border-slate-400 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-amber-400 px-4 text-sm font-semibold text-white transition hover:from-orange-400 hover:to-amber-300 disabled:opacity-60"
              >
                {submitting ? "Saving..." : "Save Quiz"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
