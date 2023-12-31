/*
  Warnings:

  - You are about to alter the column `isRoyal` on the `EstimatedCostWork` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` MODIFY `isRoyal` VARCHAR(191) NULL;
