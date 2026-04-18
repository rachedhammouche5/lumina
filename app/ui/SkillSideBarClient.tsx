"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import type { Skill } from "@/lib/database.types";
import { deleteSkill } from "@/app/teacher/skills/actions";
import SkillFormModal from "@/app/teacher/skills/SkillFormModal";
import Button from "./Button";

export default function SkillSideBarClient({
  teacherId,
  skills,
}: {
  teacherId: string;
  skills: Pick<Skill, "skl_id" | "skl_title" | "skl_picture">[];
}) {
  const router = useRouter();
  const [showAddModal, setShowAddModal] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDeleteSkill = async (event: React.MouseEvent, skillId: string) => {
    event.preventDefault();
    event.stopPropagation();

    if (pendingDeleteId !== skillId) {
      setPendingDeleteId(skillId);
      return;
    }

    setDeleting(true);
    const result = await deleteSkill(skillId, teacherId);
    setDeleting(false);
    if ("error" in result && result.error) {
      console.error(result.error);
      return;
    }
    setPendingDeleteId(null);
    router.refresh();
  };

  return (
    <>
      <aside className="h-full w-full border border-slate-700/50 bg-gradient-to-br from-slate-800/90 to-slate-950/80 p-4">
        <div className="mb-6 flex items-center justify-between border-b border-slate-700 pb-4">
          <h2 className="text-lg font-semibold uppercase text-white">Skill library</h2>
          <Button
            variant="outline"
            onClick={() => setShowAddModal(true)}
            title="Add skill"
          >
            <Plus size={20}/>
          </Button>
        </div>

        <div className="space-y-2">
          {skills.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-3 text-sm text-slate-400">
              You have no skills yet. Use + to create your first one.
            </p>
          ) : (
            skills.map((skill) => (
              <Link
                key={skill.skl_id}
                href={`/teacher/skills/${skill.skl_id}`}
                className="flex items-center gap-3 rounded-xl border border-slate-700/60 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 p-2.5 transition shadow-2xl shadow-black hover:border-slate-500 hover:bg-slate-800/70"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-slate-700 bg-slate-800">
                  {skill.skl_picture ? (
                    <Image src={skill.skl_picture} alt={skill.skl_title} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-500">
                      No image
                    </div>
                  )}
                </div>

                <p className="line-clamp-2 flex-1 text-sm font-medium text-slate-200">{skill.skl_title}</p>

                <button
                  type="button"
                  onClick={(event) => handleDeleteSkill(event, skill.skl_id)}
                  disabled={deleting && pendingDeleteId === skill.skl_id}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-400/40 bg-red-500/100 text-red-200 transition hover:bg-red-500/20 disabled:opacity-50 hover:cursor-pointer"
                  title={pendingDeleteId === skill.skl_id ? "Click again to confirm delete" : "Delete skill"}
                >
                  <Trash2 size={16} />
                </button>
              </Link>
            ))
          )}
        </div>
      </aside>

      {showAddModal ? (
        <SkillFormModal teacher_id={teacherId} editingSkill={null} onClose={() => setShowAddModal(false)} />
      ) : null}
    </>
  );
}
