/*
  Warnings:

  - You are about to drop the column `TableData` on the `EstimatedCostWork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` DROP COLUMN `TableData`,
    ADD COLUMN `DiscountEstimate` DOUBLE NULL,
    ADD COLUMN `DiscountServices` DOUBLE NULL,
    ADD COLUMN `EstimateTableData` JSON NULL,
    ADD COLUMN `OverAllAmount` DOUBLE NULL,
    ADD COLUMN `ServicesTableData` JSON NULL,
    ADD COLUMN `createdAt` VARCHAR(191) NULL,
    MODIFY `jobId` VARCHAR(191) NULL;
