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

      const { data: scores } = await supabase
        .from("score")
        .select("score, tpc_id, Topic(tpc_title, Skill(skl_title))")
        .eq("studentId", student?.std_id);

      type ScoreRow = {
        score: number;
        Topic?: { tpc_title?: string; Skill?: { skl_title?: string }[] }[] | null;
      };

      const map = (s: ScoreRow) => ({
        topic: s.Topic?.[0]?.tpc_title || "",
        skill: s.Topic?.[0]?.Skill?.[0]?.skl_title || "",
        score: Math.round(s.score),
      });
        
        
      setProfile({
        name: student?.std_fullname || "Student",
        currentSkill: "",
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
