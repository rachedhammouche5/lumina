/*
  Warnings:

  - The values [meduim] on the enum `difficulty` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `difficulty` on the `quiz` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "difficulty_new" AS ENUM ('easy', 'medium', 'hard', 'pro');
ALTER TABLE "quiz" ALTER COLUMN "difficulty" TYPE "difficulty_new" USING ("difficulty"::text::"difficulty_new");
ALTER TYPE "difficulty" RENAME TO "difficulty_old";
ALTER TYPE "difficulty_new" RENAME TO "difficulty";
DROP TYPE "public"."difficulty_old";
COMMIT;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "std_level" SET DEFAULT 'beginner';

-- AlterTable
ALTER TABLE "quiz" DROP COLUMN "difficulty",
ADD COLUMN     "difficulty" "difficulty" NOT NULL;
