"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  BookOpenText,
  BrainCircuit,
  Flame,
  LibraryBig,
  ScanSearch,
  SendHorizontal,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface UserProfile {
  name: string;
  currentSkill: string;
  weakPoints: { topic: string; skill: string; score: number }[];
  strongPoints: { topic: string; skill: string; score: number }[];
  streak: number;
}

type TutorMode = "ready" | "live" | "retrieval_fallback";
type NoticeTone = "neutral" | "success" | "warning";

type TutorNotice = {
  title: string;
  body: string;
  tone: NoticeTone;
};

const MOCK_PROFILE: UserProfile = {
  name: "RachedPhone",
  currentSkill: "Python for Data Science",
  streak: 1,
  weakPoints: [
    { topic: "Pandas GroupBy", skill: "Python for Data Science", score: 48 },
    { topic: "List Comprehensions", skill: "Python Basics", score: 55 },
  ],
  strongPoints: [
    { topic: "Data Cleaning", skill: "Python for Data Science", score: 91 },
    { topic: "Joins & Aggregation", skill: "SQL for Developers", score: 88 },
  ],
};

const DEFAULT_PROMPTS = [
  "Summarize the chunk that explains Pandas GroupBy.",
  "What does my course material say about syntax errors?",
  "Give me a short quiz from the uploaded content.",
  "What should I review next from my weak areas?",
];

const RECOVERY_PROMPTS = [
  "Search my uploaded material for Pandas GroupBy.",
  "Show the most relevant chunk about syntax errors.",
  "Find 3 chunks about list comprehensions.",
  "Pull the key ideas from my uploaded course notes.",
];

const MODE_COPY: Record<
  TutorMode,
  { label: string; description: string; tone: NoticeTone }
> = {
  ready: {
    label: "Ready",
    description: "Ask about your uploaded lessons and Lumina will search them first.",
    tone: "neutral",
  },
  live: {
    label: "Live AI",
    description: "Gemini is active and grounded on your retrieved course chunks.",
    tone: "success",
  },
  retrieval_fallback: {
    label: "Retrieval Backup",
    description: "Live generation is offline, so Lumina is answering directly from stored chunks.",
    tone: "warning",
  },
};

const QUOTA_LINKS = [
  {
    href: "https://ai.google.dev/gemini-api/docs/rate-limits",
    label: "Rate limits",
  },
  {
    href: "https://ai.google.dev/gemini-api/docs/billing",
    label: "Billing",
  },
];

const SURFACE =
  "rounded-[28px] border border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_24px_80px_rgba(2,6,23,0.34)]";

function createId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return Math.random().toString(36).slice(2, 10);
}

function buildSystemPrompt(profile: UserProfile) {
  const weak = profile.weakPoints
    .map((point) => `- ${point.topic} (${point.skill}): ${point.score}%`)
    .join("\n");

  const strong = profile.strongPoints
    .map((point) => `- ${point.topic} (${point.skill}): ${point.score}%`)
    .join("\n");

  return `You are Lumina AI Tutor, a personalized coding tutor.
You are tutoring ${profile.name}, currently studying "${profile.currentSkill}".

Weak areas:
${weak}

Strong areas:
${strong}

Guidelines:
- Be concise, warm, and encouraging.
- Use examples when they help.
- Prefer the uploaded course material over general knowledge.
- After each answer, suggest one next step or one practice question.`;
}

function buildNoticeFromMessage(message: string): TutorNotice {
  const lowered = message.toLowerCase();

  if (lowered.includes("quota")) {
    return {
      title: "Gemini quota reached",
      body: message,
      tone: "warning",
    };
  }

  if (lowered.includes("configured") || lowered.includes("api key")) {
    return {
      title: "Gemini is not configured",
      body: message,
      tone: "warning",
    };
  }

  return {
    title: "Tutor update",
    body: message,
    tone: "neutral",
  };
}

