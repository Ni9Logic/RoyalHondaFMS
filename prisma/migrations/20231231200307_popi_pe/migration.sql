-- AlterTable
ALTER TABLE `EstimatedCostWork` ADD COLUMN `DiscountEstimateFigure` DOUBLE NULL,
    ADD COLUMN `DiscountServicesFigure` DOUBLE NULL,
    ADD COLUMN `Insurance` VARCHAR(191) NULL;
