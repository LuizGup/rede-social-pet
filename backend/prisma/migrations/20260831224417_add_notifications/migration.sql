-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('LIKE', 'COMMENT', 'FOLLOW');

-- CreateTable
CREATE TABLE "Notifications" (
    "notification_id" SERIAL NOT NULL,
    "notification_type" "NotificationType" NOT NULL,
    "notification_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_recipient_id" INTEGER NOT NULL,
    "fk_actor_id" INTEGER NOT NULL,
    "fk_post_id" INTEGER,

    CONSTRAINT "Notifications_pkey" PRIMARY KEY ("notification_id")
);

-- CreateIndex
CREATE INDEX "Notifications_fk_recipient_id_idx" ON "Notifications"("fk_recipient_id");

-- CreateIndex
CREATE INDEX "Notifications_fk_actor_id_idx" ON "Notifications"("fk_actor_id");

-- CreateIndex
CREATE INDEX "Notifications_fk_post_id_idx" ON "Notifications"("fk_post_id");

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_fk_recipient_id_fkey" FOREIGN KEY ("fk_recipient_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_fk_actor_id_fkey" FOREIGN KEY ("fk_actor_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notifications" ADD CONSTRAINT "Notifications_fk_post_id_fkey" FOREIGN KEY ("fk_post_id") REFERENCES "Posts"("post_id") ON DELETE CASCADE ON UPDATE CASCADE;
