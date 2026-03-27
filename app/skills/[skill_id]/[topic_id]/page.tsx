import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpenText,
  ExternalLink,
  FileAudio2,
  FileText,
  type LucideIcon,
  PlayCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { Content, ContentType } from "@/lib/database.types";

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
    label: "Mindmap",
    icon: BookOpenText,
    tone: "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-100",
  },
};

function isUrl(value: string | null) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function getContentHref(content: Content) {
  if (!content.cntnt_value) return null;
  return isUrl(content.cntnt_value) ? content.cntnt_value : null;
}

export default async function TopicLearningPage({
  params,
}: {
  params: Promise<{ skill_id: string; topic_id: string }>;
}) {
  const { skill_id, topic_id } = await params;
  const supabase = await createClient();

  const [{ data: skill }, { data: topic }, { data: contents }] = await Promise.all([
    supabase.from("Skill").select("*").eq("skl_id", skill_id).single(),
    supabase
      .from("Topic")
      .select("*")
      .eq("tpc_id", topic_id)
      .eq("skill_id", skill_id)
      .single(),
    supabase.from("Content").select("*").eq("tpc_id", topic_id),
  ]);

  if (!skill || !topic) {
    notFound();
  }

  const topicContents: Content[] = contents ?? [];
  const videoContents = topicContents.filter((item) => item.cntnt_type === "video");
  const audioContents = topicContents.filter((item) => item.cntnt_type === "audio");
  const pdfContents = topicContents.filter((item) => item.cntnt_type === "pdf");
  const docsContents = topicContents.filter((item) => item.cntnt_type === "docs");
  const primaryVideo = videoContents[0] ?? null;

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-24 text-white sm:px-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <section className="relative overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-orange-950/40 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] md:p-8">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.12),transparent_30%)]"
            aria-hidden
          />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Link
                href={`/skills/${skill_id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to roadmap
              </Link>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.32em] text-orange-300/90">
                Learning Content
              </p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">
                {topic.tpc_title}
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                {topic.tpc_description ||
                  "This topic brings together lesson media, downloadable material, and official references in one place."}
              </p>
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
                  {primaryVideo ? "Video" : audioContents.length ? "Audio" : "Mixed"}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_360px]">
          <div className="space-y-6">
            <article className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/70 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-orange-300/80">
                    Video Stage
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-white">Reserved for YouTube player</h2>
                </div>
                {primaryVideo && (
                  <span className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-100">
                    {primaryVideo.cntnt_title}
                  </span>
                )}
              </div>

              <div className="p-5 md:p-6">
                <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-orange-400/35 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(30,41,59,0.92),rgba(124,45,18,0.55))]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.14),transparent_38%)]" />
                  <div className="relative flex max-w-md flex-col items-center text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-orange-300/25 bg-orange-500/10 text-orange-200 shadow-[0_0_35px_rgba(249,115,22,0.18)]">
                      <PlayCircle size={38} />
                    </div>
                    <h3 className="mt-5 text-2xl font-black tracking-tight text-white">
                      YouTube Player Placeholder
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      This area is ready for the embedded video experience. For now, the page keeps the space,
                      headline, and supporting metadata in place.
                    </p>
                    {primaryVideo?.cntnt_value && (
                      <a
                        href={primaryVideo.cntnt_value}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        Open video source
                        <ExternalLink size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>

            {audioContents.length > 0 && (
              <article className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
                    <FileAudio2 size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black tracking-tight">Audio Lessons</h2>
                    <p className="text-sm text-slate-400">Listen while reading or reviewing the topic.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {audioContents.map((content) => (
                    <div
                      key={content.cntnt_id}
                      className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between gap-4">
                        <div>
                          <h3 className="font-semibold text-white">{content.cntnt_title}</h3>
                          <p className="text-sm text-slate-400">
                            {content.cntnt_value || "Audio source will appear here once attached."}
                          </p>
                        </div>
                      </div>
                      {isUrl(content.cntnt_value) ? (
                        <audio controls className="w-full">
                          <source src={content.cntnt_value ?? undefined} />
                          Your browser does not support the audio element.
                        </audio>
                      ) : (
                        <div className="rounded-xl border border-dashed border-white/10 px-4 py-3 text-sm text-slate-400">
                          Audio playback will be available once this content points to a hosted audio file.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            )}

            {(pdfContents.length > 0 || docsContents.length > 0) && (
              <div className="grid gap-6 xl:grid-cols-2">
                {pdfContents.length > 0 && (
                  <article className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-black tracking-tight">PDF Resources</h2>
                        <p className="text-sm text-slate-400">Handouts, slides, and written references.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {pdfContents.map((content) => {
                        const href = getContentHref(content);

                        return (
                          <div
                            key={content.cntnt_id}
                            className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-4"
                          >
                            <h3 className="font-semibold text-white">{content.cntnt_title}</h3>
                            <p className="mt-2 text-sm text-slate-400">
                              {content.cntnt_value || "A PDF file can be attached here later."}
                            </p>
                            {href ? (
                              <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-300 transition hover:text-emerald-200"
                              >
                                Open PDF
                                <ExternalLink size={15} />
                              </a>
                            ) : (
                              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-slate-500">
                                Waiting for hosted file URL
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </article>
                )}

                {docsContents.length > 0 && (
                  <article className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                        <BookOpenText size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-black tracking-tight">Official Docs</h2>
                        <p className="text-sm text-slate-400">Trusted references to deepen the topic.</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {docsContents.map((content) => {
                        const href = getContentHref(content);

                        if (!href) {
                          return (
                            <div
                              key={content.cntnt_id}
                              className="rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4"
                            >
                              <h3 className="font-semibold text-white">{content.cntnt_title}</h3>
                              <p className="mt-2 text-sm text-slate-400">
                                Documentation link will appear here.
                              </p>
                            </div>
                          );
                        }

                        return (
                          <a
                            key={content.cntnt_id}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="group flex items-center justify-between rounded-2xl border border-violet-400/20 bg-violet-500/5 p-4 transition hover:border-violet-300/35 hover:bg-violet-500/10"
                          >
                            <div>
                              <h3 className="font-semibold text-white">{content.cntnt_title}</h3>
                              <p className="mt-2 text-sm text-slate-400">{href}</p>
                            </div>
                            <ExternalLink
                              size={18}
                              className="text-violet-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                          </a>
                        );
                      })}
                    </div>
                  </article>
                )}
              </div>
            )}

            {topicContents.length === 0 && (
              <article className="rounded-[28px] border border-dashed border-white/15 bg-white/[0.03] p-8 text-center">
                <h2 className="text-2xl font-black tracking-tight text-white">No learning resources yet</h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  The page structure is ready. As soon as this topic gets videos, audio, PDFs, or official docs,
                  they will appear here automatically.
                </p>
              </article>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)]">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-orange-300/80">
                Resource Navigator
              </p>
              <h2 className="mt-2 text-xl font-black tracking-tight text-white">This Topic Includes</h2>
              <div className="mt-5 space-y-3">
                {topicContents.map((content) => {
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
                          <p className="mt-1 font-semibold text-white">{content.cntnt_title}</p>
                          <p className="mt-2 text-sm text-white/70 break-all">
                            {content.cntnt_value || "Content source will be attached later."}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {topicContents.length === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                    This topic does not have content items yet.
                  </div>
                )}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
