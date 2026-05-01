import RoadmapFlow from "@/app/ui/roadmapcomp/RoadmapFlow";

import { createClient } from "@/lib/supabase/server";
import type { TopicRow, ScoreRow } from "@/app/ui/roadmapcomp/types";
import EnrollSection from "@/app/ui/roadmapcomp/EnrollSection";
import { calculateRoadmapProgress } from "@/app/actions/roadmap";
import CommentsSection from "@/app/ui/comments/CommentsSection";
import { getSkillReviews } from "@/lib/reviews";
import { getRole } from "@/features/utils/auth/getRole";
import Rating from "@/app/ui/comments/Rating";

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ skill_id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { skill_id } = await params;
  const role = getRole(user);

  const { data: skill } = await supabase
    .from("Skill")
    .select("*")
    .eq("skl_id", skill_id)
    .single();

  let initialIsEnrolled = false;
  let studentId: string | null = null;
  const resolvedSkillId = skill?.skl_id ?? skill_id;
  const reviews = await getSkillReviews(resolvedSkillId);
  let currentUser:
    | {
        id: string;
        name: string;
        pfp: string | null;
        initials: string;
      }
    | null = null;

  if (user) {
    const { data: student, error: studentError } = await supabase
      .from("Student")
      .select("std_id, std_fullname, std_pfp")
      .eq("std_id", user.id)
      .single();

    if (!studentError && student) {
      studentId = student.std_id;
      currentUser = {
        id: student.std_id,
        name:
          student.std_fullname ||
          (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
          (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
          (typeof user.email === "string" && user.email.split("@")[0]) ||
          "Student",
        pfp: student.std_pfp ?? null,
        initials: (student.std_fullname ||
          (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
          (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
          (typeof user.email === "string" && user.email.split("@")[0]) ||
          "Student")
          .split(" ")
          .filter(Boolean)
          .map((part: string) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      };
      const { data: enrollment } = await supabase
        .from("enroll")
        .select("skill_id")
        .eq("student_id", student.std_id)
        .eq("skill_id", skill_id)
        .maybeSingle();

      initialIsEnrolled = !!enrollment;
    }
  }

  if (user && (role === "teacher" || role === "teacher_pending")) {
    const { data: teacher, error: teacherError } = await supabase
      .from("Teacher")
      .select("tchr_id, tchr_fullname, tchr_pfp")
      .eq("tchr_id", user.id)
      .single();

    if (!teacherError && teacher) {
      currentUser = {
        id: teacher.tchr_id,
        name: teacher.tchr_fullname,
        pfp: teacher.tchr_pfp ?? null,
        initials: teacher.tchr_fullname
          .split(" ")
          .filter(Boolean)
          .map((part: string) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      };
    }
  }

  if (!currentUser && user) {
    const fallbackName =
      (typeof user.user_metadata?.full_name === "string" && user.user_metadata.full_name.trim()) ||
      (typeof user.user_metadata?.name === "string" && user.user_metadata.name.trim()) ||
      (typeof user.email === "string" && user.email.split("@")[0]) ||
      "User";

    currentUser = {
      id: user.id,
      name: fallbackName,
      pfp: null,
      initials: fallbackName
        .split(" ")
        .filter(Boolean)
        .map((part: string) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase(),
    };
  }

  const { data: topicsData } = await supabase
    .from("Topic")
    .select("*")
    .eq("skill_id", skill_id);

  const topics = (topicsData ?? []) as TopicRow[];

  // page.tsx
  const { data: scoresData } = studentId
    ? await supabase
        .from("score")
        .select("tpc_id, score")
        .eq("studentId", studentId) 
    : { data: [] };

  const scores = (scoresData ?? []) as ScoreRow[];

  const totalTopics = initialIsEnrolled ? topics.length : 0;
  const progressValue = initialIsEnrolled && totalTopics > 0 ? calculateRoadmapProgress(topics, scores) : 0;

  return (
    <main className="min-h-screen w-full bg-slate-950 text-white flex flex-col items-center pt-16 md:pt-20 px-4 sm:px-6">
      <div className="w-full max-w-[1400px] space-y-10 pb-16">
        <EnrollSection
          skill={skill}
          isLoggedIn={!!user}
          initialIsEnrolled={initialIsEnrolled}
          progressValue={progressValue}
        />

        <section>
          <div className="flex items-center gap-4 mb-5">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Course Path</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>
          <RoadmapFlow topics={topics} scores={scores} isEnrolled={initialIsEnrolled} />
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Rating & Reviews</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row w-full gap-6">
            <Rating comments={reviews} />
            <CommentsSection
              initialComments={reviews}
              skillId={resolvedSkillId}
              currentUser={currentUser}
            />
          </div>
        </section>
      </div>
    </main>
  );
}

