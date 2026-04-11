"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skill } from "@/lib/database.types";
import { deleteSkill } from "./actions";
import SkillFormModal from "./SkillFormModal";

export default function SkillCard({
  skill,
  teacher_id,
}: {
  skill: Skill;
  teacher_id: string;
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault();
    if (!confirm) { setConfirm(true); return; }
    setDeleting(true);
    await deleteSkill(skill.skl_id, teacher_id);
    setDeleting(false);
  }

  return (
    <>
      <li>
        <Link
          href={`/teacher/skills/${skill.skl_id}`}
          className="block rounded-lg border border-slate-700 bg-slate-800 transition hover:border-indigo-400 hover:bg-slate-700 overflow-hidden"
        >
          {/* Cover image */}
          {skill.skl_picture && (
            <div className="relative h-36 w-full">
              <Image
                src={skill.skl_picture}
                alt={skill.skl_title}
                fill
                className="object-cover"
              />
            </div>
          )}

          <div className="px-4 py-3 space-y-1">
            <p className="font-semibold text-white">{skill.skl_title}</p>
            <p className="text-sm text-slate-300">{skill.skl_dscrptn}</p>
            <p className="text-xs text-slate-400">Duration: {skill.skl_duration}h</p>
          </div>

          {/* Actions row — stop propagation so Link doesn't fire */}
          <div
            className="flex justify-end gap-2 border-t border-slate-700 px-4 py-2"
            onClick={(e) => e.preventDefault()}
          >
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); setEditOpen(true); }}
              className="rounded border border-indigo-600 px-2 py-0.5 text-xs text-indigo-300 transition hover:bg-indigo-900/40"
            >
              Edit
            </button>

            {confirm ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400">Delete?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded px-2 py-0.5 text-xs font-medium bg-red-600 text-white hover:bg-red-500 disabled:opacity-50 transition"
                >
                  {deleting ? "…" : "Yes"}
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); setConfirm(false); }}
                  className="rounded px-2 py-0.5 text-xs font-medium bg-slate-600 text-white hover:bg-slate-500 transition"
                >
                  No
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleDelete}
                className="rounded border border-red-800 px-2 py-0.5 text-xs text-red-400 transition hover:bg-red-900/40"
              >
                Delete
              </button>
            )}
          </div>
        </Link>
      </li>

      {editOpen && (
        <SkillFormModal
          teacher_id={teacher_id}
          editingSkill={skill}
          onClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
}