import { Sparkles } from "lucide-react";

import CourseSearchClient from "@/app/ui/Skills/CourseSearchClient";

export default function SkillsPage({
  headingPrefix = "What will you",
  headingAccent = "Master",
  headingSuffix = "today ?",
}: {
  headingPrefix?: string;
  headingAccent?: string;
  headingSuffix?: string;
}) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center pt-24 px-6">
      <div className="mb-2 flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
        <Sparkles className="text-orange-500" size={16} />
        <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
          LEARN SMARTER
        </span>
      </div>

      <div className="mb-10 text-center text-4xl font-bold md:text-5xl">
        <h1 className="text-white tracking-tight">
          {headingPrefix}{" "}
          <span className="bg-gradient-to-br from-[#FF4D00] to-[#FFB800] bg-clip-text uppercase text-transparent">
            {headingAccent}
          </span>{" "}
          {headingSuffix}
        </h1>
      </div>

      <CourseSearchClient />
    </div>
  );
}
