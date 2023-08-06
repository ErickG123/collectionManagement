-- AlterTable
ALTER TABLE `collection_items` MODIFY `averageValue` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `releaseYear` INTEGER NULL DEFAULT 0;
