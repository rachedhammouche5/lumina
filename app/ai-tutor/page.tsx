"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
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

// ─── Mock profile (replace with real DB fetch) ────────────────────────────────
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

// ─── Helpers ──────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);

function buildSystemPrompt(profile: UserProfile): string {
  const weak = profile.weakPoints
    .map((p) => `- ${p.topic} (${p.skill}): ${p.score}%`)
    .join("\n");
  const strong = profile.strongPoints
    .map((p) => `- ${p.topic} (${p.skill}): ${p.score}%`)
    .join("\n");
  return `You are Lumina AI Tutor — a personalized, expert coding tutor. 
You are tutoring ${profile.name}, currently studying "${profile.currentSkill}".

Their WEAK areas (focus here, explain carefully, use examples):
${weak}

Their STRONG areas (don't over-explain, build on knowledge):
${strong}

Guidelines:
- Be concise, warm, and encouraging. 
- Use code examples when relevant (wrap in triple backticks with language).
- Tailor every explanation to their weak points.
- After explanations, offer a practice question or suggest the next concept.
- Never be verbose — get to the point quickly.
- Use emojis sparingly for warmth (max 1–2 per message).`;
}

function formatContent(text: string): React.ReactNode[] {
  const parts = text.split(/(```[\s\S]*?```)/g);
  return parts.map((part, i) => {
    if (part.startsWith("```")) {
      const lines = part.replace(/^```\w*\n?/, "").replace(/```$/, "");
      return (
        <div key={i} style={styles.codeBlock}>
          <div style={styles.codeDots}>
            <span style={{ ...styles.dot, background: "#ff5f57" }} />
            <span style={{ ...styles.dot, background: "#febc2e" }} />
            <span style={{ ...styles.dot, background: "#28c840" }} />
          </div>
          <pre style={styles.codePre}>{lines}</pre>
        </div>
      );
    }
    const bold = part.split(/(\*\*.*?\*\*)/g).map((s, j) =>
      s.startsWith("**") ? (
        <strong key={j} style={{ color: "#f4a435", fontWeight: 600 }}>
          {s.slice(2, -2)}
        </strong>
      ) : (
        s
      )
    );
    return (
      <span key={i} style={{ whiteSpace: "pre-wrap" }}>
        {bold}
      </span>
    );
  });
}

