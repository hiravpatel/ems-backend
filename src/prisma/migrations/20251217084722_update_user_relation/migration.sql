/*
  Warnings:

  - A unique constraint covering the columns `[personalInfoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[educationInfoId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Leave_employeeId_fkey` ON `leave`;

-- DropIndex
DROP INDEX `Leave_leaveTypeId_fkey` ON `leave`;

-- DropIndex
DROP INDEX `User_departmentSalaryId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `educationInfoId` INTEGER NULL,
    ADD COLUMN `personalInfoId` INTEGER NULL;

-- CreateTable
CREATE TABLE `PersonalInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fatherName` VARCHAR(191) NULL,
    `fatherContact` VARCHAR(191) NULL,
    `motherName` VARCHAR(191) NULL,
    `motherContact` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `dateOfBirth` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EducationInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uDegree` VARCHAR(191) NULL,
    `uCollege` VARCHAR(191) NULL,
    `uYear` VARCHAR(191) NULL,
    `uCGPA` DOUBLE NULL,
    `pDegree` VARCHAR(191) NULL,
    `pCollege` VARCHAR(191) NULL,
    `pYear` VARCHAR(191) NULL,
    `pCGPA` DOUBLE NULL,
    `phdResearch` VARCHAR(191) NULL,
    `phdCollege` VARCHAR(191) NULL,
    `phdYear` VARCHAR(191) NULL,
    `phdResult` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_personalInfoId_key` ON `User`(`personalInfoId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_educationInfoId_key` ON `User`(`educationInfoId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_personalInfoId_fkey` FOREIGN KEY (`personalInfoId`) REFERENCES `PersonalInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_educationInfoId_fkey` FOREIGN KEY (`educationInfoId`) REFERENCES `EducationInfo`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentSalaryId_fkey` FOREIGN KEY (`departmentSalaryId`) REFERENCES `DepartmentSalary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_leaveTypeId_fkey` FOREIGN KEY (`leaveTypeId`) REFERENCES `LeaveType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
