import type { createAdminClient } from "@/lib/supabase/admin";
import type { Database, Json } from "@/database.types";

export type PrestigeRarity = "Bronze" | "Silver" | "Gold" | "Obsidian" | "Legendary";
export type PrestigeBadgeStatus = "locked" | "progress" | "unlocked";
export type PrestigeIconKey =
  | "Target"
  | "ShieldCheck"
  | "Trophy"
  | "Flame"
  | "Crown"
  | "Brain"
  | "Sparkles"
  | "Gem"
  | "Award";

type StudentAchievementRow = Database["public"]["Tables"]["student_achievement"]["Row"];

export type PrestigeStats = {
  streak: number;
  skillsCompleted: number;
  quizzesTaken: number;
  strongTopics: number;
  averageScore: number;
  currentRank: number;
  totalStudents: number;
};

export type PrestigeBadgeView = {
  id: string;
  name: string;
  subtitle: string;
  rarity: PrestigeRarity;
  status: PrestigeBadgeStatus;
  iconKey: PrestigeIconKey;
  description: string;
  unlockCondition: string;
  trackingSignal: string;
  reward: string;
  accent: string;
  accentSoft: string;
  accentRing: string;
  progress: number;
  glowClass: string;
  earnedAt: string | null;
  globalCount: number;
  isHidden: boolean;
  criteriaType: string;
  isNew: boolean;
};

type AdminClient = Awaited<ReturnType<typeof createAdminClient>>;

type AchievementSeed = {
  criteriaType: string;
  criteriaValue: Json;
  name: string;
  subtitle: string;
  rarity: PrestigeRarity;
  iconKey: PrestigeIconKey;
  description: string;
  unlockCondition: string;
  trackingSignal: string;
  reward: string;
  accent: string;
  accentSoft: string;
  accentRing: string;
  isHidden: boolean;
};

