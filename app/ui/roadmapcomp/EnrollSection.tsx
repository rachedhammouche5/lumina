"use client";

import { useState } from "react";
import EnrollButton from "./EnrollButton";
import ProgressBar from "./ProgressBar";
import BackButton from "@/app/ui/roadmapcomp/BackButton";
import InfoCard from "@/app/ui/roadmapcomp/InfoCard";

export default function EnrollSection({
  skill,
  isLoggedIn,
  initialIsEnrolled,
  progressValue,
}: {
  skill: any;
  isLoggedIn: boolean;
  initialIsEnrolled: boolean;
  progressValue: number;
}) {
  const [isEnrolled, setIsEnrolled] = useState(initialIsEnrolled);
  const [progress, setProgress] = useState(progressValue);

  return (
    <div className="w-full max-w-[1400px] px-4">
      <div className="mb-5 flex w-full items-center justify-between">
        <BackButton />

        <EnrollButton
          skillId={skill.skl_id}
          isLoggedIn={isLoggedIn}
          isEnrolled={isEnrolled}
          setIsEnrolled={setIsEnrolled}
        />
      </div>
      <div className="mb-8 flex w-full flex-row items-start gap-5 md:mb-10">
        <div className="flex-1">
          <InfoCard title={skill?.skl_title} subtitle={skill?.skl_dscrptn} />
        </div>
        {isEnrolled && (
          <div className="flex-1 md:max-w-[360px]">
            <ProgressBar title="Your Progress" value={progress} />
          </div>
        )}
      </div>
    </div>
  );
}
