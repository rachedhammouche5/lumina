import RoadmapPage from "@/app/ui/roadmapcomp/RoadmapPage";
import { getSkillsAccessContext } from "@/features/utils/auth/requireUserAccess";

export default async function SkillDetails({
  params,
}: {
  params: Promise<{ skill_id: string }>;
}) {
  const { skill_id } = await params;
  const access = await getSkillsAccessContext();

  return (
    <RoadmapPage
      skillId={skill_id}
      studentId={"studentId" in access ? access.studentId : null}
      canEnroll={access.canEnroll}
      canTrackProgress={access.canTrackProgress}
    />
  );
}
