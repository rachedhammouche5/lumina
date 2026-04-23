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
      <div className="rounded-3xl border border-slate-700 bg-slate-950/90 p-4 shadow-2xl shadow-slate-950/40">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Topic</p>
            <p className="text-sm text-slate-400">Select which topic quiz you want to manage.</p>
          </div>
        </div>

        <select
          value={selectedTopicId}
          onChange={(event) => onSelectTopic(event.target.value)}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-3 py-3 text-sm text-white outline-none transition focus:border-orange-400"
        >
          {topics.map((topic) => (
            <option key={topic.tpc_id} value={topic.tpc_id}>
              {topic.tpc_title}
            </option>
          ))}
        </select>

        <div className="mt-6 space-y-3 rounded-3xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-300">
          <p className="font-semibold text-white">Topic details</p>
          <p>{selectedTopic?.tpc_description ?? "Choose a topic to see quiz questions."}</p>
          <button
            type="button"
            disabled={!selectedTopic}
            onClick={() => selectedTopic && onCreateQuestion(selectedTopic)}
            className="w-full rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-sm font-semibold text-orange-100 transition hover:bg-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Add question to this topic
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-3 rounded-3xl border border-slate-700 bg-slate-950 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-slate-500">Questions</p>
            <p className="text-xl font-semibold text-white">{questions.length} items</p>
          </div>
          <div className="text-right text-sm text-slate-400">
            {selectedTopic ? selectedTopic.tpc_title : "No topic selected"}
          </div>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 text-center text-slate-300">
            Loading question data...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-500/40 bg-red-500/5 p-6 text-sm text-red-200">
            {error}
          </div>
        ) : questions.length === 0 ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-950 p-6 text-slate-300">
            No quiz items found for this topic yet. Use <strong>Add question</strong> to create one.
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((question, index) => (
              <div key={question.id} className="rounded-3xl border border-slate-700 bg-slate-900 p-4 shadow-sm shadow-slate-950/50">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Question {index + 1}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{question.question}</p>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                      {question.difficulty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200 transition hover:bg-red-500/20"
                      disabled={loading}
                    >
                      Remove question
                    </button>
                  </div>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {question.responses.map((response) => (
                    <div key={response.id} className="rounded-2xl border border-slate-700 bg-slate-950 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-sm text-slate-300">Answer</p>
                        {response.isCorrect ? (
                          <span className="rounded-full bg-orange-500/15 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-300">
                            Correct
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm text-slate-200">{response.response}</p>
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
