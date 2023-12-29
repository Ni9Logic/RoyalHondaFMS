/*
  Warnings:

  - You are about to drop the column `name` on the `Surveyors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` ADD COLUMN `cSurveyor` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Surveyors` DROP COLUMN `name`,
    ADD COLUMN `cSurveyor` VARCHAR(191) NULL;
