/*
  Warnings:

  - Made the column `collectionId` on table `collection_items` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `collections` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `collection_items` DROP FOREIGN KEY `collection_items_collectionId_fkey`;

-- DropForeignKey
ALTER TABLE `collections` DROP FOREIGN KEY `collections_userId_fkey`;

-- AlterTable
ALTER TABLE `collection_items` MODIFY `collectionId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `collections` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `collections` ADD CONSTRAINT `collections_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `collection_items` ADD CONSTRAINT `collection_items_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `collections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
