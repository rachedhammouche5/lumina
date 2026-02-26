/*
  Warnings:

  - You are about to drop the `course` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `courseId` to the `quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quiz" ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "course";

-- CreateTable
CREATE TABLE "Course" (
    "crs_id" TEXT NOT NULL,
    "crs_title" TEXT NOT NULL,
    "crs_type" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("crs_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Course_crs_title_key" ON "Course"("crs_title");

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("crs_id") ON DELETE RESTRICT ON UPDATE CASCADE;
