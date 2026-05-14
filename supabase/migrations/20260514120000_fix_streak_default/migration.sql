-- Fix std_last_activeDate default so new students don't start with today's date.
-- The old DEFAULT CURRENT_TIMESTAMP caused updateStreak to think the student
-- was already active today, making the first streak update always return early (0→0).
ALTER TABLE "Student"
  ALTER COLUMN "std_last_activeDate" SET DEFAULT '1970-01-01 00:00:00';

-- Reset any student whose streak is still 0 — their active date was set by the
-- old default and they have never had real activity recorded.
UPDATE "Student"
  SET "std_last_activeDate" = '1970-01-01 00:00:00'
  WHERE "std_streak" = 0;
