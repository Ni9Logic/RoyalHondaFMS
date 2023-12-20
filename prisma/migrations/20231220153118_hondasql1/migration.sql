-- AlterTable
ALTER TABLE `EstimatedCostWork` ADD COLUMN `cContact` VARCHAR(191) NULL,
    ADD COLUMN `cName` VARCHAR(191) NULL,
    MODIFY `requiredWorkDetails` VARCHAR(191) NULL;
