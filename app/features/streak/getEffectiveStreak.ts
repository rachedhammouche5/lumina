export function getEffectiveStreak(
  streak: number,
  lastActiveDate: string | null | undefined
): number {
  if (!lastActiveDate) return 0;
  const todayStr = new Date().toISOString().split("T")[0];
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const lastActive = lastActiveDate.split("T")[0].split(" ")[0];
  if (lastActive === todayStr || lastActive === yesterdayStr) return streak;
  return 0;
}
