/*
  Warnings:

  - You are about to drop the column `jobId` on the `EstimatedCostWork` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `EstimatedCostWork` table. All the data in the column will be lost.
  - You are about to drop the column `work` on the `EstimatedCostWork` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `EstimatedCostWork` DROP FOREIGN KEY `EstimatedCostWork_jobId_fkey`;

-- AlterTable
ALTER TABLE `EstimatedCostWork` DROP COLUMN `jobId`,
    DROP COLUMN `price`,
    DROP COLUMN `work`,
    ADD COLUMN `requiredWorkDetails` JSON NULL;
