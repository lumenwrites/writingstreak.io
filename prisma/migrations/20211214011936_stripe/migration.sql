/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "stripeCustomerId",
ADD COLUMN     "stripe_current_period_end" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "stripe_customer_id" TEXT NOT NULL DEFAULT E'',
ADD COLUMN     "stripe_subscription_id" TEXT NOT NULL DEFAULT E'';
