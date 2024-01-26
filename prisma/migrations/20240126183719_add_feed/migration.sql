/*
  Warnings:

  - You are about to drop the column `objectGuidId` on the `feed` table. All the data in the column will be lost.
  - You are about to alter the column `guid` on the `feed` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- DropIndex
DROP INDEX `Feed_objectGuidId_fkey` ON `feed`;

-- AlterTable
ALTER TABLE `feed` DROP COLUMN `objectGuidId`,
    MODIFY `pubDate` VARCHAR(191) NOT NULL,
    MODIFY `guid` JSON NOT NULL;
