// DeleteSkillButton.tsx
"use client";

import { useState } from "react";
import { deleteSkill } from "./actions";

export default function DeleteSkillButton({
  skl_id,
  teacher_id,
}: {
  skl_id: string;
  teacher_id: string;
}) {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault(); // prevent Link navigation
    if (!confirm) {
      setConfirm(true);
      return;
    }
    setLoading(true);
    await deleteSkill(skl_id, teacher_id);
    setLoading(false);
  }

  function handleCancel(e: React.MouseEvent) {
    e.preventDefault();
    setConfirm(false);
  }

  if (confirm) {
    return (
      <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
        <span className="text-xs text-slate-400">Delete?</span>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="rounded px-2 py-0.5 text-xs font-medium bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 transition"
        >
          {loading ? "Deleting…" : "Yes"}
        </button>
        <button
          onClick={handleCancel}
          className="rounded px-2 py-0.5 text-xs font-medium bg-slate-600 text-white hover:bg-slate-500 transition"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded px-2 py-0.5 text-xs font-medium text-red-400 border border-red-800 hover:bg-red-900/40 transition"
    >
      Delete
    </button>
  );
}