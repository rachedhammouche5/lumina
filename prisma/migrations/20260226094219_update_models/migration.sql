/*
  Warnings:

  - Added the required column `subdom` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domainId` to the `subDomain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "subdom" TEXT NOT NULL,
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "subDomain" ADD COLUMN     "domainId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "subDomain" ADD CONSTRAINT "subDomain_domainId_fkey" FOREIGN KEY ("domainId") REFERENCES "Domain"("dmn_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_subdom_fkey" FOREIGN KEY ("subdom") REFERENCES "subDomain"("subdom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "Teacher"("tchr_id") ON DELETE RESTRICT ON UPDATE CASCADE;
