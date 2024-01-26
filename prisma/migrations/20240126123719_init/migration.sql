/*
  Warnings:

  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_authorId_fkey`;

-- DropTable
DROP TABLE `event`;
