-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "socialDescription" TEXT,
ADD COLUMN     "socialTitle" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionExpires" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 month';
