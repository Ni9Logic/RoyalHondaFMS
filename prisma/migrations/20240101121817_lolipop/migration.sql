/*
  Warnings:

  - You are about to drop the column `cNtn` on the `EstimatedCostWork` table. All the data in the column will be lost.
  - You are about to drop the column `cNtn` on the `Surveyors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cSurveyorNTN]` on the table `Surveyors` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Surveyors_cNtn_key` ON `Surveyors`;

-- AlterTable
ALTER TABLE `EstimatedCostWork` DROP COLUMN `cNtn`,
    ADD COLUMN `cSurveyorNTN` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Surveyors` DROP COLUMN `cNtn`,
    ADD COLUMN `cSurveyorNTN` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Surveyors_cSurveyorNTN_key` ON `Surveyors`(`cSurveyorNTN`);
