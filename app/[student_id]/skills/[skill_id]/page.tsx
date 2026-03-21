import InfoCard from "@/app/ui/roadmapcomp/InfoCard";
import RoadmapFlow from "@/app/ui/roadmapcomp/RoadmapFlow";
import ProgressBar from "@/app/ui/roadmapcomp/ProgressBar";
import Button from "@/app/ui/Button";
import { dynamicRoadmapPage } from "@/app/actions/roadmap";
import { Enrollment } from "@/app/actions/enrollement";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ student_id: string; skill_id: string }>;
}) {
  const { student_id, skill_id } = await params;
  const { skill, enrollment, topics, scores } = await dynamicRoadmapPage(
    skill_id,
    student_id,
  );

  const totalTopics = topics.length;
  const passedTopics = scores.filter((score) => score.score >= 50).length;
  const progressValue = totalTopics > 0 ? (passedTopics / totalTopics) * 100 : 0;

  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center gap-3 overflow-hidden px-4 pt-16 font-sans text-white sm:px-6 md:pt-20">
      <div className="flex w-full flex-row justify-between px-2 sm:px-10">
        <Button
          variant="outline"
          size="s"
          className="border-2 border-slate-700/40 bg-linear-to-br from-slate-300/50 to-slate-500/10"
          href={`/${student_id}/skills`}
        >
          {"<\t Back to skills"}
        </Button>
        {!enrollment ? (
          <form
            action={async () => {
              "use server";
              await Enrollment(skill_id, student_id);
            }}
          >
            <Button
              type="submit"
              variant="outline"
              size="s"
              className="border-2 border-slate-700/40 bg-linear-to-br from-slate-300/50 to-slate-500/10"
            >
              Enroll Now
            </Button>
          </form>
        ) : (
          <Button
            variant="outline"
            size="s"
            className="pointer-events-none cursor-not-allowed opacity-70"
          >
            Enrolled
          </Button>
        )}
      </div>
      <div className="mb-8 flex w-full max-w-[1400px] flex-col gap-5 md:mb-10 md:flex-row">
        <div className="w-full md:flex-[2]">
          <InfoCard title={skill?.skl_title} subtitle={skill?.skl_dscrptn} />
        </div>
        <div className="w-full md:flex-1">
          <ProgressBar title="Your Next Progress" value={progressValue} />
        </div>
      </div>
      <div className="w-full max-w-[1400px]">
        <h3 className="mb-4 text-xl font-black italic tracking-tight md:text-2xl">
          COURSE PATH
        </h3>
        <RoadmapFlow backHref={`/${student_id}/skills`} />
      </div>
    </main>
  );
}
