"use client";

import { useState } from "react";

type AnswerInput = { id: string; text: string; correct: boolean };

type EditableQuestion = {
  id: string;
  question: string;
  difficulty: "easy" | "medium" | "hard" | "pro";
  responses: { id: string; response: string; isCorrect: boolean }[];
};

export default function EditQuizForm({
  skillId,
  question,
  onClose,
  onSaved,
}: {
  skillId: string;
  question: EditableQuestion;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [text, setText] = useState(question.question);
  const [difficulty, setDifficulty] = useState<EditableQuestion["difficulty"]>(question.difficulty);
  const [answers, setAnswers] = useState<AnswerInput[]>(
    question.responses.map((r) => ({ id: r.id, text: r.response, correct: r.isCorrect })),
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const setCorrect = (answerId: string) =>
    setAnswers((prev) => prev.map((a) => ({ ...a, correct: a.id === answerId })));

  const updateAnswerText = (answerId: string, value: string) =>
    setAnswers((prev) => prev.map((a) => (a.id === answerId ? { ...a, text: value } : a)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!text.trim()) { setError("Question text is required."); return; }
    if (answers.some((a) => !a.text.trim())) { setError("All 4 answers must be filled in."); return; }
    if (!answers.some((a) => a.correct)) { setError("Mark the correct answer."); return; }

    setSaving(true);
    const res = await fetch("/api/teacher/quiz", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: question.id,
        question: text,
        difficulty,
        answers: answers.map((a) => ({ text: a.text, correct: a.correct })),
        skillId,
      }),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data?.error || "Failed to save changes.");
      return;
    }
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 p-3 backdrop-blur-sm sm:p-4">
      <div className="flex min-h-full items-end justify-center sm:items-center">
        <div className="no-scrollbar flex max-h-[calc(100dvh-1.5rem)] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl shadow-black/40">
          <div className="flex items-start justify-between gap-3 border-b border-slate-700 px-4 py-4 sm:px-5">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:text-xs">Edit question</p>
              <h4 className="mt-1 text-base font-semibold text-white sm:text-lg">Modify quiz question</h4>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 transition hover:border-slate-500 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <form className="space-y-4 px-4 py-4 sm:px-5 sm:py-5" onSubmit={handleSubmit}>
            <div className="space-y-4 rounded-2xl border border-orange-500/10 bg-slate-950/60 p-3 sm:p-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                    Question Text
                  </label>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-xl border border-slate-600 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] uppercase tracking-[0.16em] text-slate-400 sm:text-xs">
                    Difficulty
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as EditableQuestion["difficulty"])}
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
                {answers.map((answer, i) => (
                  <div
                    key={answer.id}
                    className="flex flex-col gap-3 rounded-xl border border-slate-700 bg-slate-800 px-3 py-3 sm:flex-row sm:items-center"
                  >
                    <input
                      type="radio"
                      name="correct-answer"
                      checked={answer.correct}
                      onChange={() => setCorrect(answer.id)}
                      className="h-4 w-4 shrink-0 accent-orange-400"
                    />
                    <input
                      type="text"
                      placeholder={`Answer ${i + 1}`}
                      value={answer.text}
                      onChange={(e) => updateAnswerText(answer.id, e.target.value)}
                      className="min-w-0 flex-1 rounded-xl border border-slate-600 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-orange-400"
                      required
                    />
                  </div>
                ))}
              </div>
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
                disabled={saving}
                className="inline-flex h-11 items-center justify-center rounded-xl bg-linear-to-r from-orange-500 to-amber-400 px-4 text-sm font-semibold text-white transition hover:from-orange-400 hover:to-amber-300 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
