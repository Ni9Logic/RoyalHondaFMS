/*
  Warnings:

  - You are about to drop the column `Mileage` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `NTN` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `carColor` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `carRegistration` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerContact` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dateTime` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `descriptionPrice` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `CarMake` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CarModel` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CarRegNum` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreatedAt` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DepPercent` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `DriverUser` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `EstimateNum` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GSTCost` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GSTPercent` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `GrandTAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InsuranceGSTR` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InsuranceNTN` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InsuranceName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `InvoiceType` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PSTCost` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PSTPercent` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PartsTable` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `PaymentMode` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `SurveyorName` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TAmountDep` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TAmountGST` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TAmountPart` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TLaborAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TLaborAmountPST` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invoice` DROP COLUMN `Mileage`,
    DROP COLUMN `NTN`,
    DROP COLUMN `carColor`,
    DROP COLUMN `carRegistration`,
    DROP COLUMN `customerContact`,
    DROP COLUMN `customerName`,
    DROP COLUMN `dateTime`,
    DROP COLUMN `descriptionPrice`,
    ADD COLUMN `CarMake` VARCHAR(191) NOT NULL,
    ADD COLUMN `CarModel` VARCHAR(191) NOT NULL,
    ADD COLUMN `CarRegNum` VARCHAR(191) NOT NULL,
    ADD COLUMN `CreatedAt` VARCHAR(191) NOT NULL,
    ADD COLUMN `DepPercent` DOUBLE NOT NULL,
    ADD COLUMN `DriverUser` VARCHAR(191) NOT NULL,
    ADD COLUMN `EstimateNum` VARCHAR(191) NOT NULL,
    ADD COLUMN `GSTCost` DOUBLE NOT NULL,
    ADD COLUMN `GSTPercent` DOUBLE NOT NULL,
    ADD COLUMN `GrandTAmount` DOUBLE NOT NULL,
    ADD COLUMN `InsuranceGSTR` VARCHAR(191) NOT NULL,
    ADD COLUMN `InsuranceNTN` VARCHAR(191) NOT NULL,
    ADD COLUMN `InsuranceName` VARCHAR(191) NOT NULL,
    ADD COLUMN `InvoiceType` VARCHAR(191) NOT NULL,
    ADD COLUMN `LossNumber` VARCHAR(191) NULL,
    ADD COLUMN `PSTCost` DOUBLE NOT NULL,
    ADD COLUMN `PSTPercent` DOUBLE NOT NULL,
    ADD COLUMN `PartsTable` JSON NOT NULL,
    ADD COLUMN `PaymentMode` VARCHAR(191) NOT NULL,
    ADD COLUMN `SurveyorName` VARCHAR(191) NOT NULL,
    ADD COLUMN `TAmountDep` DOUBLE NOT NULL,
    ADD COLUMN `TAmountGST` DOUBLE NOT NULL,
    ADD COLUMN `TAmountPart` DOUBLE NOT NULL,
    ADD COLUMN `TLaborAmount` DOUBLE NOT NULL,
    ADD COLUMN `TLaborAmountPST` DOUBLE NOT NULL;
