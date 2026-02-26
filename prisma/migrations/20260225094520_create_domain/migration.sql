-- CreateTable
CREATE TABLE "Domain" (
    "dmn_id" TEXT NOT NULL,
    "dmn_title" TEXT NOT NULL,
    "dmn_dscrptn" TEXT NOT NULL,
    "dmn_duration" INTEGER NOT NULL,

    CONSTRAINT "Domain_pkey" PRIMARY KEY ("dmn_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_dmn_title_key" ON "Domain"("dmn_title");
