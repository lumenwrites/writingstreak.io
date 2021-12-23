-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpires" SET DEFAULT NOW() + interval '1 month';
