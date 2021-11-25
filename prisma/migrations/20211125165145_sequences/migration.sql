/*
  Warnings:

  - You are about to drop the column `seriesId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the `Series` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_seriesId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "seriesId",
ADD COLUMN     "sequenceId" TEXT;

-- DropTable
DROP TABLE "Series";

-- CreateTable
CREATE TABLE "Sequence" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Sequence_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sequence_slug_key" ON "Sequence"("slug");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_sequenceId_fkey" FOREIGN KEY ("sequenceId") REFERENCES "Sequence"("id") ON DELETE SET NULL ON UPDATE CASCADE;
