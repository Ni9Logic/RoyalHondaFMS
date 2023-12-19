-- CreateTable
CREATE TABLE `webUser` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullname` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `hashedPassword` VARCHAR(191) NULL,
    `isAdmin` BOOLEAN NULL,
    `emailVerified` BOOLEAN NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `webUser_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `priceSheet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `partNo` VARCHAR(191) NULL,
    `partName` VARCHAR(191) NULL,
    `partModel` VARCHAR(191) NULL,
    `partPrice` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `JobCard` (
    `SerialNo` INTEGER NOT NULL AUTO_INCREMENT,
    `CustomerName` VARCHAR(191) NULL,
    `DriverUser` VARCHAR(191) NULL,
    `CellNo` VARCHAR(191) NULL,
    `JobCheckedBy` VARCHAR(191) NULL,
    `WorkType` VARCHAR(191) NULL,
    `Insurance` VARCHAR(191) NULL,
    `WorkOrder` VARCHAR(191) NULL,
    `CashWorks` VARCHAR(191) NULL,
    `RegistrationNumber` VARCHAR(191) NULL,
    `RequiredWorkDetails` JSON NULL,
    `Fuel` VARCHAR(191) NULL,
    `Mileage` VARCHAR(191) NULL,
    `Lighter` BOOLEAN NULL,
    `Ashtray` BOOLEAN NULL,
    `FloorMats` BOOLEAN NULL,
    `OriginalBook` BOOLEAN NULL,
    `SeatCovers` BOOLEAN NULL,
    `RadioAntena` BOOLEAN NULL,
    `SpareWheel` BOOLEAN NULL,
    `WheelRod` BOOLEAN NULL,
    `JackHandle` BOOLEAN NULL,
    `Tools` BOOLEAN NULL,
    `ExtraThings` BOOLEAN NULL,
    `FrameNo` VARCHAR(191) NULL,
    `BatteryNumber` VARCHAR(191) NULL,
    `In` JSON NULL,
    `Out` JSON NULL,

    PRIMARY KEY (`SerialNo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
