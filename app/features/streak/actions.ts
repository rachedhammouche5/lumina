"use server";

import { createClient } from "@/lib/supabase/server";
import { updateStreak } from "./updateStreak";
import type { StreakUpdateResult } from "./types";

export async function updateStreakForCurrentUser(): Promise<StreakUpdateResult | null> {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  return updateStreak(user.id);
}
