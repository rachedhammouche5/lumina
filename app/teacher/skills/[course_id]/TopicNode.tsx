"use client";

import { useState } from "react";
import { Topic } from "@/lib/database.types";
import { deleteTopic } from "./actions";
import { Trash2 } from "lucide-react";

export default function TopicNode({
  topic,
  allTopics,
  skillId,
  level,
  onAddTopic,
  onAddQuiz,
}: {
  topic: Topic;
  allTopics: Topic[];
  skillId: string;
  level: number;
  onAddTopic: (topic: Topic | null, editing: boolean) => void;
  onAddQuiz: (topic: Topic) => void;
}) {
  const children = allTopics.filter((item) => item.parent_id === topic.tpc_id);
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm) { setConfirm(true); return; }
    setLoading(true);
    await deleteTopic(topic.tpc_id, skillId);
    setLoading(false);
  }

  return (
    <li>
      <div
        className="space-y-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-sm shadow-black/20"
        style={{ marginLeft: `${level * 20}px` }}
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-white">{topic.tpc_title}</p>
            <p className="mt-1 text-xs text-slate-400">Topic node at level {level + 1}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onAddQuiz(topic)}
              className="inline-flex items-center justify-center rounded-xl border border-orange-400/40 bg-orange-500/10 px-3 py-2 text-xs font-semibold text-orange-100 transition hover:bg-orange-500/20"
            >
              Modify quiz
            </button>
            <button
              type="button"
              onClick={() => onAddTopic(topic, false)}
              className="inline-flex items-center justify-center rounded-xl border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Manage topic
            </button>

            {/* Delete with inline confirm */}
            {confirm ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400">Delete?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="rounded-lg bg-red-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-red-500 disabled:opacity-50"
                >
                  {loading ? "…" : "Yes"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirm(false)}
                  className="rounded-lg bg-slate-600 px-2 py-1 text-xs font-medium text-white transition hover:bg-slate-500"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center justify-center rounded-lg border border-red-500/30 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/20"
              >
                <Trash2 size={18}/>
              </button>
            )}
          </div>
        </div>
      </div>

      {children.length > 0 ? (
        <ul className="mt-2 space-y-2">
          {children.map((child) => (
            <TopicNode
              key={child.tpc_id}
              topic={child}
              allTopics={allTopics}
              skillId={skillId}
              level={level + 1}
              onAddTopic={onAddTopic}
              onAddQuiz={onAddQuiz}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
