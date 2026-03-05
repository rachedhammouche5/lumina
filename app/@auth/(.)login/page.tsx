"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import LoginPageView from "@/app/ui/auth/LoginPageView";

export default function LoginModal() {
  const router = useRouter();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isClosingRef = useRef(false);

  const closeModal = () => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsOpen(false);
    window.setTimeout(() => {
      if (window.history.length > 1) router.back();
      else router.push("/");
    }, 180);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    panelRef.current?.focus();
    const frame = window.requestAnimationFrame(() => setIsOpen(true));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);



  return (
    <div
      className={`fixed inset-0 z-[2000] bg-black/55 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-200 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={closeModal}
      aria-hidden="true"
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Login modal"
        className={`relative w-full max-w-2xl outline-none transition-all duration-200 ${
          isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-2 scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeModal}
          className="absolute right-3 top-3 z-10 rounded-full border border-slate-600 bg-slate-800/95 p-2 text-white shadow-lg hover:bg-slate-700"
          aria-label="Close login modal"
        >
          <X size={16} />
        </button>

        <LoginPageView />
      </div>
    </div>
  );
}
