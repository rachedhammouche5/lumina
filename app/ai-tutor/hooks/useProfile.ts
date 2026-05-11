import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserProfile, DEFAULT_PROFILE } from "../types";
import { getEffectiveStreak } from "@/app/features/streak/getEffectiveStreak";

type ProfileScoreRow = {
  score: number;
  tpc_id: string | null;
  Topic?: {
    tpc_title?: string | null;
    Skill?: { skl_title?: string } | { skl_title?: string }[] | null;
  } | null;
};

type ProfileEnrollRow = {
  progress: number;
  skill_id: string;
  Skill?: { skl_title?: string } | { skl_title?: string }[] | null;
};

// This helper safely handles whether Skill is an object or an array [cite: 48, 57]
const getSkillTitle = (skill: ProfileEnrollRow["Skill"]) => {
  const current = Array.isArray(skill) ? skill[0] : skill;
  return current?.skl_title ?? "";
};

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchProfile() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setProfile(DEFAULT_PROFILE);
          return;
        }

        const { data: student } = await supabase
          .from("Student")
          .select("std_fullname, std_streak, std_id, std_last_activeDate")
          .eq("user_id", user.id)
          .single();

        const [{ data: scores }, { data: enrolled }] = await Promise.all([
          supabase
            .from("score")
            .select("score, tpc_id, Topic(tpc_title, Skill(skl_title))")
            .eq("studentId", student?.std_id ?? ""),
          supabase
            .from("enroll")
            .select("skill_id, progress, Skill(skl_title)")
            .eq("student_id", student?.std_id ?? ""),
        ]);

        const scoreRows = (scores ?? []) as ProfileScoreRow[];
        const enrollmentRows = (enrolled ?? []) as ProfileEnrollRow[];

        const map = (s: ProfileScoreRow) => ({
          topic: s.Topic?.tpc_title || "",
          skill: getSkillTitle(s.Topic?.Skill) || "", 
          score: Math.round(s.score),
        });

        const inProgress = enrollmentRows.find((e) => e.progress > 0 && e.progress < 100);
        const currentSkill = getSkillTitle(inProgress?.Skill) || getSkillTitle(enrollmentRows[0]?.Skill) || "your course";

        setProfile({
          name: student?.std_fullname || "Student",
          currentSkill,
          streak: getEffectiveStreak(student?.std_streak || 0, student?.std_last_activeDate),
          weakPoints: scoreRows.filter((s) => s.score < 70).map(map),
          strongPoints: scoreRows.filter((s) => s.score >= 70).map(map),
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setProfileLoading(false);
      }
    }
    fetchProfile();
  }, []);

  return { profile, profileLoading };
}