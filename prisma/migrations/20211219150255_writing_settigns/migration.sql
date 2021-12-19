-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sprintDuration" INTEGER NOT NULL DEFAULT 20,
ADD COLUMN     "sprintPace" TEXT NOT NULL DEFAULT E'Medium',
ADD COLUMN     "targetWordcount" INTEGER NOT NULL DEFAULT 250,
ADD COLUMN     "writingDays" TEXT[];
