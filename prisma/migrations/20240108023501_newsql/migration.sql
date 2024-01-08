/*
  Warnings:

  - A unique constraint covering the columns `[jobId]` on the table `EstimatedCostWork` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobid]` on the table `summarySheet` will be added. If there are existing duplicate values, this will fail.
  - Made the column `LossNumber` on table `Invoice` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ExpectedPromiseTime` on table `summarySheet` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `EstimatedCostWork` MODIFY `jobId` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Invoice` MODIFY `LossNumber` VARCHAR(191) NOT NULL DEFAULT 'Pending';

-- AlterTable
ALTER TABLE `summarySheet` MODIFY `jobid` INTEGER NULL,
    MODIFY `InvoiceId` VARCHAR(191) NULL DEFAULT 'Pending',
    MODIFY `InvoiceGrandAmount` DOUBLE NULL DEFAULT 0,
    MODIFY `ParkedStatus` VARCHAR(191) NULL DEFAULT 'Pending',
    MODIFY `LossNum` VARCHAR(191) NULL DEFAULT 'Pending',
    MODIFY `ExpectedPromiseTime` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `EstimatedCostWork_jobId_key` ON `EstimatedCostWork`(`jobId`);

-- CreateIndex
CREATE UNIQUE INDEX `summarySheet_jobid_key` ON `summarySheet`(`jobid`);
