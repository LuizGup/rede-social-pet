-- CreateTable
CREATE TABLE "Messages" (
    "message_id" SERIAL NOT NULL,
    "message_content" TEXT NOT NULL,
    "message_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fk_sender_id" INTEGER NOT NULL,
    "fk_receiver_id" INTEGER NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("message_id")
);

-- CreateIndex
CREATE INDEX "Messages_fk_sender_id_idx" ON "Messages"("fk_sender_id");

-- CreateIndex
CREATE INDEX "Messages_fk_receiver_id_idx" ON "Messages"("fk_receiver_id");

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk_sender_id_fkey" FOREIGN KEY ("fk_sender_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_fk_receiver_id_fkey" FOREIGN KEY ("fk_receiver_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
