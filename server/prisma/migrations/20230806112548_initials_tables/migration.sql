-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `githubId` INTEGER NULL,
    `googleId` INTEGER NULL,
    `name` VARCHAR(191) NOT NULL,
    `login` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `avatarUrl` VARCHAR(191) NULL,

    UNIQUE INDEX `users_githubId_key`(`githubId`),
    UNIQUE INDEX `users_googleId_key`(`googleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collections` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `coverUrl` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `collection_items` (
    `id` VARCHAR(191) NOT NULL,
    `collectionId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `averageValue` DECIMAL(10, 2) NOT NULL,
    `releaseYear` INTEGER NOT NULL,
    `iOwn` BOOLEAN NOT NULL DEFAULT true,
    `isFavorite` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `collections` ADD CONSTRAINT `collections_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection_items` ADD CONSTRAINT `collection_items_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `collections`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