function formatContent(text: string): ReactNode[] {
  const parts = text.split(/(```[\s\S]*?```)/g);

  return parts.map((part, index) => {
    if (part.startsWith("```")) {
      const code = part.replace(/^```\w*\n?/, "").replace(/```$/, "");

      return (
        <div
          key={index}
          className="mt-3 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
          <pre className="overflow-x-auto px-4 py-4 text-sm leading-7 text-slate-200">
            {code}
          </pre>
        </div>
      );
    }

    const boldSegments = part.split(/(\*\*.*?\*\*)/g).map((segment, boldIndex) =>
      segment.startsWith("**") ? (
        <strong key={boldIndex} className="font-semibold text-amber-200">
          {segment.slice(2, -2)}
        </strong>
      ) : (
        segment
      ),
    );

    return (
      <span key={index} className="whitespace-pre-wrap">
        {boldSegments}
      </span>
    );
  });
}

function InsightCard({
  icon: Icon,
  label,
  value,
  description,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  description: string;
  tone: NoticeTone;
}) {
  const toneClasses =
    tone === "success"
      ? "bg-emerald-900/20"
      : tone === "warning"
        ? "bg-amber-900/20"
        : "bg-slate-900/60";

  return (
    <div className={`rounded-3xl border border-white/10 ${toneClasses} p-4`}>
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-slate-50">
          <Icon size={18} />
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] text-sky-100/65">
            {label}
          </div>
          <div className="mt-2 text-lg font-semibold text-white">{value}</div>
          <p className="mt-2 text-sm leading-6 text-slate-300/80">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function ProgressList({
  title,
  items,
  tone,
}: {
  title: string;
  items: UserProfile["weakPoints"] | UserProfile["strongPoints"];
  tone: "warning" | "success";
}) {
  const scoreClass =
    tone === "warning" ? "text-amber-300" : "text-emerald-300";
  const fillClass =
    tone === "warning"
      ? "from-amber-400 to-rose-400"
      : "from-emerald-400 to-lime-400";

  return (
    <div className={`${SURFACE} p-5`}>
      <div className="text-[11px] uppercase tracking-[0.22em] text-sky-100/65">
        {title}
      </div>
      <div className="mt-4 space-y-4">
        {items.map((item) => (
          <div key={item.topic} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-2">
            <div className="min-w-0">
              <div className="truncate font-semibold text-white">{item.topic}</div>
              <div className="mt-1 text-sm text-slate-400">{item.skill}</div>
            </div>
            <div className={`text-sm font-semibold ${scoreClass}`}>{item.score}%</div>
            <div className="col-span-full h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${fillClass}`}
                style={{ width: `${item.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TutorPageView() {
  const [messages, setMessages] = useState<Message[]>(() => [
    {
      id: "intro",
      role: "assistant",
      content:
        "I am connected to your uploaded course material. Ask about a lesson, concept, or keyword and I will ground the answer in the retrieved chunks first.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tutorMode, setTutorMode] = useState<TutorMode>("ready");
  const [tutorNotice, setTutorNotice] = useState<TutorNotice | null>(null);
  const [lastSourceCount, setLastSourceCount] = useState(0);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [chipsVisible, setChipsVisible] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  function autoResize() {
    const element = textareaRef.current;
    if (!element) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 180)}px`;
  }

  function applyMeta(meta: Record<string, unknown>) {
    if (meta.mode === "live" || meta.mode === "retrieval_fallback") {
      setTutorMode(meta.mode);
    }

    if (typeof meta.chunkCount === "number") {
      setLastSourceCount(meta.chunkCount);
    }

    if (typeof meta.model === "string" && meta.model.length > 0) {
      setActiveModel(meta.model);
    }

    if (typeof meta.notice === "string" && meta.notice.length > 0) {
      setTutorNotice({
        title: meta.mode === "live" ? "Live AI active" : "Course retrieval backup",
        body: meta.notice,
        tone: meta.mode === "live" ? "success" : "warning",
      });
    }
  }

  async function sendMessage(rawText: string) {
    const text = rawText.trim();
    if (!text || loading) {
      return;
    }

    setChipsVisible(false);

    const userMessage: Message = {
      id: createId(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setTutorNotice(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setLoading(true);

    const history = [...messages, userMessage].map((message) => ({
      role: message.role,
      content: message.content,
    }));

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history,
          systemPrompt: buildSystemPrompt(MOCK_PROFILE),
        }),
      });

      if (!response.ok) {
        let errorMessage = `Request failed with status ${response.status}`;

        try {
          const payload = (await response.json()) as { error?: string };
          if (payload.error) {
            errorMessage = payload.error;
          }
        } catch {}

        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const assistantId = createId();
      let assistantText = "";
      let pendingEvent = "";

      setMessages((previous) => [
        ...previous,
        {
          id: assistantId,
          role: "assistant",
          content: "",
          timestamp: new Date(),
        },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          pendingEvent += decoder.decode(value, { stream: true });
          const events = pendingEvent.split("\n\n");
          pendingEvent = events.pop() ?? "";

          for (const event of events) {
            const dataLines = event
              .split("\n")
              .filter((line) => line.startsWith("data: "))
              .map((line) => line.slice(6));

            for (const dataLine of dataLines) {
              if (dataLine === "[DONE]") {
                break;
              }

              try {
                const payload = JSON.parse(dataLine) as {
                  delta?: { text?: string };
                  meta?: Record<string, unknown>;
                };

                if (payload.meta) {
                  applyMeta(payload.meta);
                }

                const delta = payload.delta?.text ?? "";
                if (!delta) {
                  continue;
                }

                assistantText += delta;
                setMessages((previous) =>
                  previous.map((message) =>
                    message.id === assistantId
                      ? { ...message, content: assistantText }
                      : message,
                  ),
                );
              } catch {}
            }
          }
        }
      }
    } catch (error) {
      console.error("AI Tutor page error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while contacting the AI tutor.";

      if (errorMessage.toLowerCase().includes("quota")) {
        setTutorMode("retrieval_fallback");
      }

      setTutorNotice(buildNoticeFromMessage(errorMessage));
      setMessages((previous) => [
        ...previous,
        {
          id: createId(),
          role: "assistant",
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const prompts = tutorMode === "retrieval_fallback" ? RECOVERY_PROMPTS : DEFAULT_PROMPTS;
  const modeCopy = MODE_COPY[tutorMode];
  const modeBadgeClasses =
    modeCopy.tone === "success"
      ? "border-emerald-400/25 bg-emerald-900/30 text-emerald-100"
      : modeCopy.tone === "warning"
        ? "border-amber-300/25 bg-amber-900/30 text-amber-100"
        : "border-sky-300/25 bg-sky-900/25 text-sky-100";
  const noticeClasses =
    tutorNotice?.tone === "success"
      ? "border-emerald-400/25 bg-emerald-900/25"
      : tutorNotice?.tone === "warning"
        ? "border-amber-300/25 bg-amber-900/25"
        : "border-white/10 bg-slate-900/70";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#06101d_0%,#091525_48%,#040913_100%)] text-slate-50">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(245,158,11,0.16),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(34,197,94,0.14),transparent_24%),radial-gradient(circle_at_74%_78%,rgba(14,165,233,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30" />

      <div className="relative z-10 mx-auto grid max-w-[1540px] gap-6 px-4 py-6 lg:grid-cols-[320px_minmax(0,1fr)] lg:px-6">
        <aside className="space-y-4">
          <div className={`${SURFACE} bg-[linear-gradient(145deg,rgba(245,158,11,0.16),rgba(14,165,233,0.06)),rgba(7,16,29,0.88)] p-5`}>
            <div className="flex items-center gap-3">
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 text-slate-950 shadow-[0_14px_32px_rgba(245,158,11,0.3)]">
                <Sparkles size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-sky-100/65">
                  Lumina tutor
                </div>
                <div className="font-['Syne'] text-lg font-bold text-white">
                  Grounded AI workspace
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300/80">
              Ask about what is already in your system. Lumina searches stored chunks first and only then layers live AI on top when available.
            </p>
          </div>
