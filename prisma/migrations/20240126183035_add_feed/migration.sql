/*
  Warnings:

  - You are about to drop the `guid` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `guid` to the `Feed` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `feed` DROP FOREIGN KEY `Feed_objectGuidId_fkey`;

-- AlterTable
ALTER TABLE `feed` ADD COLUMN `guid` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `guid`;
