/*
  Warnings:

  - You are about to drop the column `In` on the `JobCard` table. All the data in the column will be lost.
  - You are about to drop the column `Out` on the `JobCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `JobCard` DROP COLUMN `In`,
    DROP COLUMN `Out`,
    ADD COLUMN `InReceivedBy` VARCHAR(191) NULL,
    ADD COLUMN `InReceivedFrom` VARCHAR(191) NULL,
    ADD COLUMN `InTime` VARCHAR(191) NULL,
    ADD COLUMN `OutReceivedBy` VARCHAR(191) NULL,
    ADD COLUMN `OutReceivedFrom` VARCHAR(191) NULL,
    ADD COLUMN `OutTime` VARCHAR(191) NULL;
