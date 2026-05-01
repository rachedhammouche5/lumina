"use client";

import { useState } from "react";
import SkillFormModal from "./SkillFormModal";
import { Plus } from "lucide-react";

export default function SkillsHeader({ teacher_id }: { teacher_id: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-2 rounded-2xl border border-indigo-500/40 bg-indigo-600/20 px-5 py-2.5 text-sm font-semibold text-indigo-200 shadow-lg shadow-indigo-900/20 transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-400/70 hover:bg-indigo-500/30 hover:text-white hover:shadow-indigo-800/30"
      >
        <Plus size={16} />
        Add Skill
      </button>

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