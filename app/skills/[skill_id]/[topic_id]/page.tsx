import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ArrowLeft,
  type LucideIcon,
  BookOpenText,
  FileAudio2,
  FileText,
  PlayCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Content, ContentType } from "@/lib/database.types";
import {
  AudioSection,
  PdfSection,
  DocsSection,
  VideoSection,
} from "./content-sections";
import Button from "@/app/ui/Button";
import StreakCelebration from "@/app/features/streak/StreakCelebration";

const contentTypeMeta: Record<
  ContentType,
  { label: string; icon: LucideIcon; tone: string }
> = {
  video: {
    label: "Video lesson",
    icon: PlayCircle,
    tone: "border-orange-400/30 bg-orange-500/10 text-orange-100",
  },
  audio: {
    label: "Audio lesson",
    icon: FileAudio2,
    tone: "border-cyan-400/30 bg-cyan-500/10 text-cyan-100",
  },
  pdf: {
    label: "PDF resource",
    icon: FileText,
    tone: "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
  },
  docs: {
    label: "Official docs",
    icon: BookOpenText,
    tone: "border-violet-400/30 bg-violet-500/10 text-violet-100",
  },
  mindmap: {
    label: "Mind map",
    icon: BookOpenText,
    tone: "border-sky-400/30 bg-sky-500/10 text-sky-100",
  },
};

export default async function TopicLearningPage({
  params,
}: {
  params: Promise<{ skill_id: string; topic_id: string }>;
}) {
  const { skill_id, topic_id } = await params;
  const supabase = await createClient();

  const [
    { data: skill },
    { data: topic },
    { data: contents },
    {
      data: { user },
    },
  ] = await Promise.all([
    supabase.from("Skill").select("*").eq("skl_id", skill_id).single(),
    supabase
      .from("Topic")
      .select("*")
      .eq("tpc_id", topic_id)
      .eq("skill_id", skill_id)
      .single(),
    supabase.from("Content").select("*").eq("tpc_id", topic_id),
    supabase.auth.getUser(),
  ]);

  if (!skill || !topic) notFound();

  if (user) {
    await supabase
      .from("Student")
      .update({ std_last_activeDate: new Date().toISOString() })
      .eq("user_id", user.id);
  }
  // ── Access gate ─────────────────────────────────────────────────────────────
  if (user) {
    const { data: student } = await supabase
      .from("Student")
      .select("std_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (student) {
      const { data: enrollment } = await supabase
        .from("enroll")
        .select("student_id")
        .eq("student_id", student.std_id)
        .eq("skill_id", skill_id)
        .maybeSingle();

      if (!enrollment) redirect(`/skills/${skill_id}`);

      // Check if this is a leaf topic (no children → always accessible)
      const { count: childCount } = await supabase
        .from("Topic")
        .select("tpc_id", { count: "exact", head: true })
        .eq("parent_id", topic_id);
    }
  }
  // ── End access gate ─────────────────────────────────────────────────────────

  const topicContents: Content[] = contents ?? [];
  const videoContents = topicContents.filter((c) => c.cntnt_type === "video");
  const audioContents = topicContents.filter((c) => c.cntnt_type === "audio");
  const pdfContents = topicContents.filter((c) => c.cntnt_type === "pdf");
  const docsContents = topicContents.filter((c) => c.cntnt_type === "docs");

  const description =
    topic.tpc_description ??
    "This topic brings together lesson media, downloadable material, and official references in one place.";
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-950 px-4 pb-16 pt-24 text-white sm:px-6">
      <StreakCelebration />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 sm:gap-8">
        <section className="relative overflow-hidden rounded-[28px] border border-slate-500 bg-gradient-to-br from-slate-700 to-transparent p-4 shadow-slate-500/40 shadow-[0_20px_60px] sm:rounded-[32px] sm:p-6">
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:gap-10">
            <div className="flex-1 min-w-0">
              <Button
                variant="outline"
                href={`/skills/${skill_id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all duration-300"
              >
                <ArrowLeft size={16} />
                Back to roadmap
              </Button>

              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-orange-300/90 sm:mt-5 sm:text-xs sm:tracking-[0.32em]">
                Learning Content
              </p>

              <h1 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl md:text-5xl">
                {topic.tpc_title}
              </h1>

              <div className="mt-3 max-w-xl lg:mt-4 lg:max-w-2xl">
                <p
                  className="text-sm leading-relaxed text-slate-300 md:text-base line-clamp-4 transition-colors duration-300 hover:text-white"
                  title={description}
                >
                  {description}
                </p>
              </div>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-4 lg:w-[360px] lg:gap-5">
              <div className="flex lg:justify-end">
                <Button
                  variant="primary"
                  size="m"
                  className="w-full lg:w-44"
                  href={`/skills/${skill_id}/${topic_id}/quiz`}
                >
                  QUIZ ME
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                    Skill
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white ">
                    {skill.skl_title}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                    Resources
                  </p>
                  <p className="mt-1 text-xl font-black text-white">
                    {topicContents.length}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-white/45">
                    Mode
                  </p>
                  <p className="mt-1 text-xs font-semibold text-white truncate">
                    {videoContents.length
                      ? "Video"
                      : audioContents.length
                        ? "Audio"
                        : "Mixed"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_360px] lg:gap-6">
          <div className="space-y-6">
            <VideoSection contents={videoContents} />
            <AudioSection contents={audioContents} />

            {(pdfContents.length > 0 || docsContents.length > 0) && (
              <div className="grid gap-4 xl:grid-cols-2">
                <PdfSection contents={pdfContents} />
                <DocsSection contents={docsContents} />
              </div>
            )}

            {topicContents.length === 0 && (
              <article className="rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
                <h2 className="text-2xl font-black tracking-tight text-white">
                  No learning resources yet
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  The page structure is ready. As soon as this topic gets
                  videos, audio, PDFs, or official docs, they will appear here
                  automatically.
                </p>
              </article>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] sm:rounded-[28px] sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300/80">
                Resource Navigator
              </p>
              <h2 className="mt-2 text-lg font-black tracking-tight text-white sm:text-xl">
                This Topic Includes
              </h2>
              <div className="mt-4 space-y-3 sm:mt-5">
                {topicContents.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    This topic does not have content items yet.
                  </div>
                ) : (
                  topicContents.map((content) => {
                    const meta = contentTypeMeta[content.cntnt_type];
                    const Icon = meta.icon;
                    return (
                      <div
                        key={content.cntnt_id}
                        className={`rounded-2xl border p-4 ${meta.tone}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <Icon size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                              {meta.label}
                            </p>
                            <p className="mt-1 font-semibold text-white">
                              {content.cntnt_title}
                            </p>
                            <p className="mt-2 break-all text-sm text-white/70">
                              {content.cntnt_value ??
                                "Content source will be attached later."}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
