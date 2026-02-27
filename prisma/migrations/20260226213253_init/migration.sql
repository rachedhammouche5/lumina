-- CreateEnum
CREATE TYPE "level" AS ENUM ('beginner', 'intermediate', 'advanced', 'master');

-- CreateEnum
CREATE TYPE "crs_type" AS ENUM ('pdf', 'video', 'mindmap', 'docs', 'article');

-- CreateEnum
CREATE TYPE "difficulty" AS ENUM ('easy', 'medium', 'hard', 'pro');

-- CreateTable
CREATE TABLE "Student" (
    "std_id" TEXT NOT NULL,
    "std_name" TEXT NOT NULL,
    "std_lastname" TEXT NOT NULL,
    "std_email" TEXT NOT NULL,
    "std_pfp" TEXT,
    "std_password" TEXT NOT NULL,
    "std_streak" INTEGER NOT NULL DEFAULT 0,
    "std_last_activeDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "std_level" "level" NOT NULL DEFAULT 'beginner',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("std_id")
);

-- CreateTable
CREATE TABLE "Teacher" (
    "tchr_id" TEXT NOT NULL,
    "tchr_name" TEXT NOT NULL,
    "tchr_lastname" TEXT NOT NULL,
    "tchr_email" TEXT NOT NULL,
    "tchr_pfp" TEXT,
    "tchr_password" TEXT NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("tchr_id")
);

-- CreateTable
CREATE TABLE "Domain" (
    "dmn_id" TEXT NOT NULL,
    "dmn_title" TEXT NOT NULL,
    "dmn_dscrptn" TEXT NOT NULL,
    "dmn_duration" INTEGER NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("dmn_id")
);

-- CreateTable
CREATE TABLE "subDomain" (
    "subdom_id" TEXT NOT NULL,
    "subdom_title" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "parentId" TEXT,

    CONSTRAINT "subDomain_pkey" PRIMARY KEY ("subdom_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "crs_id" TEXT NOT NULL,
    "crs_title" TEXT NOT NULL,
    "crs_type" "crs_type" NOT NULL,
    "subdom" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("crs_id")
);

-- CreateTable
CREATE TABLE "quiz" (
    "qst_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "difficulty" "difficulty" NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("qst_id")
);

-- CreateTable
CREATE TABLE "q_response" (
    "rspns_id" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "quizId" TEXT NOT NULL,

    CONSTRAINT "q_response_pkey" PRIMARY KEY ("rspns_id")
);

-- CreateTable
CREATE TABLE "enroll" (
    "studentId" TEXT NOT NULL,
    "domainId" TEXT NOT NULL,
    "progress" INTEGER NOT NULL,

    CONSTRAINT "enroll_pkey" PRIMARY KEY ("studentId","domainId")
);

-- CreateTable
CREATE TABLE "score" (
    "studentId" TEXT NOT NULL,
    "subdom" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "time_taken" INTEGER NOT NULL,

    CONSTRAINT "score_pkey" PRIMARY KEY ("studentId","subdom")
);

-- CreateTable
CREATE TABLE "review" (
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("studentId","courseId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_std_email_key" ON "Student"("std_email");

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_tchr_email_key" ON "Teacher"("tchr_email");

-- CreateIndex
CREATE UNIQUE INDEX "Domain_dmn_title_key" ON "Domain"("dmn_title");

-- CreateIndex
CREATE UNIQUE INDEX "subDomain_subdom_title_key" ON "subDomain"("subdom_title");

-- CreateIndex
CREATE UNIQUE INDEX "Course_crs_title_key" ON "Course"("crs_title");

-- AddForeignKey
ALTER TABLE "subDomain" ADD CONSTRAINT "subDomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("dmn_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subDomain" ADD CONSTRAINT "subDomain_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "subDomain"("subdom_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subdom_fkey" FOREIGN KEY ("subdom") REFERENCES "subDomain"("subdom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("tchr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("crs_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "q_response" ADD CONSTRAINT "q_response_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("qst_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enroll" ADD CONSTRAINT "enroll_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("std_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enroll" ADD CONSTRAINT "enroll_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("dmn_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("std_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "score" ADD CONSTRAINT "score_subdom_fkey" FOREIGN KEY ("subdom") REFERENCES "subDomain"("subdom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("std_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("crs_id") ON DELETE RESTRICT ON UPDATE CASCADE;
