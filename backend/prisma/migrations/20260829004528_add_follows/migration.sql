-- CreateTable
CREATE TABLE "Follows" (
    "follow_id" SERIAL NOT NULL,
    "follow_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_follower_id" INTEGER NOT NULL,
    "fk_followed_id" INTEGER NOT NULL,

    CONSTRAINT "Follows_pkey" PRIMARY KEY ("follow_id")
);

-- CreateIndex
CREATE INDEX "Follows_fk_follower_id_idx" ON "Follows"("fk_follower_id");

-- CreateIndex
CREATE INDEX "Follows_fk_followed_id_idx" ON "Follows"("fk_followed_id");

-- CreateIndex
CREATE UNIQUE INDEX "Follows_fk_follower_id_fk_followed_id_key" ON "Follows"("fk_follower_id", "fk_followed_id");

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_fk_follower_id_fkey" FOREIGN KEY ("fk_follower_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follows" ADD CONSTRAINT "Follows_fk_followed_id_fkey" FOREIGN KEY ("fk_followed_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
