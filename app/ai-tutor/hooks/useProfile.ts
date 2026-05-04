import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { UserProfile, DEFAULT_PROFILE } from "../types";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setProfileLoading(false); return; }

      const { data: student } = await supabase
        .from("Student")
        .select("std_fullname, std_streak, std_id")
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

      const map = (s: any) => ({
        topic: s.Topic?.tpc_title || "",
        skill: s.Topic?.Skill?.skl_title || "",
        score: Math.round(s.score),
      });

      const inProgress = enrolled?.find((e: any) => e.progress > 0 && e.progress < 100);
      const currentSkill =
        (inProgress as any)?.Skill?.skl_title ||
        (enrolled?.[0] as any)?.Skill?.skl_title ||
        "your course";

      setProfile({
        name: student?.std_fullname || "Student",
        currentSkill,
        streak: student?.std_streak || 0,
        weakPoints: scores?.filter((s) => s.score < 70).map(map) || [],
        strongPoints: scores?.filter((s) => s.score >= 70).map(map) || [],
      });
      setProfileLoading(false);
    }
    fetchProfile();
  }, []);

  return { profile, profileLoading };
}
