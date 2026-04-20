import { useState, useCallback } from "react";
import { Message, UserProfile } from "../types";

import { buildSystemPrompt } from "@/app/ai-tutor/lib/Prompt";
const uid = () => Math.random().toString(36).slice(2, 9);
export function useChat(profile: UserProfile) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "assistant",
      content: `Hey ${profile.name}! 👋 I've analyzed your learning profile.\n\nYour weakest area right now is **Pandas GroupBy** at 48% — let's fix that!`,
      timestamp: new Date(),
    },
  ]);
  const [loading, setLoading] = useState(false);

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

        setMessages((prev) => [
          ...prev,
          { id: aiMsgId, role: "assistant", content: "", timestamp: new Date() },
        ]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            for (const line of chunk.split("\n")) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") break;
                try {
                  const json = JSON.parse(data);
                  const delta =
                    json.delta?.text || json.choices?.[0]?.delta?.content || "";
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