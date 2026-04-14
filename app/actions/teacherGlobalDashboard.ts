import { createClient } from "@/lib/supabase/server";

type TeacherSkill = {
  skl_id: string;
  skl_title: string;
};

type TeacherTopic = {
  tpc_id: string;
  tpc_title: string;
  skill_id: string | null;
};

type TeacherContent = {
  cntnt_id: string;
  cntnt_title: string;
  tpc_id: string | null;
};

type TeacherEnroll = {
  studentId: string;
  skill_id: string | null;
  progress: number;
};

type TeacherScore = {
  studentId: string;
  tpc_id: string;
  score: number;
  time_taken: number;
};

type TeacherReview = {
  studentId: string;
  content_id: string;
  rating: number;
  comment: string;
};

type TeacherStudent = {
  std_id: string;
  std_fullname: string;
  std_level: string;
  std_streak: number;
  std_last_activeDate: string;
  std_pfp: string | null;
};

type DashboardChartPoint = {
  name: string;
  students: number;
  likes: number;
  comments: number;
  interactions: number;
};

type DashboardSkillInsight = {
  id: string;
  title: string;
  students: number;
  avgScore: number;
  reviews: number;
  engagement: number;
};

type DashboardTopPerformer = {
  id: string;
  name: string;
  level: string;
  streak: number;
  avgScore: number;
  reviews: number;
  progress: number;
  lastActive: string;
  avatar: string | null;
};

type RankedTopPerformer = DashboardTopPerformer & {
  engagementScore: number;
};

export type TeacherDashboardData = {
  teacherName: string;
  totalStudents: number;
  avgRating: number;
  countStreak: number;
  totalSkills: number;
  totalReviews: number;
  avgScore: number;
  chartData: DashboardChartPoint[];
  skillInsights: DashboardSkillInsight[];
  topPerformers: DashboardTopPerformer[];
};

