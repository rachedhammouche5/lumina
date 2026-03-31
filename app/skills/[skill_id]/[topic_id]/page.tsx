import Link from "next/link";
import { notFound } from "next/navigation";
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
import { AudioSection, PdfSection, DocsSection, VideoSection } from "./content-sections";
import Button from "@/app/ui/Button";

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
};

export default async function TopicLearningPage({
  params,
}: {
  params: Promise<{ skill_id: string; topic_id: string }>;
}) {
  const { skill_id, topic_id } = await params;
  const supabase = await createClient();

  const [{ data: skill }, { data: topic }, { data: contents }] =
    await Promise.all([
      supabase.from("Skill").select("*").eq("skl_id", skill_id).single(),
      supabase
        .from("Topic")
        .select("*")
        .eq("tpc_id", topic_id)
        .eq("skill_id", skill_id)
        .single(),
      supabase.from("Content").select("*").eq("tpc_id", topic_id),
    ]);

  if (!skill || !topic) notFound();

  const topicContents: Content[] = contents ?? [];
  const videoContents = topicContents.filter((c) => c.cntnt_type === "video");
  const audioContents = topicContents.filter((c) => c.cntnt_type === "audio");
  const pdfContents   = topicContents.filter((c) => c.cntnt_type === "pdf");
  const docsContents  = topicContents.filter((c) => c.cntnt_type === "docs");

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-24 text-white sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden rounded-[32px] border border-slate-500 bg-gradient-to-br from-slate-700 to-transparent p-6 shadow-slate-500/40 shadow-[0_20px_60px]">
          
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Button
                variant="outline"
                href={`/skills/${skill_id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition-all duration-300"
              >
                <ArrowLeft size={16} />
                Back to roadmap
              </Button>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.32em] text-orange-300/90">
                Learning Content
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
                {topic.tpc_title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                {topic.tpc_description ??
                  "This topic brings together lesson media, downloadable material, and official references in one place."}
              </p>
            </div>
            

            <div className="flex flex-col">
              <div className="flex flex-row justify-end mb-5">
                <Button
                  variant="primary"
                  size="m"
                  className="w-full"
                  href={`/skills/${skill_id}/${topic_id}/quiz`}
                >
                  QUIZ ME
                </Button>
              </div>
              <div className="grid gap-3 sm:grid-cols-3 lg:w-[360px]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Skill</p>
                  <p className="mt-2 text-sm font-semibold text-white">{skill.skl_title}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Resources</p>
                  <p className="mt-2 text-2xl font-black text-white">{topicContents.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/45">Primary Mode</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {videoContents.length ? "Video" : audioContents.length ? "Audio" : "Mixed"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main grid ── */}
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_360px]">
          <div className="space-y-6">

            <VideoSection contents={videoContents} />

            {/* Content sections */}
            <AudioSection contents={audioContents} />

            {(pdfContents.length > 0 || docsContents.length > 0) && (
              <div className="grid gap-6 xl:grid-cols-2">
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
                  The page structure is ready. As soon as this topic gets videos, audio, PDFs, or
                  official docs, they will appear here automatically.
                </p>
              </article>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300/80">
                Resource Navigator
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-white">
                This Topic Includes
              </h2>
              <div className="mt-5 space-y-3">
                {topicContents.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    This topic does not have content items yet.
                  </div>
                ) : (
                  topicContents.map((content) => {
                    const meta = contentTypeMeta[content.cntnt_type];
                    const Icon = meta.icon;
                    return (
                      <div key={content.cntnt_id} className={`rounded-2xl border p-4 ${meta.tone}`}>
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5">
                            <Icon size={18} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                              {meta.label}
                            </p>
                            <p className="mt-1 font-semibold text-white">{content.cntnt_title}</p>
                            <p className="mt-2 break-all text-sm text-white/70">
                              {content.cntnt_value ?? "Content source will be attached later."}
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
