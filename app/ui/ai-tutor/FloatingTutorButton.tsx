"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import TutorPopup from "./TutorPopup";

export default function FloatingTutorButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[200] pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full border border-orange-400/30 bg-gradient-to-br from-[#e8720c] to-[#f4a435] text-white shadow-[0_18px_40px_rgba(232,114,12,0.35)] transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
        aria-label="Open AI tutor"
        title="Open AI tutor"
      >
        <Bot size={24} />
      </button>

      {open ? <TutorPopup open={open} onClose={() => setOpen(false)} /> : null}
    </>
  );
}
