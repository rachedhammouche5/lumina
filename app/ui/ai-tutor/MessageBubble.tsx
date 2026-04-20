import { Message, UserProfile } from "@/app/ai-tutor/types";
import { formatContent } from "@/app/ai-tutor/lib/formatContent";

export default function MessageBubble({
  msg,
  profile,
}: {
  msg: Message;
  profile: UserProfile;
}) {
  const isBot = msg.role === "assistant";
  return (
    <div
      className={`flex gap-3 items-end animate-[fadeSlideUp_0.25s_ease] ${
        isBot ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {isBot ? (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e8720c] to-[#f4a435] flex items-center justify-center text-[15px] flex-shrink-0 shadow-[0_2px_12px_rgba(232,114,12,0.4)]">
          ✦
        </div>
      ) : (
        <div className="w-8 h-8 rounded-xl bg-[rgba(99,102,241,0.2)] border border-[rgba(99,102,241,0.3)] flex items-center justify-center text-[11px] font-bold text-[#a5b4fc] font-[Syne,sans-serif] flex-shrink-0">
          {profile.name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="max-w-[72%]">
        {isBot ? (
          <div className="bg-[rgba(21,28,48,0.9)] border border-white/[0.08] rounded-tl-xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm px-4 py-3 text-sm leading-relaxed text-[#c8d4e8]">
            {formatContent(msg.content)}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#e8720c] to-[#f4a435] rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm px-4 py-3 text-sm leading-relaxed text-white shadow-[0_4px_20px_rgba(232,114,12,0.3)]">
            {formatContent(msg.content)}
          </div>
        )}
        <div className={`text-[11px] text-[#2a3050] mt-1.5 px-1 ${isBot ? "text-left" : "text-right"}`}>
          {isBot ? "AI Tutor" : "You"} ·{" "}
          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}