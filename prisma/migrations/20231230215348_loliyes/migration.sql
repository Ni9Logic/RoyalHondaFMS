/*
  Warnings:

  - A unique constraint covering the columns `[cNtn]` on the table `Surveyors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` ADD COLUMN `cDriverUser` VARCHAR(191) NULL,
    ADD COLUMN `cNtn` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Surveyors` ADD COLUMN `cNtn` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Surveyors_cNtn_key` ON `Surveyors`(`cNtn`);
