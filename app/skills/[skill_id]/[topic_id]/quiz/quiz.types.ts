import type { Quiz, QResponse, Difficulty } from "@/lib/database.types";

// A question as it comes from the DB, with its responses joined
export type QuizWithResponses = Quiz & {
  responses: QResponse[];
};

// What we record per answered question
export type AnswerRecord = {
  question: QuizWithResponses;
  chosen: QResponse | null;
  timeTaken: number;
  hintUsed: boolean;
  pointsEarned: number;
};

// Pool of available questions grouped by difficulty
export type QuestionPool = Record<Difficulty, QuizWithResponses[]>;

export type QuizPhase = "intro" | "question" | "feedback" | "results";

// Re-export for convenience so components only need one import
export type { Difficulty, QResponse };