-- CreateEnum
CREATE TYPE "SubscriptionStatus" AS ENUM ('FREE', 'LIFETIME_FREE', 'STANDARD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "subscriptionStatus" "SubscriptionStatus" NOT NULL DEFAULT E'FREE';
