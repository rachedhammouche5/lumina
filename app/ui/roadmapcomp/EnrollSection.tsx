"use client";

import { useEffect, useState } from "react";
import EnrollButton from "./EnrollButton";
import ProgressBar from "./ProgressBar";
import BackButton from "@/app/ui/roadmapcomp/BackButton";
import InfoCard from "@/app/ui/roadmapcomp/InfoCard";

type SkillCardData = {
  skl_id: string;
  skl_title: string;
  skl_dscrptn: string | null;
};

export default function EnrollSection({
  skill,
  isLoggedIn,
  initialIsEnrolled,
  progressValue,
  canEnroll,
}: {
  skill: SkillCardData;
  isLoggedIn: boolean;
  initialIsEnrolled: boolean;
  progressValue: number;
  canEnroll: boolean;
}) {
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled);
  const [progress, setProgress] = useState(progressValue);

  useEffect(() => {
    setProgress(progressValue);
  }, [progressValue]);

  return (
    <div className="w-full max-w-[1400px] px-4">
      <div className="mb-5 flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <BackButton />

        <EnrollButton
          skillId={skill.skl_id}
          isLoggedIn={isLoggedIn}
          isEnrolled={isEnrolled}
          canEnroll={canEnroll}
          setIsEnrolled={setIsEnrolled}
        />
      </div>
      <div className="mb-8 flex w-full flex-col items-start gap-4 md:mb-10 md:flex-row md:gap-5">
        <div className="flex-1">
          <InfoCard
            title={skill.skl_title}
            subtitle={skill.skl_dscrptn ?? "This skill is ready for exploration."}
          />
        </div>
        {isEnrolled && (
          <div className="w-full flex-1 md:max-w-[360px]">
            <ProgressBar title="Your Progress" value={progress} />
          </div>
        )}
      </div>
      {!canEnroll && (
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/8 px-4 py-3 text-sm text-amber-100">
          Teachers can explore this course, read the roadmap, and join the discussion, but enrollment is disabled.
        </div>
      )}
    </div>
  );
}
