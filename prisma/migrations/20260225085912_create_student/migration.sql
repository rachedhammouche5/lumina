-- CreateTable
CREATE TABLE "Student" (
    "std_id" TEXT NOT NULL,
    "std_name" TEXT NOT NULL,
    "std_lastname" TEXT NOT NULL,
    "std_email" TEXT NOT NULL,
    "std_pfp" TEXT,
    "std_password" TEXT NOT NULL,
    "std_streak" INTEGER NOT NULL,
    "std_last_activeDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("std_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_std_email_key" ON "Student"("std_email");
