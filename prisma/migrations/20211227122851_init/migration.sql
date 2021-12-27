-- AlterTable
ALTER TABLE "User" ALTER COLUMN "subscriptionExpires" SET DEFAULT NOW() + interval '1 month',
ALTER COLUMN "endDate" SET DEFAULT NOW() + interval '1 month';
