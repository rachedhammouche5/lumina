import Button from "@/app/ui/Button";
import { Enrollment } from "@/app/actions/enrollement";
import { dynamicRoadmapPage } from "@/app/actions/roadmap";
import InfoCard from "@/app/ui/roadmapcomp/InfoCard";
import ProgressBar from "@/app/ui/roadmapcomp/ProgressBar";
import RoadmapFlow from "@/app/ui/roadmapcomp/RoadmapFlow";

export default async function RoadmapPage({
  skillId,
  studentId,
  canEnroll,
  canTrackProgress,
  backHref = "/skills",
}: {
  skillId: string;
  studentId?: string | null;
  canEnroll: boolean;
  canTrackProgress: boolean;
  backHref?: string;
}) {
  const { skill, enrollment, topics, scores } = await dynamicRoadmapPage(
    skillId,
    studentId,
  );

  const totalTopics = topics?.length ?? 0;
  const passedTopics =
    scores?.filter((score) => score.score >= 50).length ?? 0;
  const progressValue =
    totalTopics > 0 ? Math.round((passedTopics / totalTopics) * 100) : 0;

  return (
    <main className="relative flex min-h-screen min-w-screen flex-col items-center gap-3 overflow-hidden bg-slate-950 px-4 pt-16 font-sans text-white sm:px-6 md:pt-20">
      <div className="flex w-full flex-row justify-between px-10">
        <Button
          variant="outline"
          size="s"
          className="border-2 border-slate-700/40 bg-linear-to-br from-slate-300/50 to-slate-500/10"
          href={backHref}
        >
          {"<\t Back to skills"}
        </Button>

        {canEnroll ? (
          !enrollment ? (
            <form
              action={async () => {
                "use server";
                await Enrollment(skillId);
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
          )
        ) : (
          <Button
            variant="outline"
            size="s"
            className="pointer-events-none cursor-not-allowed opacity-70"
          >
            Login as student to enroll
          </Button>
        )}
      </div>

      <div className="mb-8 flex w-full max-w-[1400px] flex-col gap-5 md:mb-10 md:flex-row">
        <div className="w-full md:flex-[2]">
          <InfoCard
            title={skill?.skl_title ?? "Skill roadmap"}
            subtitle={skill?.skl_dscrptn ?? "Explore this roadmap step by step."}
          />
        </div>

        {canTrackProgress ? (
          <div className="w-full md:flex-1">
            <ProgressBar title="Your Next Progress" value={progressValue} />
          </div>
        ) : null}
      </div>

      <div className="w-full max-w-[1400px]">
        <h3 className="mb-4 text-xl font-black italic tracking-tight md:text-2xl">
          COURSE PATH
        </h3>
        <RoadmapFlow />
      </div>
    </main>
  );
}
