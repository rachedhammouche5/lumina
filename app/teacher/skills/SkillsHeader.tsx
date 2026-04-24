"use client";

import { useState } from "react";
import SkillFormModal from "./SkillFormModal";
import Button from "@/app/ui/Button";
import { Plus } from "lucide-react";

export default function SkillsHeader({ teacher_id }: { teacher_id: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="s"
        className="w-full gap-2 sm:w-auto"
        onClick={() => setModalOpen(true)}
      >
        <Plus size={16} />
        Add Skill
      </Button>

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
