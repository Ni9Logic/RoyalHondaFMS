/*
  Warnings:

  - You are about to drop the column `CashWorks` on the `JobCard` table. All the data in the column will be lost.
  - You are about to drop the column `RegistrationNumber` on the `JobCard` table. All the data in the column will be lost.
  - You are about to drop the column `WorkOrder` on the `JobCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` ADD COLUMN `carRegistration` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `JobCard` DROP COLUMN `CashWorks`,
    DROP COLUMN `RegistrationNumber`,
    DROP COLUMN `WorkOrder`,
    ADD COLUMN `carRegistration` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Invoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerName` VARCHAR(191) NULL,
    `customerContact` VARCHAR(191) NULL,
    `NTN` VARCHAR(191) NULL,
    `carColor` VARCHAR(191) NULL,
    `carRegistration` VARCHAR(191) NULL,
    `Mileage` VARCHAR(191) NULL,
    `dateTime` VARCHAR(191) NULL,
    `descriptionPrice` JSON NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
