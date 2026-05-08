import { useState, useCallback, useEffect, useRef } from "react";
import { Message, UserProfile } from "../types";

import { buildSystemPrompt } from "@/app/ai-tutor/lib/Prompt";
const uid = () => Math.random().toString(36).slice(2, 9);
function buildInitialMessage(profile: UserProfile): Message {
  const weakest = profile.weakPoints[0];
  const content = weakest
    ? `Hey ${profile.name}! 👋 I've analyzed your learning profile.\n\nYour weakest area right now is **${weakest.topic}** at ${weakest.score}% — let's work on that!`
    : `Hey ${profile.name}! 👋 I'm your AI tutor for **${profile.currentSkill || "your course"}**. What would you like to learn today?`;

  return { id: uid(), role: "assistant", content, timestamp: new Date() };
}

export function useChat(profile: UserProfile, profileLoading = false) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (profileLoading || initialized.current) return;
    initialized.current = true;
    setMessages([buildInitialMessage(profile)]);
  }, [profileLoading, profile]);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setLoading(true);

      const history = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch("/api/ai-tutor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: history,
            systemPrompt: buildSystemPrompt(profile),
          }),
        });

        if (!res.ok) {
          let errorMessage = `Request failed with status ${res.status}`;
          try {
            const payload = await res.json();
            if (payload?.error) errorMessage = payload.error;
          } catch {}
          throw new Error(errorMessage);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let aiText = "";
        const aiMsgId = uid();
        let buffer = "";

        setMessages((prev) => [
          ...prev,
          { id: aiMsgId, role: "assistant", content: "", timestamp: new Date() },
        ]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const events = buffer.split("\n\n");
            buffer = events.pop() ?? "";

            for (const event of events) {
              for (const line of event.split("\n")) {
                if (!line.startsWith("data: ")) continue;
                const data = line.slice(6);
                if (data === "[DONE]") continue;
                try {
                  const json = JSON.parse(data);
                  const delta =
                    json.delta?.text || json.choices?.[0]?.delta?.content || "";
                  if (!delta) continue;
                  aiText += delta;
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === aiMsgId ? { ...m, content: aiText } : m
                    )
                  );
                } catch {}
              }
            }
          }
        }
      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content:
              error instanceof Error
                ? error.message
                : "Sorry, something went wrong. Please try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading, profile]
  );

  return { messages, loading, sendMessage };
}
