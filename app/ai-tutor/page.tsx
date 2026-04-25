"use client";

import { useState, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { useProfile } from "./hooks/useProfile";
import { useChat } from "./hooks/useChat";
import MessageList from "@/app/ui/ai-tutor/MessageList";

const QUICK_PROMPTS = [
  "Summarize my weak areas.",
  "Give me a short practice quiz.",
  "Explain what I should revise next.",
];

export default function AITutorPage() {
  const { profile } = useProfile();
  const { messages, loading, sendMessage } = useChat(profile);
  const [input, setInput] = useState("");
  const [chipsVisible, setChipsVisible] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (text: string) => {
    const next = text.trim();
    if (!next) return;
    setChipsVisible(false);
    sendMessage(next);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#06101d_0%,#091525_48%,#040913_100%)] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(245,158,11,0.16),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(34,197,94,0.14),transparent_24%),radial-gradient(circle_at_74%_78%,rgba(14,165,233,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />

      <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col gap-4 px-3 py-4 sm:px-4 sm:py-6 lg:px-6">
        <header className="rounded-[24px] border border-white/10 bg-slate-950/70 px-4 py-4 shadow-[0_24px_80px_rgba(2,6,23,0.34)] backdrop-blur-xl sm:rounded-[30px] sm:px-5 sm:py-5 sm:px-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-sky-100/60">
                AI Tutor
              </div>
              <h1 className="mt-2 text-xl font-black tracking-tight text-white sm:text-2xl sm:text-3xl">
                Ask while you study.
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300/80">
                Use the chat to get explanations, examples, practice questions, or a quick recap of your weak areas without leaving this workspace.
              </p>
            </div>
          </div>
        </header>

        <section
          id="chat"
          className="flex min-h-[72vh] flex-1 flex-col overflow-hidden rounded-[24px] border border-white/10 bg-slate-950/70 shadow-[0_24px_80px_rgba(2,6,23,0.34)] backdrop-blur-xl sm:rounded-[30px]"
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-sky-100/60">Quick chat</p>
              <h2 className="text-base font-bold text-white">Study companion</h2>
            </div>
            <div className="text-xs text-slate-400">
              {loading ? "Thinking..." : "Ready"}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col">
            <MessageList messages={messages} loading={loading} profile={profile} />

            <div className="border-t border-white/10 bg-[rgba(10,14,26,0.72)] px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
              {chipsVisible && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSend(prompt)}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-medium text-slate-200 transition hover:border-orange-400/30 hover:bg-orange-500/10"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-end gap-2.5 rounded-2xl border border-white/10 bg-[rgba(21,28,48,0.9)] px-3 py-2.5 focus-within:border-[rgba(232,114,12,0.4)] transition-colors">
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
                  className="flex-1 min-h-[22px] max-h-[140px] resize-none border-none bg-transparent text-sm leading-snug text-[#c8d4e8] outline-none caret-[#e8720c] placeholder:text-[#3d4560]"
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
        </section>
      </div>
    </div>
  );
}
