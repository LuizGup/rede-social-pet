/*
  Warnings:

  - You are about to drop the `Adoptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Animals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Adoptions" DROP CONSTRAINT "Adoptions_fk_admin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Adoptions" DROP CONSTRAINT "Adoptions_fk_adopting_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Adoptions" DROP CONSTRAINT "Adoptions_fk_animal_id_fkey";

-- DropForeignKey
ALTER TABLE "Animals" DROP CONSTRAINT "Animals_fk_admin_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_fk_animal_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_fk_user_id_fkey";

-- DropTable
DROP TABLE "Adoptions";

-- DropTable
DROP TABLE "Animals";

-- DropTable
DROP TABLE "Favorites";

-- DropEnum
DROP TYPE "AdoptionStatus";

-- DropEnum
DROP TYPE "AnimalSex";

-- DropEnum
DROP TYPE "AnimalStatus";

-- DropEnum
DROP TYPE "AnimalsCategories";
