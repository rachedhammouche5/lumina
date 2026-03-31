import RoadmapFlow from "@/app/ui/roadmapcomp/RoadmapFlow";

import { createClient } from "@/lib/supabase/server";
import type { TopicRow, ScoreRow } from "@/app/ui/roadmapcomp/types";
import EnrollSection from "@/app/ui/roadmapcomp/EnrollSection";

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

  const { data: skill } = await supabase
    .from("Skill")
    .select("*")
    .eq("skl_id", skill_id)
    .single();

  let initialIsEnrolled = false;
  let studentId: string | null = null;

  if (user) {
    const { data: student, error: studentError } = await supabase
      .from("Student")
      .select("std_id")
      .eq("user_id", user.id)
      .single();

    if (!studentError && student) {
      studentId = student.std_id;

      const { data: enrollment } = await supabase
        .from("enroll")
        .select("skill_id")
        .eq("studentId", student.std_id)
        .eq("skill_id", skill_id)
        .maybeSingle();

      initialIsEnrolled = !!enrollment;
    }
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
  const passedTopics = initialIsEnrolled ? scores.filter((s) => s.score >= 50).length : 0;
  const progressValue =
    initialIsEnrolled && totalTopics > 0 ? (passedTopics / totalTopics) * 100 : 0;

  return (
    <main className="min-h-screen min-w-screen bg-slate-950 text-white flex flex-col items-center pt-16 md:pt-20 px-4 sm:px-6 relative overflow-hidden font-sans gap-3">
      <EnrollSection
        skill={skill}
        isLoggedIn={!!user}
        initialIsEnrolled={initialIsEnrolled}
      />
      <div className="w-full max-w-[1400px]">
        <h3 className="text-xl md:text-2xl font-black italic tracking-tight mb-4">
          COURSE PATH
        </h3>
        <RoadmapFlow topics={topics} scores={scores} />
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
