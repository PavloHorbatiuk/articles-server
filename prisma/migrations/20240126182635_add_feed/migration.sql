-- CreateTable
CREATE TABLE `Feed` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `pubDate` DATETIME(3) NOT NULL,
    `objectGuidId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Guid` (
    `guidId` INTEGER NOT NULL AUTO_INCREMENT,
    `link` VARCHAR(191) NOT NULL,
    `isPermaLink` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`guidId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Feed` ADD CONSTRAINT `Feed_objectGuidId_fkey` FOREIGN KEY (`objectGuidId`) REFERENCES `Guid`(`guidId`) ON DELETE RESTRICT ON UPDATE CASCADE;
