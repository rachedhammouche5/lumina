"use server";

import { createClient } from "@/lib/supabase/server";

export type TeacherHomeActivity = {
  id: string;
  skillTitle: string;
  studentName: string;
  comment: string;
  rating: number;
  time: string;
};

export type TeacherHomeData = {
  teacherName: string;
  skillsCount: number;
  topicsCount: number;
  quizzesCount: number;
  activeLearnersCount: number;
  totalHours: number;
  avgRating: string;
  lastActivities: TeacherHomeActivity[];
};

export async function getTeacherHomeData(userId: string): Promise<TeacherHomeData | null> {
  const supabase = await createClient();

  const { data: teacher } = await supabase
    .from("Teacher")
    .select("tchr_id,tchr_fullname")
    .eq("user_id", userId)
    .maybeSingle();

  if (!teacher?.tchr_id) return null;

  const { data: skills } = await supabase
    .from("Skill")
    .select("skl_id,skl_title,skl_duration")
    .eq("teacher_id", teacher.tchr_id);

  const skillRows = skills ?? [];
  const skillIds = skillRows.map((skill) => skill.skl_id);
  const skillTitleById = new Map(skillRows.map((skill) => [skill.skl_id, skill.skl_title]));

  let topicsCount = 0;
  let quizzesCount = 0;
  let activeLearnersCount = 0;
  let lastActivities: TeacherHomeActivity[] = [];

  if (skillIds.length > 0) {
    const [{ count: topicCount }, { count: enrollCount }, { data: recentReviews }] = await Promise.all([
      supabase
        .from("Topic")
        .select("tpc_id", { count: "exact", head: true })
        .in("skill_id", skillIds),
      supabase
        .from("enroll")
        .select("student_id", { count: "exact", head: true })
        .in("skill_id", skillIds),
      supabase
        .from("review")
        .select("id,comment,rating,time,skill_id,studentId")
        .in("skill_id", skillIds)
        .order("time", { ascending: false })
        .limit(6),
    ]);

    topicsCount = topicCount ?? 0;
    activeLearnersCount = enrollCount ?? 0;

    const { data: topicRows } = await supabase
      .from("Topic")
      .select("tpc_id")
      .in("skill_id", skillIds);

    const topicIds = (topicRows ?? []).map((topic) => topic.tpc_id);
    if (topicIds.length > 0) {
      const { count: quizCount } = await supabase
        .from("quiz")
        .select("qst_id", { count: "exact", head: true })
        .in("tpc_id", topicIds);
      quizzesCount = quizCount ?? 0;
    }

    const reviews = recentReviews ?? [];
    if (reviews.length > 0) {
      const studentIds = [...new Set(reviews.map((item) => item.studentId).filter(Boolean))] as string[];
      const { data: students } =
        studentIds.length > 0
          ? await supabase.from("Student").select("std_id,std_fullname").in("std_id", studentIds)
          : { data: [] as { std_id: string; std_fullname: string }[] };

      const studentNameById = new Map((students ?? []).map((student) => [student.std_id, student.std_fullname]));

      lastActivities = reviews.map((review) => ({
        id: review.id,
        skillTitle: skillTitleById.get(review.skill_id) ?? "Skill",
        studentName: studentNameById.get(review.studentId ?? "") ?? "Student",
        comment: review.comment ?? "",
        rating: review.rating ?? 0,
        time: review.time,
      }));
    }
  }

  const totalHours = skillRows.reduce((sum, item) => sum + (item.skl_duration ?? 0), 0);
  const avgRating =
    lastActivities.length > 0
      ? (lastActivities.reduce((sum, item) => sum + item.rating, 0) / lastActivities.length).toFixed(1)
      : "0.0";

  return {
    teacherName: teacher.tchr_fullname?.split(" ")[0] || "Teacher",
    skillsCount: skillRows.length,
    topicsCount,
    quizzesCount,
    activeLearnersCount,
    totalHours,
    avgRating,
    lastActivities,
  };
}
