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

-- CreateIndex
CREATE UNIQUE INDEX "Teacher_tchr_email_key" ON "Teacher"("tchr_email");
