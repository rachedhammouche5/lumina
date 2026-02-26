-- CreateTable
CREATE TABLE "course" (
    "crs_id" TEXT NOT NULL,
    "crs_title" TEXT NOT NULL,
    "crs_type" TEXT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("crs_id")
);

-- CreateTable
CREATE TABLE "quiz" (
    "qst_id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,

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

-- CreateIndex
CREATE UNIQUE INDEX "course_crs_title_key" ON "course"("crs_title");

-- AddForeignKey
ALTER TABLE "q_response" ADD CONSTRAINT "q_response_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quiz"("qst_id") ON DELETE RESTRICT ON UPDATE CASCADE;
