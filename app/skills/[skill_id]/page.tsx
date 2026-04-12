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
      .eq("user_id", user.id)
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

  const { data: scoresData } = studentId
    ? await supabase.from("score").select("*").eq("studentId", studentId)
    : { data: [] };

  const scores = (scoresData ?? []) as ScoreRow[];

  const totalTopics = initialIsEnrolled ? topics.length : 0;
  const progressValue = initialIsEnrolled && totalTopics > 0 ? calculateRoadmapProgress(topics, scores) : 0;

  return (
    <main className="min-h-screen min-w-screen bg-slate-950 text-white flex flex-col items-center pt-16 md:pt-20 px-4 sm:px-6 relative overflow-hidden font-sans gap-3">
      <EnrollSection
        skill={skill}
        isLoggedIn={!!user}
        initialIsEnrolled={initialIsEnrolled}
        progressValue={progressValue}
      />
      <div className="w-full max-w-[1400px]">
        <h3 className="text-xl md:text-2xl font-black italic tracking-tight mb-4">
          COURSE PATH
        </h3>
        <RoadmapFlow topics={topics} scores={scores} isEnrolled={initialIsEnrolled} />
        <div className="mt-15">
          <h3 className="text-xl md:text-2xl font-black italic tracking-tight mb-4 uppercase">
          Rating & Reviews
        </h3>
          <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="mr-8">
            <Rating comments={reviews} />
          </div>

          <CommentsSection 
          initialComments={reviews}
          skillId={resolvedSkillId}
          currentUser={currentUser}
        />
        </div>
        </div>
      </div>
    </main>
  );
}

// import InfoCard from "@/app/ui/roadmapcomp/InfoCard";
// import RoadmapFlow from "@/app/ui/roadmapcomp/RoadmapFlow";
// import ProgressBar from "@/app/ui/roadmapcomp/ProgressBar";
// import Button from "@/app/ui/Button";
// import { dynamicRoadmapPage } from "@/app/actions/roadmap";
// import { Enrollment } from "@/app/actions/enrollement";

// export default async function RoadmapPage({ params }: { params: { std_id: string; skl_id: string } }) {
//   const { skill, enrollment, topics = [], scores = [] } = await dynamicRoadmapPage(params.skl_id, params.std_id);

//   const totalTopics = topics.length;
//   const passedTopics = scores.filter((s) => s.score >= 50).length;
//   const progressValue = totalTopics > 0 ? (passedTopics / totalTopics) * 100 : 0;

//   return (
//     <main className="min-h-screen min-w-screen bg-slate-950 text-white flex flex-col items-center pt-16 md:pt-20 px-4 sm:px-6 relative overflow-hidden font-sans gap-3">
//       <div className="w-full justify-between flex flex-row pl-10 pr-10">
//         <Button
//           variant="outline"
//           size="s"
//           className="bg-linear-to-br from-slate-300/50 to-slate-500/10 border-2 border-slate-700/40"
//           href={`/student/${params.std_id}/courses`}
//         >
//           {"<\t Back to courses"}
//         </Button>
//         {!enrollment ? (
//           <form
//             action={async () => {
//               "use server";
//               await Enrollment(params.skl_id, params.std_id);
//             }}
//           >
//             <Button
//               type="submit"
//               variant="outline"
//               size="s"
//               className="bg-linear-to-br from-slate-300/50 to-slate-500/10 border-2 border-slate-700/40"
//             >
//               Enroll Now
//             </Button>
//           </form>
//         ) : (
//           <Button
//             variant="outline"
//             size="s"
//             className="opacity-70 cursor-not-allowed pointer-events-none"
//           >
//             Enrolled
//           </Button>
//         )}
//       </div>
//       <div className="w-full max-w-[1400px] flex flex-col md:flex-row gap-5 mb-8 md:mb-10">
//         <div className="w-full md:flex-[2]">
//           <InfoCard title={skill?.skl_title} subtitle={skill?.skl_dscrptn} />
//         </div>
//         <div className="w-full md:flex-1">
//           <ProgressBar title="Your Next Progres" value={progressValue} />
//         </div>
//       </div>
//       <div className="w-full max-w-[1400px]">
//         <h3 className="text-xl md:text-2xl font-black italic tracking-tight mb-4">COURSE PATH</h3>
//         <RoadmapFlow topics={topics} scores={scores} />
//       </div>
//     </main>
//   );
// }
