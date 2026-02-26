-- CreateTable
CREATE TABLE "subDomain" (
    "subdom_id" TEXT NOT NULL,
    "subdom_title" TEXT NOT NULL,

    CONSTRAINT "subDomain_pkey" PRIMARY KEY ("subdom_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subDomain_subdom_title_key" ON "subDomain"("subdom_title");
