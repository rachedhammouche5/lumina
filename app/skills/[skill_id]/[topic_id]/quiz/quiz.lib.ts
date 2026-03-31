import type { Difficulty, QuizWithResponses, AnswerRecord, QuestionPool } from "./quiz.types";

// ─── Constants ────────────────────────────────────────────────────────────────

export const DIFFICULTY_ORDER: Difficulty[] = ["easy", "medium", "hard", "pro"];
export const TIME_LIMIT = 15;
export const SESSION_LENGTH = 10;

export const DIFFICULTY_POINTS: Record<Difficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
  pro: 4,
};

export const DIFFICULTY_STYLE: Record<Difficulty, string> = {
  easy: "text-emerald-400 border-emerald-400/30 bg-emerald-500/10",
  medium: "text-amber-400 border-amber-400/30 bg-amber-500/10",
  hard: "text-orange-400 border-orange-400/30 bg-orange-500/10",
  pro: "text-rose-400 border-rose-400/30 bg-rose-500/10",
};

// ─── Pool helpers ─────────────────────────────────────────────────────────────

export function buildPool(questions: QuizWithResponses[]): QuestionPool {
  return {
    easy: questions.filter((q) => q.difficulty === "easy"),
    medium: questions.filter((q) => q.difficulty === "medium"),
    hard: questions.filter((q) => q.difficulty === "hard"),
    pro: questions.filter((q) => q.difficulty === "pro"),
  };
}

export function removeFromPool(q: QuizWithResponses, pool: QuestionPool): QuestionPool {
  return {
    ...pool,
    [q.difficulty]: pool[q.difficulty].filter((x) => x.qst_id !== q.qst_id),
  };
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function pickQuestion(
  difficulty: Difficulty,
  pool: QuestionPool
): QuizWithResponses | null {
  if (pool[difficulty].length > 0) return pickRandom(pool[difficulty]);

  // Fallback: walk outward from target difficulty
  const idx = DIFFICULTY_ORDER.indexOf(difficulty);
  for (let delta = 1; delta < DIFFICULTY_ORDER.length; delta++) {
    const lower = idx - delta;
    const upper = idx + delta;
    if (lower >= 0 && pool[DIFFICULTY_ORDER[lower]].length > 0)
      return pickRandom(pool[DIFFICULTY_ORDER[lower]]);
    if (upper < DIFFICULTY_ORDER.length && pool[DIFFICULTY_ORDER[upper]].length > 0)
      return pickRandom(pool[DIFFICULTY_ORDER[upper]]);
  }

  return null; // pool fully exhausted
}

// ─── Adaptive difficulty ──────────────────────────────────────────────────────

/**
 * Determine the next question difficulty based on the current answer outcome.
 *
 * - Correct + fast (≤15s) + no hint → harder
 * - Correct + (slow OR hint used)   → same difficulty
 * - Wrong                           → easier
 *
 * Falls back to nearest available difficulty if pool is empty at target.
 */
export function nextDifficulty(
  current: Difficulty,
  correct: boolean,
  fast: boolean,
  hintUsed: boolean,
  pool: QuestionPool
): Difficulty {
  const idx = DIFFICULTY_ORDER.indexOf(current);

  let targetIdx: number;
  if (!correct) {
    targetIdx = Math.max(0, idx - 1);
  } else if (fast && !hintUsed) {
    targetIdx = Math.min(DIFFICULTY_ORDER.length - 1, idx + 1);
  } else {
    targetIdx = idx;
  }

  // Walk outward to find an available difficulty
  for (let delta = 0; delta < DIFFICULTY_ORDER.length; delta++) {
    const lower = targetIdx - delta;
    const upper = targetIdx + delta;
    if (lower >= 0 && pool[DIFFICULTY_ORDER[lower]].length > 0)
      return DIFFICULTY_ORDER[lower];
    if (upper < DIFFICULTY_ORDER.length && pool[DIFFICULTY_ORDER[upper]].length > 0)
      return DIFFICULTY_ORDER[upper];
  }

  return current; // fallback — pool exhausted
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

export function calcPoints(
  q: QuizWithResponses,
  correct: boolean,
  fast: boolean,
  hintUsed: boolean
): number {
  if (!correct) return 0;
  return DIFFICULTY_POINTS[q.difficulty] + (fast ? 1 : 0) + (hintUsed ? 0 : 1);
}

export function maxPossiblePoints(questions: QuizWithResponses[]): number {
  return questions.reduce((s, q) => s + DIFFICULTY_POINTS[q.difficulty] + 2, 0);
}

// ─── Formatting ───────────────────────────────────────────────────────────────

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return m > 0 ? `${m}m ${seconds % 60}s` : `${seconds}s`;
}

// ─── Derived session stats ────────────────────────────────────────────────────

export function calcSessionStats(answers: AnswerRecord[]) {
  const totalPoints = answers.reduce((s, a) => s + a.pointsEarned, 0);
  const totalTime = answers.reduce((s, a) => s + a.timeTaken, 0);
  const correctAnswers = answers.filter((a) => a.chosen?.isCorrect);
  const wrongAnswers = answers.filter((a) => !a.chosen?.isCorrect);
  const hintsUsed = answers.filter((a) => a.hintUsed).length;
  const accuracy =
    answers.length > 0 ? Math.round((correctAnswers.length / answers.length) * 100) : 0;
  const avgTime =
    answers.length > 0 ? Math.round(totalTime / answers.length) : 0;

  return { totalPoints, totalTime, correctAnswers, wrongAnswers, hintsUsed, accuracy, avgTime };
}