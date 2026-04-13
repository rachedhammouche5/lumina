import { createClient } from "@/lib/supabase/server";

type ReviewQueryRow = {
  id: string;
  studentId: string;
  parent_id: string | null;
  comment: string;
  rating: number;
  time: string | null;
  review_likes?: Array<{ count?: number | null }> | null;
  Student?: {
    std_id: string;
    std_fullname: string | null;
    std_pfp: string | null;
  } | null;
};

type TeacherProfile = {
  tchr_id: string;
  tchr_fullname: string;
  tchr_pfp: string | null;
};

type CommentRole = "student" | "teacher";

const initialsFromName = (name: string | null | undefined) =>
  name
    ?.split(" ")
    .filter((part: string) => Boolean(part))
    .map((part: string) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "??";

const toDate = (value: string | null | undefined) => {
  const parsed = value ? new Date(value) : new Date();
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed;
};

const getLikeCount = (row: ReviewQueryRow) => {
  const count = row.review_likes?.[0]?.count;
  return typeof count === "number" ? count : 0;
};

export async function getSkillReviews(skillId: string) {
  const supabase = await createClient();

  const { data: skill } = await supabase
    .from("Skill")
    .select("teacher_id")
    .eq("skl_id", skillId)
    .maybeSingle();

  const teacherId = skill?.teacher_id ?? null;
  let teacherProfile: TeacherProfile | null = null;

  if (teacherId) {
    const { data: teacher } = await supabase
      .from("Teacher")
      .select("tchr_id, tchr_fullname, tchr_pfp")
      .eq("tchr_id", teacherId)
      .maybeSingle();

    teacherProfile = teacher ?? null;
  }

  const { data, error } = await supabase
    .from("review")
    .select(`
      *,
      Student (std_id, std_fullname, std_pfp),
      review_likes(count)
    `)
    .eq("skill_id", skillId)
    .order("time", { ascending: false });

  if (error || !data) return [];

  const rows = data as ReviewQueryRow[];
  const mainComments = rows.filter((item) => !item.parent_id);
  const allReplies = rows.filter((item) => item.parent_id);

  const buildAuthor = (row: ReviewQueryRow): { id: string; name: string; pfp: string | null; initials: string; role: CommentRole } => {
    const isTeacher = row.studentId === teacherId;
    const teacherName = teacherProfile?.tchr_fullname || "Teacher";
    const studentName = row.Student?.std_fullname || "Anonymous";
    const displayName = isTeacher ? teacherName : studentName;

    return {
      id: row.studentId,
      name: displayName,
      pfp: isTeacher ? teacherProfile?.tchr_pfp || null : row.Student?.std_pfp || null,
      initials: initialsFromName(isTeacher ? teacherProfile?.tchr_fullname : row.Student?.std_fullname),
      role: isTeacher ? "teacher" : "student",
    };
  };

  return mainComments.map((main) => ({
    id: main.id,
    user: buildAuthor(main),
    content: main.comment,
    createdAt: toDate(main.time),
    likes: getLikeCount(main),
    rating: main.rating,
    replies: allReplies
      .filter((reply) => reply.parent_id === main.id)
      .map((reply) => ({
        id: reply.id,
        user: buildAuthor(reply),
        content: reply.comment,
        createdAt: toDate(reply.time),
        likes: getLikeCount(reply),
        rating: reply.rating,
      })),
  }));
}

