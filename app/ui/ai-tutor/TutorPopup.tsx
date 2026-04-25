"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, X } from "lucide-react";
import { useProfile } from "@/app/ai-tutor/hooks/useProfile";
import { useChat } from "@/app/ai-tutor/hooks/useChat";
import MessageList from "./MessageList";

type Props = {
  open: boolean;
  onClose: () => void;
};

const QUICK_PROMPTS = [
  "What should I review next?",
  "Explain my weak points.",
  "Give me a short quiz.",
];

export default function TutorPopup({ open, onClose }: Props) {
  const { profile, profileLoading } = useProfile();
  const { messages, loading, sendMessage } = useChat(profile);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape as unknown as EventListener);
    return () => window.removeEventListener("keydown", handleEscape as unknown as EventListener);
  }, [open, onClose]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  const handleSend = (text: string) => {
    const next = text.trim();
    if (!next) return;
    sendMessage(next);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[70] transition duration-200 ${
        open ? "pointer-events-none opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!open}
    >
      <div className="relative flex h-full items-stretch justify-stretch p-0 sm:items-end sm:justify-end sm:p-4 lg:p-5">
        <section
          role="dialog"
          aria-modal="true"
          aria-label="AI Tutor popup"
          className={`pointer-events-auto flex h-[100dvh] w-full flex-col overflow-hidden border border-white/10 bg-[linear-gradient(180deg,#07101d_0%,#091525_52%,#040913_100%)] transition duration-200 sm:h-[min(78vh,720px)] sm:max-h-[calc(100vh-1.5rem)] sm:max-w-[390px] sm:rounded-[28px] sm:shadow-[0_28px_100px_rgba(0,0,0,0.56)] ${
            open ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]"
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(245,158,11,0.16),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(34,197,94,0.12),transparent_24%),radial-gradient(circle_at_74%_78%,rgba(14,165,233,0.12),transparent_30%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

          <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-4 pt-[calc(1rem+env(safe-area-inset-top))] sm:px-4 sm:py-4 sm:pt-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 text-slate-950 shadow-[0_14px_32px_rgba(245,158,11,0.3)] sm:h-10 sm:w-10">
                  <Bot size={18} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] uppercase tracking-[0.24em] text-sky-100/60 sm:text-[10px]">Quick chat</p>
                  <h2 className="truncate font-['Syne',sans-serif] text-sm font-bold text-white sm:text-base">
                    Study companion
                  </h2>
                  <p className="truncate text-[10px] text-slate-400 sm:text-[11px]">
                    {profileLoading ? "Loading your profile..." : `Personalized to ${profile.name}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/ai-tutor"
                  onClick={onClose}
                  className="hidden items-center gap-1.5 rounded-2xl border border-white/10 bg-white/5 px-2.5 py-2 text-[10px] font-semibold text-slate-200 transition hover:border-orange-400/30 hover:bg-orange-500/10 sm:inline-flex sm:text-[11px]"
                >
                  Open full tutor
                  <ArrowUpRight size={14} />
                </Link>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-orange-400/30 hover:bg-orange-500/10 sm:h-10 sm:w-10"
                  aria-label="Close AI tutor popup"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col p-3 sm:p-4">
              <div className="mb-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
                {QUICK_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-medium text-slate-200 transition hover:border-orange-400/30 hover:bg-orange-500/10 sm:text-[11px]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-[22px] border border-white/10 bg-slate-950/70 sm:rounded-[24px]">
                <MessageList messages={messages} loading={loading} profile={profile} />

                <div className="border-t border-white/10 bg-[rgba(10,14,26,0.72)] px-3 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl sm:px-4 sm:pb-3">
                  <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-[rgba(21,28,48,0.9)] px-3 py-2.5 focus-within:border-[rgba(232,114,12,0.4)] transition-colors">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(event) => {
                        setInput(event.target.value);
                        autoResize();
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask anything about your course..."
                      rows={1}
                      className="flex-1 min-h-[22px] max-h-[110px] resize-none border-none bg-transparent text-sm leading-snug text-[#c8d4e8] outline-none caret-[#e8720c] placeholder:text-[#3d4560]"
                    />
                    <button
                      type="button"
                      onClick={() => handleSend(input)}
                      disabled={!input.trim() || loading}
                      className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8720c] to-[#f4a435] text-white shadow-[0_2px_12px_rgba(232,114,12,0.4)] transition-opacity duration-150 disabled:cursor-default disabled:opacity-40"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[10px] text-[#2a3050] sm:text-[11px]">
                    Press Enter to send · Shift+Enter for new line
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
