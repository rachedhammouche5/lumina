import { Sparkles } from "lucide-react";

import CourseCard from "../ui/Skills/CourseCard";
import CourseSearchClient from "../ui/Skills/CourseSearchClient";
export default function GuestDomain() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center pt-24 px-6">
      <div className="flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 rounded-full mb-2">
        <Sparkles className="text-orange-500" size={16} />
        <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">
          LEARN SMARTER
        </span>
      </div>

      <div className="text-4xl md:text-5xl font-bold text-center mb-10">
        <h1 className="text-white tracking-tight">
          What will you{" "}
          <span className="uppercase  bg-gradient-to-br from-[#FF4D00] to-[#FFB800] bg-clip-text text-transparent">
            Master
          </span>{" "}
          today ?
        </h1>
      </div>

      <CourseSearchClient />
    </div>
  );
}
