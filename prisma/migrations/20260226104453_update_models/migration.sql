/*
  Warnings:

  - Changed the type of `crs_type` on the `Course` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `std_level` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "level" AS ENUM ('beginner', 'intermediate', 'advanced', 'master');

-- CreateEnum
CREATE TYPE "crs_type" AS ENUM ('pdf', 'video', 'mindmap', 'docs', 'article');

-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('easy', 'meduim', 'hard', 'pro');

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "crs_type",
ADD COLUMN     "crs_type" "crs_type" NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "std_level" "level" NOT NULL;

-- AlterTable
ALTER TABLE "subDomain" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "subDomain" ADD CONSTRAINT "subDomain_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "subDomain"("subdom_id") ON DELETE SET NULL ON UPDATE CASCADE;
