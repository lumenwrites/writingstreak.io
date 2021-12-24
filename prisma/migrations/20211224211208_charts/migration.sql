-- AlterTable
ALTER TABLE "User" ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL DEFAULT NOW() + interval '1 month',
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "writingGoal" INTEGER NOT NULL DEFAULT 5000,
ALTER COLUMN "subscriptionExpires" SET DEFAULT NOW() + interval '1 month';
