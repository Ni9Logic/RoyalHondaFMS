/*
  Warnings:

  - You are about to drop the column `cSurveyorNTN` on the `Surveyors` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[NTN]` on the table `InsuranceCompanies` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Surveyors_cSurveyorNTN_key` ON `Surveyors`;

-- AlterTable
ALTER TABLE `InsuranceCompanies` ADD COLUMN `NTN` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `JobCard` ADD COLUMN `NTN` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Surveyors` DROP COLUMN `cSurveyorNTN`;

-- CreateIndex
CREATE UNIQUE INDEX `InsuranceCompanies_NTN_key` ON `InsuranceCompanies`(`NTN`);
