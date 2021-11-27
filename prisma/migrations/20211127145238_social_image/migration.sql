-- CreateTable
CREATE TABLE "SocialImage" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "SocialImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SocialImage_postId_key" ON "SocialImage"("postId");

-- AddForeignKey
ALTER TABLE "SocialImage" ADD CONSTRAINT "SocialImage_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
