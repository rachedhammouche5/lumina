"use client";

import { useState } from "react";
import SkillFormModal from "./SkillFormModal";
import { Skill } from "@/lib/database.types";
import Button from "@/app/ui/Button";
import { Plus } from "lucide-react";

export default function SkillsHeader({ teacher_id }: { teacher_id: string }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button variant="secondary" className="gap-3" onClick={() => setModalOpen(true)} >
        <Plus size={20} />
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