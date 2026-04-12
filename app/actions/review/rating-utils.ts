import type { CommentItem } from "./types";

export const STAR_LEVELS = [5, 4, 3, 2, 1] as const;

export const totalRating = (comments: Array<{ rating: number }>) => {
  if (comments.length === 0) return 0;
  const total = comments.reduce((sum, comment) => sum + comment.rating, 0);
  const average = total / comments.length;
  return Math.round(average * 2) / 2;
};

export const getRatingCounts = (comments: CommentItem[]) => {
  return STAR_LEVELS.reduce<Record<number, number>>((acc, level) => {
    acc[level] = comments.filter((comment) => comment.rating === level).length;
    return acc;
  }, {} as Record<number, number>);
};

