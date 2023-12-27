/*
  Warnings:

  - You are about to drop the column `createdAt` on the `EstimatedCostWork` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` DROP COLUMN `createdAt`,
    ADD COLUMN `CreatedAt` VARCHAR(191) NULL,
    ADD COLUMN `TotalEstimateFee` DOUBLE NULL,
    ADD COLUMN `TotalServiceFee` DOUBLE NULL;
