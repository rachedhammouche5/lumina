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
      className={`flex items-end gap-3 animate-[fadeSlideUp_0.25s_ease] ${
        isBot ? "flex-row" : "flex-row-reverse"
      }`}
    >
      {isBot ? (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8720c] to-[#f4a435] text-[15px] shadow-[0_2px_12px_rgba(232,114,12,0.4)]">
          ✦
        </div>
      ) : (
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border border-[rgba(99,102,241,0.3)] bg-[rgba(99,102,241,0.2)] text-[11px] font-bold font-[Syne,sans-serif] text-[#a5b4fc]">
          {profile.name.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div className="max-w-[86%] sm:max-w-[72%]">
        {isBot ? (
          <div className="rounded-tl-xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm border border-white/[0.08] bg-[rgba(21,28,48,0.9)] px-4 py-3 text-sm leading-relaxed text-[#c8d4e8]">
            {formatContent(msg.content)}
          </div>
        ) : (
          <div className="rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl rounded-br-sm bg-gradient-to-br from-[#e8720c] to-[#f4a435] px-4 py-3 text-sm leading-relaxed text-white shadow-[0_4px_20px_rgba(232,114,12,0.3)]">
            {formatContent(msg.content)}
          </div>
        )}
        <div className={`mt-1.5 px-1 text-[10px] text-[#2a3050] sm:text-[11px] ${isBot ? "text-left" : "text-right"}`}>
          {isBot ? "AI Tutor" : "You"} ·{" "}
          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </div>
      </div>
    </div>
  );
}