// ─── Quick Suggestion Chips ───────────────────────────────────────────────────
const CHIPS = [
  "Explain Pandas GroupBy with examples",
  "Give me a practice exercise",
  "Quiz me on this topic",
  "Show me common mistakes",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AITutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: "assistant",
      content: `Hey ${MOCK_PROFILE.name}! 👋 I've analyzed your learning profile.\n\nYour weakest area right now is **Pandas GroupBy** at 48% — let's fix that! I'll guide you through it with real examples tailored to what you already know. What would you like to start with?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chipsVisible, setChipsVisible] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 120) + "px";
  };

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return;
      setChipsVisible(false);

      const userMsg: Message = {
        id: uid(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";
      setLoading(true);

      // Build message history for API
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
            systemPrompt: buildSystemPrompt(MOCK_PROFILE),
          }),
        });

        if (!res.ok) throw new Error("API error");

        // Streaming support
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let aiText = "";
        const aiMsgId = uid();

        setMessages((prev) => [
          ...prev,
          {
            id: aiMsgId,
            role: "assistant",
            content: "",
            timestamp: new Date(),
          },
        ]);

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            // Parse SSE lines
            const lines = chunk.split("\n");
            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") break;
                try {
                  const json = JSON.parse(data);
                  const delta =
                    json.delta?.text ||
                    json.choices?.[0]?.delta?.content ||
                    "";
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
      } catch (err) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            content:
              "Sorry, something went wrong. Please try again in a moment.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [messages, loading]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div style={styles.page}>
      {/* Ambient background orbs */}
      <div style={styles.orbA} />
      <div style={styles.orbB} />
      <div style={styles.orbC} />

      <div style={styles.layout}>
        {/* ── Sidebar ─────────────────────────────────────────────── */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarInner}>
            {/* Logo */}
            <div style={styles.logo}>
              <span style={styles.logoIcon}>✦</span>
              <span style={styles.logoText}>lumina</span>
            </div>

            {/* Profile card */}
            <div style={styles.profileCard}>
              <div style={styles.avatar}>
                {MOCK_PROFILE.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div style={styles.profileName}>{MOCK_PROFILE.name}</div>
                <div style={styles.profileSub}>
                  🔥 {MOCK_PROFILE.streak} day streak
                </div>
              </div>
            </div>

            {/* Current skill */}
            <div style={styles.sectionLabel}>CURRENT SKILL</div>
            <div style={styles.skillPill}>{MOCK_PROFILE.currentSkill}</div>

            {/* Weak points */}
            <div style={styles.sectionLabel}>FOCUS AREAS</div>
            {MOCK_PROFILE.weakPoints.map((p) => (
              <div key={p.topic} style={styles.statRow}>
                <div style={styles.statInfo}>
                  <div style={styles.statTopic}>{p.topic}</div>
                  <div style={styles.statSkill}>{p.skill}</div>
                </div>
                <div style={styles.statScore(p.score, "weak")}>{p.score}%</div>
                <div style={styles.barWrap}>
                  <div style={styles.barFill(p.score, "#e8720c")} />
                </div>
              </div>
            ))}

            {/* Strong points */}
            <div style={{ ...styles.sectionLabel, marginTop: 20 }}>
              STRENGTHS
            </div>
            {MOCK_PROFILE.strongPoints.map((p) => (
              <div key={p.topic} style={styles.statRow}>
                <div style={styles.statInfo}>
                  <div style={styles.statTopic}>{p.topic}</div>
                  <div style={styles.statSkill}>{p.skill}</div>
                </div>
                <div style={styles.statScore(p.score, "strong")}>
                  {p.score}%
                </div>
                <div style={styles.barWrap}>
                  <div style={styles.barFill(p.score, "#2ecc71")} />
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Chat area ────────────────────────────────────────────── */}
        <main style={styles.chatArea}>
          {/* Header */}
          <div style={styles.chatHeader}>
            <div style={styles.headerLeft}>
              <div style={styles.headerIcon}>✦</div>
              <div>
                <div style={styles.headerTitle}>AI Tutor</div>
                <div style={styles.headerSub}>
                  <span style={styles.greenDot} />
                  Personalized to your learning gaps
                </div>
              </div>
            </div>
            <div style={styles.headerBadge}>
              {MOCK_PROFILE.currentSkill}
            </div>
          </div>

          {/* Messages */}
          <div ref={bodyRef} style={styles.messagesArea}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  ...styles.msgRow,
                  flexDirection:
                    msg.role === "user" ? "row-reverse" : "row",
                }}
              >
                <div
                  style={
                    msg.role === "assistant"
                      ? styles.aiAvatar
                      : styles.userAvatar
                  }
                >
                  {msg.role === "assistant"
                    ? "✦"
                    : MOCK_PROFILE.name.slice(0, 2).toUpperCase()}
                </div>
                <div style={{ maxWidth: "72%" }}>
                  <div
                    style={
                      msg.role === "assistant"
                        ? styles.aiBubble
                        : styles.userBubble
                    }
                  >
                    {formatContent(msg.content)}
                  </div>
                  <div
                    style={{
                      ...styles.timestamp,
                      textAlign:
                        msg.role === "user" ? "right" : "left",
                    }}
                  >
                    {msg.role === "assistant" ? "AI Tutor" : "You"} ·{" "}
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={styles.msgRow}>
                <div style={styles.aiAvatar}>✦</div>
                <div style={{ ...styles.aiBubble, padding: "14px 18px" }}>
                  <div style={styles.typingRow}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          ...styles.typingDot,
                          animationDelay: `${i * 0.18}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick chips */}
          {chipsVisible && (
            <div style={styles.chipsArea}>
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  style={styles.chip}
                  onClick={() => sendMessage(chip)}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.borderColor = "#e8720c";
                    (e.target as HTMLElement).style.color = "#e8720c";
                    (e.target as HTMLElement).style.background =
                      "rgba(232,114,12,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.09)";
                    (e.target as HTMLElement).style.color = "#7c83a0";
                    (e.target as HTMLElement).style.background =
                      "rgba(255,255,255,0.03)";
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input area */}
          <div style={styles.inputArea}>
            <div style={styles.inputWrapper}>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  autoResize();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about your course…"
                rows={1}
                style={styles.textarea}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                style={{
                  ...styles.sendBtn,
                  opacity: !input.trim() || loading ? 0.4 : 1,
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <div style={styles.inputHint}>
              Press Enter to send · Shift+Enter for new line
            </div>
          </div>
        </main>
      </div>

      {/* CSS animations injected as a style tag */}
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

        div[data-msg] { animation: fadeSlideUp 0.25s ease; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        textarea::placeholder { color: #3d4560; }
        textarea:focus { outline: none; }
      `}</style>
    </div>
  );
}

// ─── Styles object ────────────────────────────────────────────────────────────
const styles: Record<string, any> = {
  page: {
    position: "relative",
    minHeight: "100vh",
    background: "#080c18",
    overflow: "hidden",
    fontFamily: "'DM Sans', system-ui, sans-serif",
  },

  // Ambient orbs
  orbA: {
    position: "fixed",
    top: -120,
    left: -120,
    width: 500,
    height: 500,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(232,114,12,0.12) 0%, transparent 70%)",
    animation: "float 8s ease-in-out infinite",
    pointerEvents: "none",
    zIndex: 0,
  },
  orbB: {
    position: "fixed",
    bottom: -80,
    right: -80,
    width: 400,
    height: 400,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)",
    animation: "float 10s ease-in-out infinite reverse",
    pointerEvents: "none",
    zIndex: 0,
  },
  orbC: {
    position: "fixed",
    top: "40%",
    left: "35%",
    width: 300,
    height: 300,
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
    animation: "float 12s ease-in-out infinite 2s",
    pointerEvents: "none",
    zIndex: 0,
  },

  layout: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    height: "100vh",
    gap: 0,
  },

  // ── Sidebar ──────────────────────────────────────────────────────────────
  sidebar: {
    width: 280,
    minWidth: 280,
    borderRight: "0.5px solid rgba(255,255,255,0.07)",
    background: "rgba(10,14,26,0.8)",
    backdropFilter: "blur(20px)",
    overflowY: "auto",
    flexShrink: 0,
  },
  sidebarInner: {
    padding: "24px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 24,
  },
  logoIcon: {
    fontSize: 20,
    color: "#e8720c",
    fontFamily: "'Syne', sans-serif",
  },
  logoText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
    letterSpacing: "-0.5px",
  },
  profileCard: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: "12px 14px",
    marginBottom: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "linear-gradient(135deg, #e8720c, #f4a435)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 700,
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
    flexShrink: 0,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 500,
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
  },
  profileSub: { fontSize: 12, color: "#7c83a0", marginTop: 2 },

  sectionLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "#3d4560",
    letterSpacing: "0.12em",
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "'Syne', sans-serif",
  },
  skillPill: {
    background: "rgba(232,114,12,0.1)",
    border: "0.5px solid rgba(232,114,12,0.3)",
    color: "#e8720c",
    fontSize: 12,
    fontWeight: 500,
    padding: "6px 12px",
    borderRadius: 20,
    display: "inline-block",
    marginBottom: 8,
  },
  statRow: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    gridTemplateRows: "auto auto",
    gap: "2px 8px",
    marginBottom: 10,
  },
  statInfo: { gridColumn: "1", gridRow: "1" },
  statTopic: { fontSize: 12, fontWeight: 500, color: "#c8cfe0" },
  statSkill: { fontSize: 11, color: "#3d4560", marginTop: 1 },
  statScore: (score: number, type: "weak" | "strong") => ({
    gridColumn: "2",
    gridRow: "1",
    fontSize: 12,
    fontWeight: 600,
    color: type === "weak" ? "#e8720c" : "#2ecc71",
    alignSelf: "center",
  }),
  barWrap: {
    gridColumn: "1 / -1",
    gridRow: "2",
    height: 3,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 2,
    overflow: "hidden",
  },
  barFill: (score: number, color: string) => ({
    width: `${score}%`,
    height: "100%",
    background: color,
    borderRadius: 2,
    transition: "width 0.6s ease",
  }),

  // ── Chat area ─────────────────────────────────────────────────────────────
  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    minWidth: 0,
    overflow: "hidden",
  },
  chatHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 28px",
    borderBottom: "0.5px solid rgba(255,255,255,0.07)",
    background: "rgba(10,14,26,0.6)",
    backdropFilter: "blur(20px)",
    flexShrink: 0,
  },
  headerLeft: { display: "flex", alignItems: "center", gap: 12 },
  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    background: "linear-gradient(135deg, #e8720c 0%, #f4a435 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    flexShrink: 0,
    boxShadow: "0 4px 20px rgba(232,114,12,0.35)",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
  },
  headerSub: {
    fontSize: 12,
    color: "#7c83a0",
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 2,
  },
  greenDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#2ecc71",
    display: "inline-block",
    boxShadow: "0 0 6px rgba(46,204,113,0.6)",
  },
  headerBadge: {
    background: "rgba(232,114,12,0.1)",
    border: "0.5px solid rgba(232,114,12,0.3)",
    color: "#e8720c",
    fontSize: 12,
    padding: "6px 14px",
    borderRadius: 20,
    fontWeight: 500,
  },

  messagesArea: {
    flex: 1,
    overflowY: "auto",
    padding: "28px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },

  msgRow: {
    display: "flex",
    gap: 12,
    alignItems: "flex-end",
    animation: "fadeSlideUp 0.25s ease",
  },

  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: "linear-gradient(135deg, #e8720c 0%, #f4a435 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    flexShrink: 0,
    boxShadow: "0 2px 12px rgba(232,114,12,0.4)",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 10,
    background: "rgba(99,102,241,0.2)",
    border: "0.5px solid rgba(99,102,241,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 11,
    fontWeight: 700,
    color: "#a5b4fc",
    fontFamily: "'Syne', sans-serif",
    flexShrink: 0,
  },
  aiBubble: {
    background: "rgba(21,28,48,0.9)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
    padding: "13px 16px",
    fontSize: 14,
    lineHeight: 1.65,
    color: "#c8d4e8",
    backdropFilter: "blur(10px)",
  },
  userBubble: {
    background: "linear-gradient(135deg, #e8720c 0%, #f4a435 100%)",
    borderBottomRightRadius: 4,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    padding: "13px 16px",
    fontSize: 14,
    lineHeight: 1.65,
    color: "#fff",
    boxShadow: "0 4px 20px rgba(232,114,12,0.3)",
  },
  timestamp: {
    fontSize: 11,
    color: "#2a3050",
    marginTop: 5,
    paddingLeft: 4,
  },

  codeBlock: {
    background: "#070a13",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    marginTop: 10,
    overflow: "hidden",
  },
  codeDots: {
    display: "flex",
    gap: 6,
    padding: "8px 12px",
    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    display: "inline-block",
  },
  codePre: {
    margin: 0,
    padding: "12px 14px",
    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
    fontSize: 12,
    lineHeight: 1.7,
    color: "#a8c0e0",
    overflowX: "auto",
    whiteSpace: "pre",
  },

  typingRow: { display: "flex", gap: 5, alignItems: "center" },
  typingDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#e8720c",
    animation: "bounce 1.1s infinite",
  },

  chipsArea: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    padding: "0 28px 12px",
  },
  chip: {
    background: "rgba(255,255,255,0.03)",
    border: "0.5px solid rgba(255,255,255,0.09)",
    color: "#7c83a0",
    fontSize: 12,
    padding: "7px 14px",
    borderRadius: 20,
    cursor: "pointer",
    transition: "all 0.15s ease",
    whiteSpace: "nowrap",
    fontFamily: "'DM Sans', sans-serif",
  },

  inputArea: {
    padding: "12px 28px 24px",
    borderTop: "0.5px solid rgba(255,255,255,0.07)",
    background: "rgba(10,14,26,0.6)",
    backdropFilter: "blur(20px)",
    flexShrink: 0,
  },
  inputWrapper: {
    display: "flex",
    gap: 10,
    alignItems: "flex-end",
    background: "rgba(21,28,48,0.9)",
    border: "0.5px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: "10px 12px",
    transition: "border-color 0.2s",
  },
  textarea: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#c8d4e8",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    resize: "none",
    minHeight: 22,
    maxHeight: 120,
    lineHeight: 1.55,
    caretColor: "#e8720c",
  },
  sendBtn: {
    width: 36,
    height: 36,
    background: "linear-gradient(135deg, #e8720c 0%, #f4a435 100%)",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "opacity 0.15s, transform 0.1s",
    boxShadow: "0 2px 12px rgba(232,114,12,0.4)",
  },
  inputHint: {
    fontSize: 11,
    color: "#2a3050",
    marginTop: 8,
    textAlign: "center" as const,
  },
};