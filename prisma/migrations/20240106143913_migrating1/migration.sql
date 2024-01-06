/*
  Warnings:

  - You are about to alter the column `EstimateNum` on the `Invoice` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Added the required column `DepCost` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Invoice` ADD COLUMN `DepCost` DOUBLE NOT NULL,
    MODIFY `EstimateNum` INTEGER NOT NULL;
