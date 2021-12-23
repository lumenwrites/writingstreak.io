/*
  Warnings:

  - You are about to drop the column `socialDescription` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "socialDescription",
ADD COLUMN     "customDescription" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpires" SET DEFAULT NOW() + interval '1 month';
