import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").toLowerCase();

  type SkillRow = {
    skl_id: string;
    skl_title: string;
    skl_dscrptn: string | null;
    skl_picture: string | null;
    Teacher?: { tchr_fullname?: string | null; tchr_pfp?: string | null } | { tchr_fullname?: string | null; tchr_pfp?: string | null }[] | null;
  };

  type ReviewRow = {
    skill_id: string;
    rating: number | null;
  };

  let query = supabase
    .from("Skill")
    .select("skl_id,skl_title,skl_dscrptn,skl_duration,skl_picture,teacher_id,Teacher(tchr_fullname,tchr_pfp)")
    .order("skl_title", { ascending: true });

  if (q) {
    query = query.or(`skl_title.ilike.%${q}%,skl_dscrptn.ilike.%${q}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("[api/skills] Supabase error:", error.message);
    return NextResponse.json({ error: "failed to load skills" }, { status: 500 });
  }

  const skills = (data ?? []) as SkillRow[];
  const skillIds = skills.map((row) => row.skl_id);
  const { data: reviewRows } = skillIds.length
    ? await supabase.from("review").select("skill_id,rating").in("skill_id", skillIds)
    : { data: [] as ReviewRow[] };

  const reviewStats = new Map<string, { total: number; count: number }>();
  ((reviewRows ?? []) as ReviewRow[]).forEach((row) => {
    const next = reviewStats.get(row.skill_id) ?? { total: 0, count: 0 };
    next.total += row.rating ?? 0;
    next.count += 1;
    reviewStats.set(row.skill_id, next);
  });

  const mapped =
    skills.map((row) => {
      const teacherRow = Array.isArray(row.Teacher) ? row.Teacher[0] : row.Teacher;
      const stats = reviewStats.get(row.skl_id);
      const averageRating = stats && stats.count > 0 ? stats.total / stats.count : null;

      return {
        id: row.skl_id,
        title: row.skl_title,
        description: row.skl_dscrptn ?? "no description",
        image: row.skl_picture ?? null,
        teacher: teacherRow
          ? {
              name: teacherRow.tchr_fullname ?? "Teacher",
              avatar: teacherRow.tchr_pfp ?? null,
            }
          : null,
        rating: averageRating,
        reviewCount: stats?.count ?? 0,
      };
    }) ?? [];

  return NextResponse.json({ data: mapped });
}
