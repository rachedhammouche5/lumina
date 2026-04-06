"use client";

import { useState } from "react";
import SkillFormModal from "./SkillFormModal";
import { Skill } from "@/lib/database.types";

export default function SkillsHeader({ teacher_id }: { teacher_id: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Skills</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
        >
          + Add Skill
        </button>
      </div>

      {modalOpen && (
        <SkillFormModal
          teacher_id={teacher_id}
          editingSkill={null}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}