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
        className="space-y-1 rounded-md border border-slate-700 bg-slate-800 p-3"
        style={{ marginLeft: `${level * 20}px` }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex">
            <p className="font-semibold text-white">{topic.tpc_title}</p>
            <button
              type="button"
              onClick={() => onAddTopic(topic, true)}
              className="rounded-md underline px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-700"
            >
              edit Topic
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onAddQuiz(topic)}
              className="rounded-md border border-amber-400/60 px-2 py-1 text-xs text-amber-200 transition hover:bg-amber-500/20"
            >
              Add Quiz
            </button>
            <button
              type="button"
              onClick={() => onAddTopic(topic, false)}
              className="rounded-md border border-slate-500 px-2 py-1 text-xs text-slate-200 transition hover:bg-slate-700"
            >
              Add Topic
            </button>

            {/* Delete with inline confirm */}
            {confirm ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400">Delete?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="rounded px-2 py-0.5 text-xs font-medium bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 transition"
                >
                  {loading ? "…" : "Yes"}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirm(false)}
                  className="rounded px-2 py-0.5 text-xs font-medium bg-slate-600 text-white hover:bg-slate-500 transition"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDelete}
                className="p-1 text-xs text-red-400 transition hover:bg-red-900/40"
              >
                <Trash2 size={20}/>
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