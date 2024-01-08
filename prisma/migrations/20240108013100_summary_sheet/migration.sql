/*
  Warnings:

  - Made the column `CreatedAt` on table `EstimatedCostWork` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` MODIFY `CreatedAt` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `summarySheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobid` INTEGER NOT NULL,
    `InvoiceId` INTEGER NULL,
    `InvoiceGrandAmount` DOUBLE NULL,
    `CarRegNum` VARCHAR(191) NOT NULL,
    `CarMake` VARCHAR(191) NOT NULL,
    `CarModel` VARCHAR(191) NOT NULL,
    `UserDriver` VARCHAR(191) NOT NULL,
    `ParkedStatus` VARCHAR(191) NOT NULL,
    `LossNum` VARCHAR(191) NULL,
    `ExpectedPromiseTime` VARCHAR(191) NULL,
    `CreatedAt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
