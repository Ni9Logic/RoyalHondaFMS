/*
  Warnings:

  - A unique constraint covering the columns `[cSurveyor]` on the table `Surveyors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `JobCard` ADD COLUMN `Make` VARCHAR(191) NULL,
    ADD COLUMN `Model` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Surveyors_cSurveyor_key` ON `Surveyors`(`cSurveyor`);
