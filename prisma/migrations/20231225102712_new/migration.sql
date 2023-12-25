/*
  Warnings:

  - You are about to drop the column `cContact` on the `EstimatedCostWork` table. All the data in the column will be lost.
  - You are about to drop the column `carRegistration` on the `EstimatedCostWork` table. All the data in the column will be lost.
  - You are about to drop the column `requiredWorkDetails` on the `EstimatedCostWork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` DROP COLUMN `cContact`,
    DROP COLUMN `carRegistration`,
    DROP COLUMN `requiredWorkDetails`,
    ADD COLUMN `PaymentMode` VARCHAR(191) NULL,
    ADD COLUMN `TableData` JSON NULL,
    ADD COLUMN `cKiloMeters` VARCHAR(191) NULL,
    ADD COLUMN `cMake` VARCHAR(191) NULL,
    ADD COLUMN `cModel` VARCHAR(191) NULL,
    ADD COLUMN `cRegistration` VARCHAR(191) NULL,
    ADD COLUMN `jobId` INTEGER NULL;

-- AlterTable
ALTER TABLE `JobCard` ADD COLUMN `EstimateNumber` INTEGER NULL,
    ADD COLUMN `isEstimate` BOOLEAN NULL;
