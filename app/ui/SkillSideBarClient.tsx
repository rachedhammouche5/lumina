"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, BookOpen, Home, Plus, Trash2 } from "lucide-react";
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
  const pathname = usePathname();
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
      <aside className="hidden h-[calc(100vh-8rem)] w-full overflow-hidden rounded-2xl border border-slate-700/70 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 shadow-2xl shadow-black/40 lg:flex lg:flex-col">
        <div className="border-b border-slate-700/70 p-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Teacher space</p>
              <h2 className="mt-1 text-lg font-semibold text-white">Skill Library</h2>
            </div>
            <Button variant="outline" onClick={() => setShowAddModal(true)} title="Add skill">
              <Plus size={20} />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/teacher"
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                pathname === "/teacher"
                  ? "border-orange-400/50 bg-orange-500/15 text-orange-200"
                  : "border-slate-700 bg-slate-800/70 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              <Home size={16} />
              Home
            </Link>
            <Link
              href="/teacher/dashboard"
              className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
                pathname === "/teacher/dashboard"
                  ? "border-orange-400/50 bg-orange-500/15 text-orange-200"
                  : "border-slate-700 bg-slate-800/70 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
            >
              <BarChart3 size={16} />
              Analytics
            </Link>
          </div>

          <div className="mt-3 rounded-xl border border-slate-700 bg-slate-800/50 p-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Skills</p>
            <p className="mt-1 text-2xl font-semibold text-white">{skills.length}</p>
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto p-4">
          {skills.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-700 bg-slate-900/60 p-3 text-sm text-slate-400">
              You have no skills yet. Use + to create your first one.
            </p>
          ) : (
            skills.map((skill) => (
              <Link
                key={skill.skl_id}
                href={`/teacher/skills/${skill.skl_id}`}
                className={`group flex items-center gap-3 rounded-xl border p-2.5 transition ${
                  pathname === `/teacher/skills/${skill.skl_id}`
                    ? "border-orange-400/50 bg-orange-500/10"
                    : "border-slate-700/60 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 hover:border-slate-500 hover:bg-slate-800/70"
                }`}
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
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-400/40 bg-red-500/10 text-red-200 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                  title={pendingDeleteId === skill.skl_id ? "Click again to confirm delete" : "Delete skill"}
                >
                  <Trash2 size={16} />
                </button>
              </Link>
            ))
          )}
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-700 bg-slate-900/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="mx-auto flex w-full max-w-[1536px] items-center justify-between gap-2">
          <Link
            href="/teacher"
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
              pathname === "/teacher" ? "bg-orange-500/15 text-orange-200" : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Home size={16} />
            Home
          </Link>
          <Link
            href="/teacher/skills"
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
              pathname.startsWith("/teacher/skills")
                ? "bg-orange-500/15 text-orange-200"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <BookOpen size={16} />
            Skills
          </Link>
          <Link
            href="/teacher/dashboard"
            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
              pathname === "/teacher/dashboard"
                ? "bg-orange-500/15 text-orange-200"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <BarChart3 size={16} />
            Analytics
          </Link>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-orange-400/40 bg-orange-500/15 text-orange-200 transition hover:bg-orange-500/25"
            title="Add skill"
          >
            <Plus size={18} />
          </button>
        </div>
      </nav>

      {showAddModal ? (
        <SkillFormModal teacher_id={teacherId} editingSkill={null} onClose={() => setShowAddModal(false)} />
      ) : null}
    </>
  );
}
