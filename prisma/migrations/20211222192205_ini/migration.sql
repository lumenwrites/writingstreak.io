-- AlterTable
ALTER TABLE "User" ALTER COLUMN "stripeCustomerId" DROP NOT NULL,
ALTER COLUMN "stripeCustomerId" DROP DEFAULT,
ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL,
ALTER COLUMN "stripeSubscriptionId" DROP DEFAULT;
