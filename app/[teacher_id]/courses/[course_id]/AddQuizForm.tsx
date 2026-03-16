"use client";

import { useState } from "react";
import { Skill, Topic } from "@/lib/database.types";
import { addQuizzes } from "./actions";

type AnswerInput = { id: string; text: string; correct: boolean };
type QuestionInput = {
  id: string;
  question: string;
  topicId: string;
  answers: AnswerInput[];
};

const buildAnswer = (markCorrect = false): AnswerInput => ({
  id: crypto.randomUUID(),
  text: "",
  correct: markCorrect,
});

const buildQuestion = (topicId: string): QuestionInput => ({
  id: crypto.randomUUID(),
  question: "",
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
      answers: q.answers.map((a) => ({
        text: a.text,
        correct: a.correct,
      })),
    }));

    // FIXED: Now passing topic.tpc_id to match the new database schema
    const result = await addQuizzes(topic.tpc_id, skill.teacher_id ?? null, payload);
    
    setSubmitting(false);
    if (result?.error) {
      setError(result.error);
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 p-4">
      <div className="flex min-h-full items-start justify-center py-6">
        <div className="w-full my-6 max-w-3xl max-h-[calc(90vh-1rem)] overflow-y-auto no-scrollbar rounded-lg border border-slate-700 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="text-lg font-semibold text-white">Add Quiz to {topic.tpc_title}</h4>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-300 transition hover:text-white"
            >
              Close
            </button>
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            {questions.map((question, qIndex) => (
              <div
                key={question.id}
                className="space-y-3 rounded-lg border border-slate-700 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    Question {qIndex + 1}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs text-slate-300">
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
                    className="w-full rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Answers (mark the correct one)
                  </p>
                  {question.answers.map((answer, aIndex) => (
                    <div
                      key={answer.id}
                      className="flex items-center gap-3 rounded-md border border-slate-700 bg-slate-800 px-3 py-2"
                    >
                      <input
                        type="radio"
                        name={`correct-${question.id}`}
                        checked={answer.correct}
                        onChange={() =>
                          setCorrectAnswer(question.id, answer.id)
                        }
                        className="h-4 w-4 accent-emerald-400"
                      />
                      <input
                        type="text"
                        placeholder={`Answer ${aIndex + 1}`}
                        value={answer.text}
                        onChange={(e) =>
                          updateAnswerText(question.id, answer.id, e.target.value)
                        }
                        className="flex-1 rounded-md border border-slate-600 bg-slate-900 px-3 py-2 text-sm text-white"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={addQuestion}
                className="rounded-md border border-indigo-400 px-3 py-2 text-sm font-semibold text-indigo-200 transition hover:bg-indigo-500/20"
              >
                + Add Question
              </button>
            </div>

            {error ? <p className="text-sm text-red-400">{error}</p> : null}

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-slate-500 px-4 py-2 text-sm text-slate-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 disabled:opacity-60"
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