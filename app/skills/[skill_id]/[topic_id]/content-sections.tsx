import { FileAudio2, FileText, BookOpenText } from "lucide-react";
import type { Content } from "@/lib/database.types";
import { VideoCard, AudioPlayer, DocsCard, PdfCard } from "./content-cards";

export function VideoSection({ contents }: { contents: Content[] }) {
  if (contents.length === 0) return null;
  return (
    <article className="overflow-hidden rounded-[30px] border border-white/10 bg-slate-900/70 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-orange-300/80">
            Video Stage
          </p>
          <h2 className="mt-1 text-lg font-bold text-white">Video Lessons</h2>
        </div>
        <span className="rounded-full border border-orange-400/25 bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-100">
          {contents.length} {contents.length === 1 ? "video" : "videos"}
        </span>
      </div>
      <div className="space-y-5 md:p-6">
        {contents.map((content) => (
          <VideoCard key={content.cntnt_id} content={content} />
        ))}
      </div>
    </article>
  );
}
export function AudioSection({ contents }: { contents: Content[] }) {
  if (contents.length === 0) return null;
  return (
    <article className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/15 text-cyan-300">
          <FileAudio2 size={20} />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight">Audio Lessons</h2>
          <p className="text-sm text-slate-400">
            Listen while reading or reviewing the topic.
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {contents.map((content) =>
          content.cntnt_value ? (
            <AudioPlayer
              key={content.cntnt_id}
              src={content.cntnt_value!}
              title={content.cntnt_title}
            />
          ) : (
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/5 p-4">
              <h3 className="font-semibold text-white">
                {content.cntnt_title}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                No audio source attached yet.
              </p>
            </div>
          ),
        )}
      </div>
    </article>
  );
}

export function PdfSection({ contents }: { contents: Content[] }) {
  if (contents.length === 0) return null;
  return (
    <article className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-300">
          <FileText size={20} />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight">PDF Resources</h2>
          <p className="text-sm text-slate-400">
            Handouts, slides, and written references.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {contents.map((content) => (
          <PdfCard key={content.cntnt_id} content={content} />
        ))}
      </div>
    </article>
  );
}

export function DocsSection({ contents }: { contents: Content[] }) {
  if (contents.length === 0) return null;
  return (
    <article className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
          <BookOpenText size={20} />
        </div>
        <div>
          <h2 className="text-xl font-black tracking-tight">Official Docs</h2>
          <p className="text-sm text-slate-400">
            Trusted references to deepen the topic.
          </p>
        </div>
      </div>
      <div className="space-y-3">
        {contents.map((content) => (
          <DocsCard key={content.cntnt_id} content={content} />
        ))}
      </div>
    </article>
  );
}
