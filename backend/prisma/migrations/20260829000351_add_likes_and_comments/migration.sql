-- CreateTable
CREATE TABLE "Likes" (
    "like_id" SERIAL NOT NULL,
    "like_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_post_id" INTEGER NOT NULL,
    "fk_user_id" INTEGER NOT NULL,

    CONSTRAINT "Likes_pkey" PRIMARY KEY ("like_id")
);

-- CreateTable
CREATE TABLE "Comments" (
    "comment_id" SERIAL NOT NULL,
    "comment_content" TEXT NOT NULL,
    "comment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_post_id" INTEGER NOT NULL,
    "fk_user_id" INTEGER NOT NULL,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("comment_id")
);

-- CreateIndex
CREATE INDEX "Likes_fk_post_id_idx" ON "Likes"("fk_post_id");

-- CreateIndex
CREATE INDEX "Likes_fk_user_id_idx" ON "Likes"("fk_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Likes_fk_user_id_fk_post_id_key" ON "Likes"("fk_user_id", "fk_post_id");

-- CreateIndex
CREATE INDEX "Comments_fk_post_id_idx" ON "Comments"("fk_post_id");

-- CreateIndex
CREATE INDEX "Comments_fk_user_id_idx" ON "Comments"("fk_user_id");

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_fk_post_id_fkey" FOREIGN KEY ("fk_post_id") REFERENCES "Posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk_post_id_fkey" FOREIGN KEY ("fk_post_id") REFERENCES "Posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
