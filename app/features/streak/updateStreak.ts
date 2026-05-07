"use server";
import { createClient } from "@/lib/supabase/server";
import type { StreakUpdateResult } from "./types";

function normalizeDate(value?: string | null) {
  if (!value) return null;
  return value.split("T")[0].split(" ")[0];
}

function getYesterdayStr() {
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  return yesterday.toISOString().split("T")[0];
}

export async function updateStreak(userId: string): Promise<StreakUpdateResult | null> {
  const supabase = await createClient();

  const { data: student, error } = await supabase
    .from("Student")
    .select("std_streak, std_last_activeDate")
    .or(`user_id.eq.${userId},std_id.eq.${userId}`)
    .single();

  if (error || !student) return null;

  const todayStr = new Date().toISOString().split("T")[0];
  const lastActiveStr = normalizeDate(student.std_last_activeDate);
  const currentStreak = typeof student.std_streak === "number" ? student.std_streak : 0;

  if (lastActiveStr === todayStr) {
    return { previous: currentStreak, current: currentStreak, updated: false };
  }

  const yesterdayStr = getYesterdayStr();
  const wasYesterday = lastActiveStr === yesterdayStr;

  // If streak was already broken (not yesterday), reset to 0 first, then 1 for today
  const newStreak = wasYesterday ? currentStreak + 1 : 1;

  const { error: updateError } = await supabase
    .from("Student")
    .update({ std_streak: newStreak, std_last_activeDate: todayStr })
    .or(`user_id.eq.${userId},std_id.eq.${userId}`);

  if (updateError) {
    return { previous: currentStreak, current: currentStreak, updated: false };
  }

  return { previous: wasYesterday ? currentStreak : 0, current: newStreak, updated: true };
}

/**
 * Resets streak to 0 in DB if the student missed a day.
 * Call this on dashboard/profile load so the stored value stays accurate.
 */
export async function resetStreakIfBroken(userId: string): Promise<void> {
  const supabase = await createClient();

  const { data: student, error } = await supabase
    .from("Student")
    .select("std_streak, std_last_activeDate")
    .or(`user_id.eq.${userId},std_id.eq.${userId}`)
    .single();

  if (error || !student) return;
  if (!student.std_streak || student.std_streak === 0) return;

  const todayStr = new Date().toISOString().split("T")[0];
  const yesterdayStr = getYesterdayStr();
  const lastActiveStr = normalizeDate(student.std_last_activeDate);

  if (lastActiveStr !== todayStr && lastActiveStr !== yesterdayStr) {
    await supabase
      .from("Student")
      .update({ std_streak: 0 })
      .or(`user_id.eq.${userId},std_id.eq.${userId}`);
  }
}