const ACHIEVEMENT_SEEDS: AchievementSeed[] = [
  {
    criteriaType: "prestige:first_quiz",
    criteriaValue: { metric: "quizzes_taken", threshold: 1 },
    name: "Bronze Initiate",
    subtitle: "Your first mark of momentum",
    rarity: "Bronze",
    iconKey: "Target",
    description: "Your first quiz is always a win. This badge says you entered the game.",
    unlockCondition: "Complete your first quiz.",
    trackingSignal: "Count quiz attempts for the student.",
    reward: "Bronze glow and a clean starter badge.",
    accent: "from-orange-400 to-amber-300",
    accentSoft: "from-orange-500/20 via-amber-500/10 to-black",
    accentRing: "ring-orange-400/25",
    isHidden: false,
  },
  {
    criteriaType: "prestige:quizzes_3",
    criteriaValue: { metric: "quizzes_taken", threshold: 3 },
    name: "Trailhead",
    subtitle: "Three steps in",
    rarity: "Bronze",
    iconKey: "Sparkles",
    description: "A tiny but meaningful spark for students who keep going after the first quiz.",
    unlockCondition: "Complete 3 quizzes.",
    trackingSignal: "Count quiz attempts for the student.",
    reward: "Bronze spark trail and a brighter profile outline.",
    accent: "from-orange-300 to-amber-200",
    accentSoft: "from-orange-500/18 via-amber-500/10 to-black",
    accentRing: "ring-orange-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:quizzes_5",
    criteriaValue: { metric: "quizzes_taken", threshold: 5 },
    name: "Comeback Spark",
    subtitle: "Back after the pause",
    rarity: "Bronze",
    iconKey: "Sparkles",
    description: "A small badge that still feels good: you came back, and that matters.",
    unlockCondition: "Complete 5 quizzes.",
    trackingSignal: "Count total quiz attempts.",
    reward: "Bronze shimmer and a bright restart feel.",
    accent: "from-orange-300 via-amber-200 to-yellow-200",
    accentSoft: "from-orange-500/18 via-amber-500/10 to-black",
    accentRing: "ring-orange-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:streak_3",
    criteriaValue: { metric: "streak", threshold: 3 },
    name: "Mini Flame",
    subtitle: "Three days in a row",
    rarity: "Bronze",
    iconKey: "Flame",
    description: "The first real streak win. Small, but it tells the student they can keep showing up.",
    unlockCondition: "Maintain a 3-day streak.",
    trackingSignal: "Use std_streak as the streak source.",
    reward: "A tiny bronze flame with a warm pulse.",
    accent: "from-orange-400 to-amber-300",
    accentSoft: "from-orange-500/18 via-amber-500/10 to-black",
    accentRing: "ring-orange-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:streak_5",
    criteriaValue: { metric: "streak", threshold: 5 },
    name: "Rhythm Start",
    subtitle: "Five day rhythm",
    rarity: "Bronze",
    iconKey: "Target",
    description: "A clear sign the habit is starting to stick.",
    unlockCondition: "Maintain a 5-day streak.",
    trackingSignal: "Use std_streak as the streak source.",
    reward: "Bronze ring with a steady pulse.",
    accent: "from-orange-300 via-amber-200 to-yellow-200",
    accentSoft: "from-orange-500/18 via-amber-500/10 to-black",
    accentRing: "ring-orange-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:strong_topics_1",
    criteriaValue: { metric: "strong_topics", threshold: 1 },
    name: "First Strong",
    subtitle: "One topic mastered",
    rarity: "Bronze",
    iconKey: "ShieldCheck",
    description: "The first proof that effort is turning into skill.",
    unlockCondition: "Reach 70%+ on 1 topic.",
    trackingSignal: "Count topic scores at or above 70 percent.",
    reward: "A bronze shield glow with a clean edge.",
    accent: "from-orange-300 to-amber-300",
    accentSoft: "from-orange-500/18 via-amber-500/10 to-black",
    accentRing: "ring-orange-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:skills_1",
    criteriaValue: { metric: "skills_completed", threshold: 1 },
    name: "First Finish",
    subtitle: "A full skill completed",
    rarity: "Bronze",
    iconKey: "Trophy",
    description: "A meaningful first finish for students who take the whole path.",
    unlockCondition: "Complete 1 skill.",
    trackingSignal: "Count enrollments at 100 percent progress.",
    reward: "Bronze trophy frame and a soft victory glow.",
    accent: "from-orange-300 via-amber-200 to-yellow-200",
    accentSoft: "from-orange-500/18 via-amber-500/10 to-black",
    accentRing: "ring-orange-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:average_60",
    criteriaValue: { metric: "average_score", threshold: 60 },
    name: "Getting Warm",
    subtitle: "Average score above 60",
    rarity: "Bronze",
    iconKey: "Award",
    description: "A confidence badge for getting out of the starting zone.",
    unlockCondition: "Keep a 60% average score or better.",
    trackingSignal: "Track total score average across all quiz attempts.",
    reward: "A bronze medal shimmer and a brighter baseline.",
    accent: "from-orange-300 via-amber-200 to-yellow-200",
    accentSoft: "from-orange-500/18 via-amber-500/10 to-black",
    accentRing: "ring-orange-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:streak_7",
    criteriaValue: { metric: "streak", threshold: 7 },
    name: "Returner",
    subtitle: "Back for a full week",
    rarity: "Silver",
    iconKey: "Flame",
    description: "A quiet win for students who show up day after day and make learning a habit.",
    unlockCondition: "Maintain a 7-day streak.",
    trackingSignal: "Use std_streak as the streak source.",
    reward: "Silver aura band and a steady glow line.",
    accent: "from-slate-100 to-slate-400",
    accentSoft: "from-slate-200/15 via-slate-400/10 to-black",
    accentRing: "ring-slate-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:strong_topics_3",
    criteriaValue: { metric: "strong_topics", threshold: 3 },
    name: "Silver Focus",
    subtitle: "Precision under pressure",
    rarity: "Silver",
    iconKey: "ShieldCheck",
    description: "Reserved for students who consistently hit strong scores instead of just finishing lessons.",
    unlockCondition: "Reach 70%+ on 3 topics.",
    trackingSignal: "Count topic scores at or above 70 percent.",
    reward: "Silver-edged card frame and leaderboard highlight.",
    accent: "from-slate-100 to-slate-400",
    accentSoft: "from-slate-200/15 via-slate-400/10 to-black",
    accentRing: "ring-slate-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:quizzes_12",
    criteriaValue: { metric: "quizzes_taken", threshold: 12 },
    name: "Stable Pace",
    subtitle: "Consistent, not rushed",
    rarity: "Silver",
    iconKey: "Award",
    description: "A reassuring badge for students who keep building momentum without burning out.",
    unlockCondition: "Complete 12 quizzes.",
    trackingSignal: "Count quiz attempts across the platform.",
    reward: "Silver ribbon with a calm, polished glow.",
    accent: "from-slate-200 to-sky-300",
    accentSoft: "from-slate-200/15 via-sky-500/10 to-black",
    accentRing: "ring-slate-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:streak_14",
    criteriaValue: { metric: "streak", threshold: 14 },
    name: "Fortnight Flow",
    subtitle: "Two weeks straight",
    rarity: "Silver",
    iconKey: "Target",
    description: "A disciplined silver badge that signals the habit is real now.",
    unlockCondition: "Maintain a 14-day streak.",
    trackingSignal: "Use std_streak as the streak source.",
    reward: "A polished silver flow line and soft pulse.",
    accent: "from-slate-100 via-sky-200 to-slate-300",
    accentSoft: "from-slate-200/15 via-sky-500/10 to-black",
    accentRing: "ring-slate-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:skills_2",
    criteriaValue: { metric: "skills_completed", threshold: 2 },
    name: "Growth Path",
    subtitle: "Two full skills",
    rarity: "Silver",
    iconKey: "Brain",
    description: "A strong silver marker for students who can finish more than once.",
    unlockCondition: "Complete 2 skills.",
    trackingSignal: "Count enrollments at 100 percent progress.",
    reward: "Silver brain glow and a growth ribbon.",
    accent: "from-slate-200 via-sky-200 to-slate-300",
    accentSoft: "from-slate-200/15 via-sky-500/10 to-black",
    accentRing: "ring-slate-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:skills_3",
    criteriaValue: { metric: "skills_completed", threshold: 3 },
    name: "Gold Conqueror",
    subtitle: "Three skills complete",
    rarity: "Gold",
    iconKey: "Trophy",
    description: "A gold badge for students who have shown real staying power.",
    unlockCondition: "Complete 3 skills.",
    trackingSignal: "Count enrollments at 100 percent progress.",
    reward: "Golden frame, gilded icon halo, and a stronger prestige aura.",
    accent: "from-amber-300 to-yellow-200",
    accentSoft: "from-amber-400/18 via-yellow-400/10 to-black",
    accentRing: "ring-amber-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:quizzes_20",
    criteriaValue: { metric: "quizzes_taken", threshold: 20 },
    name: "Marathon Mind",
    subtitle: "Twenty quizzes complete",
    rarity: "Gold",
    iconKey: "ShieldCheck",
    description: "Gold for the students who stay in the race long enough to become dangerous.",
    unlockCondition: "Complete 20 quizzes.",
    trackingSignal: "Count total quiz attempts.",
    reward: "A marathon shield with gold-black contrast.",
    accent: "from-amber-300 via-yellow-300 to-orange-200",
    accentSoft: "from-amber-400/18 via-yellow-400/10 to-black",
    accentRing: "ring-amber-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:streak_30",
    criteriaValue: { metric: "streak", threshold: 30 },
    name: "Month Maker",
    subtitle: "Thirty days strong",
    rarity: "Gold",
    iconKey: "Flame",
    description: "A real month of consistency. This is where effort starts to look like identity.",
    unlockCondition: "Maintain a 30-day streak.",
    trackingSignal: "Use std_streak as the streak source.",
    reward: "Gold fire with a black-gold edge.",
    accent: "from-amber-300 via-yellow-300 to-orange-200",
    accentSoft: "from-amber-400/18 via-yellow-400/10 to-black",
    accentRing: "ring-amber-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:average_95",
    criteriaValue: { metric: "average_score", threshold: 95 },
    name: "Perfect Memory",
    subtitle: "Every answer locked in",
    rarity: "Gold",
    iconKey: "Brain",
    description: "A badge for flawless recall and real retention, not just speed-tapping through multiple choice.",
    unlockCondition: "Keep a 95% average score or better.",
    trackingSignal: "Track total score average across all quiz attempts.",
    reward: "Gold memory sigil and a polished mastery ribbon.",
    accent: "from-amber-200 to-orange-300",
    accentSoft: "from-amber-400/16 via-orange-400/10 to-black",
    accentRing: "ring-amber-300/20",
    isHidden: false,
  },
  {
    criteriaType: "prestige:streak_60",
    criteriaValue: { metric: "streak", threshold: 60 },
    name: "Iron Spine",
    subtitle: "Sixty days of showing up",
    rarity: "Obsidian",
    iconKey: "Flame",
    description: "A heavy badge for the kind of learner who refuses to quit once the work gets real.",
    unlockCondition: "Maintain a 60-day streak.",
    trackingSignal: "Use std_streak as the streak source of truth.",
    reward: "Obsidian-metal frame with ember sparks.",
    accent: "from-zinc-100 to-amber-300",
    accentSoft: "from-zinc-950 via-black to-amber-400/10",
    accentRing: "ring-amber-400/15",
    isHidden: false,
  },
  {
    criteriaType: "prestige:top_percent_1",
    criteriaValue: { metric: "top_percent", threshold: 1 },
    name: "The 1%",
    subtitle: "Elite performance, globally ranked",
    rarity: "Obsidian",
    iconKey: "Gem",
    description: "A global prestige badge for the best of the best. It should feel expensive and almost mythic.",
    unlockCondition: "Finish inside the top 1 percent of all students.",
    trackingSignal: "Award from a leaderboard job that recalculates percentile ranks.",
    reward: "Black crystal frame, gold fracture lines, and a rare-status banner.",
    accent: "from-amber-200 via-slate-200 to-zinc-300",
    accentSoft: "from-zinc-950 via-black to-amber-500/10",
    accentRing: "ring-amber-400/15",
    isHidden: false,
  },
  {
    criteriaType: "prestige:leaderboard_1",
    criteriaValue: { metric: "leaderboard_rank", threshold: 1 },
    name: "Arcane Legend",
    subtitle: "Purple royalty, earned the hard way",
    rarity: "Legendary",
    iconKey: "Crown",
    description: "Legendary should feel magical and rare. This tier uses violet energy, gold accents, and a royal silhouette.",
    unlockCondition: "Place 1st on the platform leaderboard.",
    trackingSignal: "Compute leaderboard rank from total score points.",
    reward: "Legendary violet aura, animated sheen, and crown-level profile treatment.",
    accent: "from-violet-300 via-fuchsia-300 to-amber-200",
    accentSoft: "from-violet-500/20 via-fuchsia-500/10 to-black",
    accentRing: "ring-violet-300/25",
    isHidden: false,
  },
  {
    criteriaType: "prestige:night_owl",
    criteriaValue: { metric: "hidden", threshold: 3 },
    name: "Night Owl Legend",
    subtitle: "The 3:33 AM club",
    rarity: "Legendary",
    iconKey: "Sparkles",
    description: "This badge is intentionally strange and hard to chase, which makes it feel like a hidden story when someone gets it.",
    unlockCondition: "Finish a quiz at exactly 3:33 AM on three different days.",
    trackingSignal: "Requires timestamps on quiz responses or score creation.",
    reward: "Violet-black nebula frame with rare-event prestige.",
    accent: "from-fuchsia-300 via-violet-300 to-amber-200",
    accentSoft: "from-fuchsia-500/20 via-violet-500/10 to-black",
    accentRing: "ring-fuchsia-300/25",
    isHidden: true,
  },
];

