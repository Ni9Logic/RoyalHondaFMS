/*
  Warnings:

  - You are about to drop the column `RequiredWorkDetails` on the `JobCard` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `JobCard` DROP COLUMN `RequiredWorkDetails`;

-- CreateTable
CREATE TABLE `EstimatedCostWork` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `work` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `jobId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EstimatedCostWork` ADD CONSTRAINT `EstimatedCostWork_jobId_fkey` FOREIGN KEY (`jobId`) REFERENCES `JobCard`(`SerialNo`) ON DELETE RESTRICT ON UPDATE CASCADE;
