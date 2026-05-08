"use client";
import { useCallback, useState, useRef } from "react";
import { useProfile } from "./hooks/useProfile";
import { useChat } from "./hooks/useChat";
import MessageList from "@/app/ui/ai-tutor/MessageList";
import { useVoiceInput, VOICE_LANGS } from "@/lib/hooks/useVoiceInput";

export default function AITutorPage() {
  const { profile, profileLoading } = useProfile();
  const { messages, loading, sendMessage } = useChat(profile, profileLoading);
  const [input, setInput] = useState("");
  const [chipsVisible, setChipsVisible] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    setChipsVisible(false);
    sendMessage(text);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const handleVoiceTranscript = useCallback((text: string) => {
    setInput(prev => prev + (prev.trim() ? " " : "") + text);
    requestAnimationFrame(autoResize);
  }, []);

  const {
    voiceState, interimText: voiceInterim, lang, setLang,
    startListening, stopListening, voiceError: micError, isSupported, permissionState, requestPermission,
  } = useVoiceInput(handleVoiceTranscript);

  return (
    <div className="relative min-h-screen bg-[#080c18] overflow-hidden font-[DM_Sans,system-ui,sans-serif]">
      {/* Ambient orbs */}
      <div className="fixed -top-30 -left-30 w-[500px] h-[500px] rounded-full pointer-events-none z-0 animate-[float_8s_ease-in-out_infinite] bg-[radial-gradient(circle,rgba(232,114,12,0.12)_0%,transparent_70%)]" />
      <div className="fixed -bottom-20 -right-20 w-[400px] h-[400px] rounded-full pointer-events-none z-0 animate-[float_10s_ease-in-out_infinite_reverse] bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,transparent_70%)]" />
      <div className="fixed top-[40%] left-[35%] w-[300px] h-[300px] rounded-full pointer-events-none z-0 animate-[float_12s_ease-in-out_2s_infinite] bg-[radial-gradient(circle,rgba(14,165,233,0.06)_0%,transparent_70%)]" />

      <div className="relative z-10 flex h-screen">
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-7 py-4 border-b border-white/[0.07] bg-[rgba(10,14,26,0.6)] backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#e8720c] to-[#f4a435] flex items-center justify-center text-lg flex-shrink-0 shadow-[0_4px_20px_rgba(232,114,12,0.35)]">
                ✦
              </div>
              <div>
                <div className="text-base font-semibold text-white font-[Syne,sans-serif]">
                  AI Tutor
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#7c83a0] mt-0.5">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#2ecc71] shadow-[0_0_6px_rgba(46,204,113,0.6)]" />
                  Personalized to {profile.name}
                </div>
              </div>
            </div>
            <span className="bg-[rgba(232,114,12,0.1)] border border-[rgba(232,114,12,0.3)] text-[#e8720c] text-xs font-medium px-3.5 py-1.5 rounded-full">
              {profile.currentSkill}
            </span>
          </div>

          {/* Messages */}
          <MessageList messages={messages} loading={loading} profile={profile} />

          {/* Input area */}
          <div className="px-7 pb-6 pt-3 border-t border-white/[0.07] bg-[rgba(10,14,26,0.6)] backdrop-blur-xl flex-shrink-0">
            <div className="flex gap-2.5 items-end bg-[rgba(21,28,48,0.9)] border border-white/10 rounded-2xl px-3 py-2.5 focus-within:border-[rgba(232,114,12,0.4)] transition-colors">
              <div className="flex-1 min-w-0">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); autoResize(); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your course…"
                  rows={1}
                  className="w-full bg-transparent border-none outline-none text-[#c8d4e8] text-sm font-[DM_Sans,sans-serif] resize-none min-h-[22px] max-h-[120px] leading-snug caret-[#e8720c] placeholder:text-[#3d4560]"
                />
                {voiceInterim && (
                  <p className="mt-1 text-xs italic text-[#3d4560]">{voiceInterim}…</p>
                )}
              </div>
              {/* DEBUG: Always show voice button for testing */}
              {true && (
                <button
                  type="button"
                  onClick={() => {
                    console.log('🎤 AI Tutor button clicked! permissionState:', permissionState, 'voiceState:', voiceState);
                    if (permissionState === 'denied') {
                      console.log('Calling requestPermission');
                      requestPermission();
                    } else if (voiceState === "listening") {
                      console.log('Calling stopListening');
                      stopListening();
                    } else {
                      console.log('Calling startListening');
                      startListening();
                    }
                  }}
                  disabled={loading}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-150 disabled:opacity-40 ${
                    permissionState === 'denied'
                      ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
                      : voiceState === "listening"
                      ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
                      : "bg-white/5 text-[#7c83a0] hover:text-white hover:bg-white/10"
                  }`}
                >
                  {voiceState === "listening" ? (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="6" width="12" height="12" rx="2"/></svg>
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                  )}
                </button>
              )}
              <button
                onClick={() => handleSend(input)}
                disabled={!input.trim() || loading}
                className="w-9 h-9 bg-gradient-to-br from-[#e8720c] to-[#f4a435] border-none rounded-xl cursor-pointer flex items-center justify-center flex-shrink-0 transition-opacity duration-150 shadow-[0_2px_12px_rgba(232,114,12,0.4)] disabled:opacity-40 disabled:cursor-default"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-0.5">
                {VOICE_LANGS.map(l => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => setLang(l.code)}
                    className={`rounded-lg px-2 py-1 text-[11px] font-bold transition ${
                      lang === l.code
                        ? "bg-white/10 text-[#c8d4e8]"
                        : "text-[#2a3050] hover:text-[#7c83a0]"
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <div className="text-[11px] text-[#2a3050]">
                Press Enter to send · Shift+Enter for new line
              </div>
            </div>
            {micError && (
              <p className="mt-2 rounded-xl border border-orange-500/20 bg-orange-900/10 px-3 py-2 text-xs text-orange-400">
                {micError}
              </p>
            )}
          </div>

        </main>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.04); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
      `}</style>
    </div>
  );
}