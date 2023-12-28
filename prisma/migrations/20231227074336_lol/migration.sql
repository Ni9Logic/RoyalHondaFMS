/*
  Warnings:

  - You are about to alter the column `cKiloMeters` on the `EstimatedCostWork` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Double`.
  - You are about to alter the column `jobId` on the `EstimatedCostWork` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` MODIFY `cKiloMeters` DOUBLE NULL,
    MODIFY `jobId` INTEGER NULL;
