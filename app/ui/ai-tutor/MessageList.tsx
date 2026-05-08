import { useEffect, useRef } from "react";
import { Message, UserProfile } from "@/app/ai-tutor/types";
import MessageBubble from "./MessageBubble";

export default function MessageList({
  messages,
  loading,
  profile,
}: {
  messages: Message[];
  loading: boolean;
  profile: UserProfile;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [messages, loading]);

  return (
    <div ref={ref} className="pretty-scrollbar flex flex-1 flex-col gap-3 overflow-y-scroll p-3 sm:gap-4 sm:p-5">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} profile={profile} />
      ))}
      {loading && (
        <div className="flex items-end gap-3 animate-[fadeSlideUp_0.25s_ease]">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#e8720c] to-[#f4a435] flex items-center justify-center text-[15px] flex-shrink-0">
            ✦
          </div>
          <div className="bg-[rgba(21,28,48,0.9)] border border-white/[0.08] rounded-tl-xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm px-4 py-3">
            <div className="flex gap-1.5 items-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-[7px] h-[7px] rounded-full bg-[#e8720c] animate-[bounce_1.1s_infinite]"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
