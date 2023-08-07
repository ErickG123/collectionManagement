-- CreateTable
CREATE TABLE `funkos` (
    `id` VARCHAR(191) NOT NULL,
    `collectionId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `averageValue` DECIMAL(10, 2) NULL,
    `releaseYear` INTEGER NULL,
    `iOwn` BOOLEAN NOT NULL DEFAULT true,
    `isFavorite` BOOLEAN NOT NULL DEFAULT false,
    `number` INTEGER NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `set` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `funkos` ADD CONSTRAINT `funkos_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `collections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
