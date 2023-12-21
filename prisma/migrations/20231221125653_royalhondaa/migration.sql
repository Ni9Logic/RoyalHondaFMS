/*
  Warnings:

  - You are about to drop the `priceSheet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `priceSheet`;

-- CreateTable
CREATE TABLE `PriceSheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partNo` VARCHAR(191) NULL,
    `partPrice` VARCHAR(191) NULL,
    `partDescription` VARCHAR(191) NULL,
    `partModel` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
