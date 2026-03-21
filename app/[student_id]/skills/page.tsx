import { Sparkles } from "lucide-react";
import CourseSearchClient from "@/app/ui/Skills/CourseSearchClient";

export default async function StudentSkillsPage({
  params,
}: {
  params: Promise<{ student_id: string }>;
}) {
  const { student_id } = await params;

  return (
    <div className="flex min-h-full flex-col items-center px-6">
      <div className="mb-2 flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5">
        <Sparkles className="text-orange-500" size={16} />
        <span className="text-xs font-bold uppercase tracking-widest text-orange-500">
          LEARN SMARTER
        </span>
      </div>

      <div className="mb-10 text-center text-4xl font-bold md:text-5xl">
        <h1 className="tracking-tight text-white">
          Choose the next skill you will{' '}
          <span className="bg-gradient-to-br from-[#FF4D00] to-[#FFB800] bg-clip-text uppercase text-transparent">
            master
          </span>
          .
        </h1>
      </div>

      <CourseSearchClient studentId={student_id} />
    </div>
  );
}