export function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function clampPercent(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function rarityGlow(rarity: PrestigeRarity) {
  switch (rarity) {
    case "Bronze":
      return "shadow-[0_0_50px_rgba(249,115,22,0.20)]";
    case "Silver":
      return "shadow-[0_0_50px_rgba(148,163,184,0.18)]";
    case "Gold":
      return "shadow-[0_0_60px_rgba(245,158,11,0.25)]";
    case "Obsidian":
      return "shadow-[0_0_70px_rgba(250,204,21,0.18)]";
    case "Legendary":
      return "shadow-[0_0_70px_rgba(168,85,247,0.30)]";
  }
}

function getThreshold(criteriaValue: Json | undefined, fallback: number) {
  if (!criteriaValue || typeof criteriaValue !== "object" || Array.isArray(criteriaValue)) return fallback;
  const threshold = criteriaValue.threshold;
  return typeof threshold === "number" ? threshold : fallback;
}

function getMetric(criteriaValue: Json | undefined) {
  if (!criteriaValue || typeof criteriaValue !== "object" || Array.isArray(criteriaValue)) return undefined;
  const metric = criteriaValue.metric;
  return typeof metric === "string" ? metric : undefined;
}

function isUnlocked(seed: AchievementSeed, stats: PrestigeStats) {
  if (seed.criteriaType === "prestige:night_owl") return false;

  const metric = getMetric(seed.criteriaValue);
  const threshold = getThreshold(seed.criteriaValue, 1);

  switch (metric) {
    case "quizzes_taken":
      return stats.quizzesTaken >= threshold;
    case "skills_completed":
      return stats.skillsCompleted >= threshold;
    case "streak":
      return stats.streak >= threshold;
    case "strong_topics":
      return stats.strongTopics >= threshold;
    case "average_score":
      return stats.averageScore >= threshold;
    case "leaderboard_rank":
      return stats.currentRank <= threshold;
    case "top_percent": {
      const topTarget = Math.max(1, Math.ceil(stats.totalStudents * (threshold / 100)));
      return stats.currentRank <= topTarget;
    }
    case "hidden":
      return false;
    default:
      return false;
  }
}

function progressValue(seed: AchievementSeed, stats: PrestigeStats) {
  if (seed.criteriaType === "prestige:night_owl") return 0;

  const metric = getMetric(seed.criteriaValue);
  const threshold = getThreshold(seed.criteriaValue, 1);

  switch (metric) {
    case "quizzes_taken":
      return clampPercent((stats.quizzesTaken / threshold) * 100);
    case "skills_completed":
      return clampPercent((stats.skillsCompleted / threshold) * 100);
    case "streak":
      return clampPercent((stats.streak / threshold) * 100);
    case "strong_topics":
      return clampPercent((stats.strongTopics / threshold) * 100);
    case "average_score":
      return clampPercent((stats.averageScore / threshold) * 100);
    case "leaderboard_rank":
      return clampPercent(
        stats.currentRank <= threshold
          ? 100
          : 100 - ((stats.currentRank - threshold) / Math.max(stats.totalStudents - threshold, 1)) * 100,
      );
    case "top_percent": {
      const topTarget = Math.max(1, Math.ceil(stats.totalStudents * (threshold / 100)));
      return clampPercent((topTarget / Math.max(stats.currentRank, topTarget)) * 100);
    }
    case "hidden":
      return 0;
    default:
      return 0;
  }
}

export function getPrestigeAchievementSeeds() {
  return ACHIEVEMENT_SEEDS.slice();
}

export function buildPrestigeBadgeViews(
  stats: PrestigeStats,
  options?: {
    globalCounts?: Map<string, number>;
    earnedAtByCriteriaType?: Map<string, string | null>;
  },
): PrestigeBadgeView[] {
  const globalCounts = options?.globalCounts ?? new Map<string, number>();
  const earnedAtByCriteriaType = options?.earnedAtByCriteriaType ?? new Map<string, string | null>();

  return ACHIEVEMENT_SEEDS.map((seed) => {
    const unlocked = isUnlocked(seed, stats);
    const earnedAt = earnedAtByCriteriaType.get(seed.criteriaType) ?? null;
    const status: PrestigeBadgeStatus = earnedAt || unlocked ? "unlocked" : progressValue(seed, stats) > 0 ? "progress" : "locked";
    return {
      id: seed.criteriaType,
      name: seed.name,
      subtitle: seed.subtitle,
      rarity: seed.rarity,
      status,
      iconKey: seed.iconKey,
      description: seed.description,
      unlockCondition: seed.unlockCondition,
      trackingSignal: seed.trackingSignal,
      reward: seed.reward,
      accent: seed.accent,
      accentSoft: seed.accentSoft,
      accentRing: seed.accentRing,
      progress: progressValue(seed, stats),
      glowClass: rarityGlow(seed.rarity),
      earnedAt,
      globalCount: globalCounts.get(seed.criteriaType) ?? 0,
      isHidden: seed.isHidden,
      criteriaType: seed.criteriaType,
      isNew: false,
    };
  }).sort((a, b) => {
    const order: Record<PrestigeRarity, number> = {
      Bronze: 1,
      Silver: 2,
      Gold: 3,
      Obsidian: 4,
      Legendary: 5,
    };

    if (order[b.rarity] !== order[a.rarity]) return order[b.rarity] - order[a.rarity];
    return a.name.localeCompare(b.name);
  });
}

async function ensureSeededAchievements(adminClient: AdminClient) {
  for (const seed of ACHIEVEMENT_SEEDS) {
    const { data: existing, error: findError } = await adminClient
      .from("achievement")
      .select("id")
      .eq("criteria_type", seed.criteriaType)
      .limit(1)
      .maybeSingle();

    if (findError) throw findError;

    const payload = {
      criteria_type: seed.criteriaType,
      criteria_value: seed.criteriaValue,
      description: seed.description,
      icon: seed.iconKey,
      is_hidden: seed.isHidden,
      name: seed.name,
      rarity: seed.rarity,
    };

    if (existing?.id) {
      const { error } = await adminClient.from("achievement").update(payload).eq("id", existing.id);
      if (error) throw error;
      continue;
    }

    const { error } = await adminClient.from("achievement").insert({
      ...payload,
      global_count: 0,
    });

    if (error) throw error;
  }
}

export async function loadPrestigeBadgeViews({
  adminClient,
  studentId,
  stats,
}: {
  adminClient: AdminClient | null;
  studentId: string;
  stats: PrestigeStats;
}): Promise<PrestigeBadgeView[]> {
  if (!adminClient || !isUuid(studentId)) {
    return buildPrestigeBadgeViews(stats);
  }

  try {
    await ensureSeededAchievements(adminClient);

    const { data: achievements, error: achievementError } = await adminClient
      .from("achievement")
      .select("id, criteria_type")
      .in(
        "criteria_type",
        ACHIEVEMENT_SEEDS.map((seed) => seed.criteriaType),
      );

    if (achievementError) throw achievementError;

    const achievementByCriteriaType = new Map<string, { id: string; criteria_type: string | null }>();
    for (const achievement of (achievements ?? []) as Array<{ id: string; criteria_type: string | null }>) {
      if (achievement.criteria_type) {
        achievementByCriteriaType.set(achievement.criteria_type, achievement);
      }
    }

    const badgeViews = buildPrestigeBadgeViews(stats);
    const unlockedAchievementIds = badgeViews
      .filter((badge) => badge.status === "unlocked")
      .map((badge) => achievementByCriteriaType.get(badge.criteriaType)?.id)
      .filter((value): value is string => Boolean(value));

    let newlyInsertedIds = new Set<string>();

    if (unlockedAchievementIds.length > 0) {
      const { data: existingAwards, error: awardsFetchError } = await adminClient
        .from("student_achievement")
        .select("achievement_id, earned_at")
        .eq("student_id", studentId)
        .in("achievement_id", unlockedAchievementIds);

      if (awardsFetchError) throw awardsFetchError;

      const alreadyOwned = new Set((existingAwards ?? []).map((row) => row.achievement_id));
      const awardsToInsert = unlockedAchievementIds
        .filter((achievementId) => !alreadyOwned.has(achievementId))
        .map((achievementId) => ({
          student_id: studentId,
          achievement_id: achievementId,
        }));

      newlyInsertedIds = new Set(awardsToInsert.map((a) => a.achievement_id));

      if (awardsToInsert.length > 0) {
        const { error: insertError } = await adminClient.from("student_achievement").insert(awardsToInsert);
        if (insertError) throw insertError;
      }
    }

    const { data: currentAwards, error: currentAwardsError } = await adminClient
      .from("student_achievement")
      .select("achievement_id, earned_at")
      .eq("student_id", studentId);

    if (currentAwardsError) throw currentAwardsError;

    const earnedAtByAchievementId = new Map<string, string | null>();
    for (const row of (currentAwards ?? []) as StudentAchievementRow[]) {
      earnedAtByAchievementId.set(row.achievement_id, row.earned_at);
    }

    const { data: awardCounts, error: awardCountsError } = await adminClient
      .from("student_achievement")
      .select("achievement_id");

    if (awardCountsError) throw awardCountsError;

    const countByAchievementId = new Map<string, number>();
    for (const row of (awardCounts ?? []) as Pick<StudentAchievementRow, "achievement_id">[]) {
      countByAchievementId.set(row.achievement_id, (countByAchievementId.get(row.achievement_id) ?? 0) + 1);
    }

    for (const achievement of (achievements ?? []) as Array<{ id: string; criteria_type: string | null }>) {
      const count = countByAchievementId.get(achievement.id) ?? 0;
      const { error } = await adminClient.from("achievement").update({ global_count: count }).eq("id", achievement.id);
      if (error) throw error;
    }

    return badgeViews.map((badge) => {
      const achievement = achievementByCriteriaType.get(badge.criteriaType);
      const earnedAt = achievement ? earnedAtByAchievementId.get(achievement.id) ?? null : badge.earnedAt;
      const globalCount = achievement ? countByAchievementId.get(achievement.id) ?? 0 : badge.globalCount;
      const isNew = achievement ? newlyInsertedIds.has(achievement.id) : false;

      return {
        ...badge,
        status: earnedAt || badge.status === "unlocked" ? "unlocked" : badge.status,
        earnedAt,
        globalCount,
        isNew,
      };
    });
  } catch (error) {
    console.warn("[prestige] falling back to local badge rendering:", error);
    return buildPrestigeBadgeViews(stats);
  }
}
