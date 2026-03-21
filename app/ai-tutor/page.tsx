import { Bot, BrainCircuit, MessageCircle, Zap } from "lucide-react";
import Button from "@/app/ui/Button";

const features = [
  {
    title: "Smart Diagnostics",
    description: "Identifies gaps in your student model and skips redundant content.",
    icon: Zap,
  },
  {
    title: "Contextual Guidance",
    description: "Understands the exact roadmap node you are studying and keeps you on track.",
    icon: Bot,
  },
  {
    title: "Concept Simplification",
    description: "Breaks down complex Software Engineering topics into concise, teachable chunks.",
    icon: BrainCircuit,
  },
];

export default function AiTutorPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <section className="px-6 lg:px-12 pt-24 pb-16 max-w-6xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
        <div className="space-y-6">
          <p className="text-sm font-semibold text-orange-400 uppercase tracking-[0.3em]">
            AI Tutor
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Your 24/7 Academic Mentor.
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Not just a chatbot. An AI agent built for NTIC students that tracks your student model and guides
            you through expert-curated skill paths.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/signup" variant="primary" className="shadow-orange-500/30">
              Try the AI Tutor
            </Button>
            <Button href="/skills" variant="outline" className="border-white/20 text-slate-100">
              View Skill Catalog
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-full" aria-hidden />
          <div className="relative rounded-3xl border border-white/5 bg-slate-950/80 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3 pb-4 border-b border-white/5">
              <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">
                <Bot size={22} />
              </div>
              <div>
                <p className="text-sm text-slate-300">Lumina AI</p>
                <p className="text-xs text-slate-500">Context: Design Patterns · Node #12</p>
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300">
                  <MessageCircle size={16} />
                </div>
                <div className="max-w-md rounded-2xl bg-slate-800/70 px-4 py-3 text-sm text-slate-200">
                  I&apos;m stuck on the Strategy pattern. How do I explain it in an interview?
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">
                  <Bot size={16} />
                </div>
                <div className="max-w-md rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-3 text-sm text-slate-100 border border-orange-500/30 shadow-[0_10px_40px_rgba(249,115,22,0.18)]">
                  Think of Strategy as swapping algorithms without changing the caller. In your roadmap, you&apos;re on
                  &ldquo;Behavioral Patterns: Step 2.&rdquo; Next, I&apos;ll give you a 3-step elevator pitch and a quick UML sketch
                  so you can answer concisely.
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-300">
                  <Bot size={16} />
                </div>
                <div className="max-w-md rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-3 text-sm text-slate-100 border border-orange-500/30">
                  Also noticed you mastered &ldquo;Factory Method&rdquo; last week—want a 2-question check to compare?
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 lg:px-12 pb-20 max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/5 bg-slate-950/70 p-6 shadow-lg shadow-black/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-orange-500/15 text-orange-400 flex items-center justify-center">
                  <feature.icon />
                </div>
                <h3 className="text-lg font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <p className="text-slate-300 max-w-2xl">
            Lumina&apos;s AI Tutor reads your student model, cross-references the roadmap node you&apos;re on, and responds
            like a mentor who knows your progress—not a generic chatbot.
          </p>
          <Button href="/signup" variant="primary" className="px-7 py-3 shadow-orange-500/30">
            Try the AI Tutor
          </Button>
        </div>
      </section>
    </main>
  );
}
