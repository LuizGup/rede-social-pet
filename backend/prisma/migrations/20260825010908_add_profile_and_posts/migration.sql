-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "user_bio" TEXT,
ADD COLUMN     "user_contact" TEXT,
ADD COLUMN     "user_photo" TEXT DEFAULT '/images/DEFAULTIMAGE.png';

-- CreateTable
CREATE TABLE "Posts" (
    "post_id" SERIAL NOT NULL,
    "post_content" TEXT NOT NULL,
    "post_media" TEXT,
    "post_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_author_id" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("post_id")
);

-- CreateIndex
CREATE INDEX "Posts_fk_author_id_idx" ON "Posts"("fk_author_id");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_fk_author_id_fkey" FOREIGN KEY ("fk_author_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
