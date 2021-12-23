/*
  Warnings:

  - You are about to drop the column `customDescription` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "customDescription",
ADD COLUMN     "socialDescription" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpires" SET DEFAULT NOW() + interval '1 month';
