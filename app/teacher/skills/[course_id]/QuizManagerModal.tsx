"use client";

import { useEffect, useMemo, useState } from "react";
import { Skill, Topic } from "@/lib/database.types";

type QuizResponse = {
  id: string;
  response: string;
  isCorrect: boolean;
};

type QuizQuestion = {
  id: string;
  question: string;
  difficulty: "easy" | "medium" | "hard" | "pro";
  responses: QuizResponse[];
};

export default function QuizManagerModal({
  skill,
  topics,
  selectedTopicId,
  onSelectTopic,
  onCreateQuestion,
}: {
  skill: Skill;
  topics: Topic[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
  onCreateQuestion: (topic: Topic) => void;
}) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [refreshFlag, setRefreshFlag] = useState(0);

  const selectedTopic = useMemo(
    () => topics.find((topic) => topic.tpc_id === selectedTopicId) ?? null,
    [topics, selectedTopicId],
  );

  useEffect(() => {
    if (!selectedTopicId && topics.length > 0) {
      onSelectTopic(topics[0].tpc_id);
    }
  }, [onSelectTopic, selectedTopicId, topics]);

  useEffect(() => {
    if (!selectedTopicId) return;

    const fetchQuestions = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/teacher/quiz?topicId=${encodeURIComponent(selectedTopicId)}`,
          { cache: "no-store" },
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data?.error || "Unable to load quiz questions.");
        }

        const data = await response.json();
        setQuestions(data.questions ?? []);
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : "Failed to load questions.");
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [selectedTopicId, refreshFlag]);

  const handleDeleteQuestion = async (questionId: string) => {
    if (!window.confirm("Delete this question and all of its answers?")) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/teacher/quiz", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId, skillId: skill.skl_id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Unable to delete question.");
      }

      setRefreshFlag((prev) => prev + 1);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
      <div className="rounded-3xl border border-slate-700 bg-linear-to-br from-slate-700/80 via-slate-950 to-transparent p-3 shadow-2xl shadow-black/20 sm:p-4">
        <p className="text-[11px] uppercase tracking-[0.22em] text-orange-300 sm:text-xs">Quiz topic</p>
        <p className="mt-1 text-sm text-slate-400">Select which topic quiz you want to manage.</p>

        <select
          value={selectedTopicId}
          onChange={(event) => onSelectTopic(event.target.value)}
          className="mt-4 w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition focus:border-orange-400"
        >
          {topics.map((topic) => (
            <option key={topic.tpc_id} value={topic.tpc_id}>
              {topic.tpc_title}
            </option>
          ))}
        </select>

        <div className="mt-5 space-y-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-3 text-sm text-slate-300 sm:p-4">
          <p className="text-sm font-semibold text-white">Topic details</p>
          <p className="text-sm leading-relaxed">{selectedTopic?.tpc_description ?? "Choose a topic to see quiz questions."}</p>
          <button
            type="button"
            disabled={!selectedTopic}
            onClick={() => selectedTopic && onCreateQuestion(selectedTopic)}
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-400 px-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:from-orange-400 hover:to-amber-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add question to this topic
          </button>
        </div>
      </div>

      <div className="min-w-0 space-y-4">
        <div className="flex flex-col gap-3 rounded-3xl border border-slate-700 bg-linear-to-br from-slate-700/80 via-slate-950 to-transparent p-3 shadow-2xl shadow-black/20 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 sm:text-xs">Questions</p>
            <p className="text-lg font-semibold text-white sm:text-xl">{questions.length} items</p>
          </div>
          <div className="min-w-0 break-words text-sm text-slate-400">
            {selectedTopic ? selectedTopic.tpc_title : "No topic selected"}
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-5 text-center text-slate-300">
            Loading question data...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-500/40 bg-red-500/5 p-5 text-sm text-red-200">
            {error}
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/80 p-5 text-sm text-slate-300">
            No quiz items found for this topic yet. Use <strong>Add question</strong> to create one.
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="min-w-0 rounded-3xl border border-slate-700 bg-slate-900/80 p-3 shadow-sm shadow-black/20 sm:p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 sm:text-xs">
                      Question {index + 1}
                    </p>
                    <p className="mt-2 break-words text-base font-semibold leading-snug text-white sm:text-lg">
                      {question.question}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:items-end">
                    <span className="w-fit rounded-full border border-orange-400/20 bg-orange-500/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] text-orange-200">
                      {question.difficulty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="inline-flex h-10 items-center justify-center rounded-xl border border-red-500/40 bg-red-500/10 px-3 text-sm font-semibold text-red-200 transition hover:bg-red-500/20"
                      disabled={loading}
                    >
                      Remove question
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {question.responses.map((response) => (
                    <div key={response.id} className="min-w-0 rounded-2xl border border-slate-700 bg-slate-950/80 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-slate-300">Answer</p>
                        {response.isCorrect ? (
                          <span className="rounded-full border border-orange-400/20 bg-orange-500/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                            Correct
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 break-words text-sm leading-relaxed text-slate-200">{response.response}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
