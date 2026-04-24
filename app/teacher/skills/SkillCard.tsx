"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Skill } from "@/lib/database.types";
import { deleteSkill } from "./actions";
import SkillFormModal from "./SkillFormModal";
import { Clock3, Pencil, Trash2, Star } from "lucide-react";
import Button from "@/app/ui/Button";

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
      <li className="list-none">
        <Link
          href={`/teacher/skills/${skill.skl_id}`}
          className="group block overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-b from-slate-700 to-slate-950 transition hover:-translate-y-0.5 hover:border-indigo-400/60 hover:shadow-xl hover:shadow-indigo-500/10"
        >
          <div className="relative h-36 w-full">
            {skill.skl_picture ? (
              <Image
                src={skill.skl_picture}
                alt={skill.skl_title}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-800 text-sm font-semibold text-slate-500">
                No image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          </div>

          <div className="space-y-2 px-4 py-4">
            <p className="line-clamp-1 text-lg font-semibold text-white">{skill.skl_title}</p>
            <p className="line-clamp-2 min-h-10 text-sm text-slate-300">{skill.skl_dscrptn}</p>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 px-2.5 py-1 text-xs font-semibold text-orange-200">
              <Clock3 size={12} />
              {skill.skl_duration ?? "N/A"}h
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-yellow-400/80 bg-yellow-500/10 px-2.5 py-1 text-xs font-semibold text-yellow-200">
              <Star size={12} />
              N/A
            </div>
          </div>

          <div
            className="flex justify-end gap-2 border-t border-slate-700 px-4 py-3"
            onClick={(e) => e.preventDefault()}
          >
            <Button
              type="button"
              variant="outline"
              onClick={(e) => { e.preventDefault(); setEditOpen(true); }}
              className="inline-flex items-center gap-1 rounded-lg border border-indigo-500/40 px-2.5 py-1 text-xs font-semibold text-indigo-200 transition hover:bg-indigo-500/20"
            >
              <Pencil size={12} />
              Edit
            </Button>

            {confirm ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-slate-400">Delete?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white transition hover:bg-red-500 disabled:opacity-50"
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
              <Button
                type="button"
                variant="primary"
                onClick={handleDelete}
                  className="inline-flex items-center gap-1 rounded-lg border border-red-500/40 px-2.5 py-1 text-xs font-semibold text-red-900 transition hover:bg-red-500/20"
              >
                  <Trash2 size={12} />
                Delete
              </Button>
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