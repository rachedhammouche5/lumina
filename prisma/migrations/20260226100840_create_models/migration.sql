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
