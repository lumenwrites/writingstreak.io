/*
  Warnings:

  - You are about to drop the column `targetWordCount` on the `Day` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Day" DROP COLUMN "targetWordCount",
ADD COLUMN     "targetWordcount" INTEGER NOT NULL DEFAULT 250;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpires" SET DEFAULT NOW() + interval '1 month',
ALTER COLUMN "endDate" SET DEFAULT NOW() + interval '1 month';