export async function getTeacherDashboardData(): Promise<TeacherDashboardData | null> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user || authError) return null;

  const { data: teacher, error: teacherError } = await supabase
    .from("Teacher")
    .select("tchr_id,tchr_fullname")
    .eq("user_id", user.id)
    .single();

  if (!teacher || teacherError) {
    console.error("teacher not found or error fetching teacher:", teacherError);
    return null;
  }

  const { data: skillsRaw } = await supabase
    .from("Skill")
    .select("skl_id,skl_title")
    .eq("teacher_id", teacher.tchr_id);

  const skills = (skillsRaw ?? []) as TeacherSkill[];
  const skillIds = skills.map((skill) => skill.skl_id);

  if (!skillIds.length) {
    const { data: streakData } = await supabase.rpc("get_count_streak_by_teacher", {
      teacher_id_param: teacher.tchr_id,
    });

    return {
      teacherName: teacher.tchr_fullname,
      totalStudents: 0,
      avgRating: 0,
      countStreak: Number(streakData ?? 0),
      totalSkills: 0,
      totalReviews: 0,
      avgScore: 0,
      chartData: [],
      skillInsights: [],
      topPerformers: [],
    };
  }

  const { data: topicsRaw } = await supabase
    .from("Topic")
    .select("tpc_id,tpc_title,skill_id")
    .in("skill_id", skillIds);

  const topics = (topicsRaw ?? []) as TeacherTopic[];
  const topicIds = topics.map((topic) => topic.tpc_id);

  const [contentRes, enrollRes, scoreRes, studentRes, streakRes] = await Promise.all([
    topicIds.length
      ? supabase.from("Content").select("cntnt_id,cntnt_title,tpc_id").in("tpc_id", topicIds)
      : Promise.resolve({ data: [] }),
    supabase.from("enroll").select("studentId,skill_id,progress").in("skill_id", skillIds),
    topicIds.length
      ? supabase.from("score").select("studentId,tpc_id,score,time_taken").in("tpc_id", topicIds)
      : Promise.resolve({ data: [] }),
    supabase.from("Student").select("std_id,std_fullname,std_level,std_streak,std_last_activeDate,std_pfp"),
    supabase.rpc("get_count_streak_by_teacher", { teacher_id_param: teacher.tchr_id }),
  ]);

  const contents = (contentRes.data ?? []) as TeacherContent[];
  const contentIds = contents.map((content) => content.cntnt_id);
  const reviewRes = contentIds.length
    ? await supabase.from("review").select("studentId,content_id,rating,comment").in("content_id", contentIds)
    : { data: [] as TeacherReview[] };
  const enrollments = (enrollRes.data ?? []) as TeacherEnroll[];
  const scores = (scoreRes.data ?? []) as TeacherScore[];
  const reviews = (reviewRes.data ?? []) as TeacherReview[];
  const students = (studentRes.data ?? []) as TeacherStudent[];

  const topicIdsBySkill = new Map<string, string[]>();
  const contentIdsBySkill = new Map<string, string[]>();
  topics.forEach((topic) => {
    if (!topic.skill_id) return;
    const existing = topicIdsBySkill.get(topic.skill_id) ?? [];
    existing.push(topic.tpc_id);
    topicIdsBySkill.set(topic.skill_id, existing);
  });
  contents.forEach((content) => {
    const parentTopic = topics.find((topic) => topic.tpc_id === content.tpc_id);
    if (!parentTopic?.skill_id) return;
    const existing = contentIdsBySkill.get(parentTopic.skill_id) ?? [];
    existing.push(content.cntnt_id);
    contentIdsBySkill.set(parentTopic.skill_id, existing);
  });

  const skillToEnrolledStudents = new Map<string, Set<string>>();
  const studentToEnrollments = new Map<string, TeacherEnroll[]>();
  enrollments.forEach((enrollment) => {
    if (!enrollment.skill_id) return;
    const enrolledSet = skillToEnrolledStudents.get(enrollment.skill_id) ?? new Set<string>();
    enrolledSet.add(enrollment.studentId);
    skillToEnrolledStudents.set(enrollment.skill_id, enrolledSet);

    const studentEnrollments = studentToEnrollments.get(enrollment.studentId) ?? [];
    studentEnrollments.push(enrollment);
    studentToEnrollments.set(enrollment.studentId, studentEnrollments);
  });

  const skillChartData = skills.map((skill): DashboardChartPoint => {
    const relatedTopics = topicIdsBySkill.get(skill.skl_id) ?? [];
    const relatedContentIds = contentIdsBySkill.get(skill.skl_id) ?? [];
    const relatedScores = scores.filter((score) => relatedTopics.includes(score.tpc_id));
    const relatedReviews = reviews.filter((review) => relatedContentIds.includes(review.content_id));
    const positiveReviews = relatedReviews.filter((review) => review.rating >= 4);

    return {
      name: skill.skl_title,
      students: skillToEnrolledStudents.get(skill.skl_id)?.size ?? 0,
      likes: positiveReviews.length,
      comments: relatedReviews.filter((review) => review.comment.trim().length > 0).length,
      interactions: relatedScores.length + relatedReviews.length,
    };
  });

  const chartData = skillChartData
    .sort((a, b) => b.interactions - a.interactions || b.students - a.students)
    .slice(0, 6);

  const studentById = new Map(students.map((student) => [student.std_id, student]));

  const performers = Array.from(studentToEnrollments.keys()).map((studentId): RankedTopPerformer | null => {
    const student = studentById.get(studentId);
    if (!student) return null;

    const studentScores = scores.filter((score) => score.studentId === studentId);
    const studentReviews = reviews.filter((review) => review.studentId === studentId);
    const studentEnrollments = studentToEnrollments.get(studentId) ?? [];
    const avgScore =
      studentScores.length > 0
        ? studentScores.reduce((sum, score) => sum + score.score, 0) / studentScores.length
        : 0;
    const avgProgress =
      studentEnrollments.length > 0
        ? studentEnrollments.reduce((sum, enrollment) => sum + enrollment.progress, 0) / studentEnrollments.length
        : 0;
    const positiveReviews = studentReviews.filter((review) => review.rating >= 4).length;
    const engagementScore =
      avgScore * 0.5 +
      positiveReviews * 18 +
      studentReviews.length * 6 +
      avgProgress * 0.25 +
      student.std_streak * 2;

    return {
      id: student.std_id,
      name: student.std_fullname,
      level: student.std_level,
      streak: student.std_streak,
      avgScore: Math.round(avgScore),
      reviews: studentReviews.length,
      progress: Math.round(avgProgress),
      lastActive: student.std_last_activeDate,
      avatar: student.std_pfp,
      engagementScore,
    };
  }).filter((item): item is RankedTopPerformer => item !== null);

  const topPerformers = performers
    .sort((a, b) => b.engagementScore - a.engagementScore || b.avgScore - a.avgScore)
    .slice(0, 3)
    .map((performer) => {
      const { engagementScore, ...rest } = performer;
      void engagementScore;
      return rest;
    });

  const totalStudents = new Set(enrollments.map((enrollment) => enrollment.studentId)).size;
  const avgScore =
    scores.length > 0
      ? scores.reduce((sum, score) => sum + score.score, 0) / scores.length
      : 0;
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  return {
    teacherName: teacher.tchr_fullname,
    totalStudents,
    avgRating: Math.round(avgRating * 10) / 10,
    countStreak: Number(streakRes.data ?? 0),
    totalSkills: skills.length,
    totalReviews: reviews.length,
    avgScore: Math.round(avgScore),
    chartData: chartData.length ? chartData : skillChartData.slice(0, 6),
    skillInsights: skills.map((skill) => {
      const relatedTopics = topicIdsBySkill.get(skill.skl_id) ?? [];
      const relatedContentIds = contentIdsBySkill.get(skill.skl_id) ?? [];
      const relatedScores = scores.filter((score) => relatedTopics.includes(score.tpc_id));
      const relatedReviews = reviews.filter((review) => relatedContentIds.includes(review.content_id));

      const studentsInSkill = skillToEnrolledStudents.get(skill.skl_id)?.size ?? 0;
      const skillAvgScore =
        relatedScores.length > 0
          ? relatedScores.reduce((sum, score) => sum + score.score, 0) / relatedScores.length
          : 0;

      return {
        id: skill.skl_id,
        title: skill.skl_title,
        students: studentsInSkill,
        avgScore: Math.round(skillAvgScore),
        reviews: relatedReviews.length,
        engagement: relatedScores.length + relatedReviews.length + studentsInSkill,
      };
    }).sort((a, b) => b.engagement - a.engagement),
    topPerformers,
  };
}
