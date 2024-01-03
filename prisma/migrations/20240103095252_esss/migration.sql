/*
  Warnings:

  - A unique constraint covering the columns `[GSTR]` on the table `InsuranceCompanies` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `InsuranceCompanies` ADD COLUMN `GSTR` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `InsuranceCompanies_GSTR_key` ON `InsuranceCompanies`(`GSTR`);
