/*
  Warnings:

  - You are about to drop the `SocialImage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SocialImage" DROP CONSTRAINT "SocialImage_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "socialImage" TEXT;

-- DropTable
DROP TABLE "SocialImage";
