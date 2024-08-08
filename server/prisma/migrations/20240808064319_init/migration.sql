-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "originalResource" TEXT NOT NULL,
    "shortResource" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resource_shortResource_key" ON "Resource"("shortResource");
