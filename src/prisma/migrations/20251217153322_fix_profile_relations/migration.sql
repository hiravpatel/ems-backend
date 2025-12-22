/*
  Warnings:

  - You are about to drop the column `educationInfoId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `personalInfoId` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `EducationInfo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `PersonalInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `EducationInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `EducationInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `PersonalInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Leave_employeeId_fkey` ON `leave`;

-- DropIndex
DROP INDEX `Leave_leaveTypeId_fkey` ON `leave`;

-- DropIndex
DROP INDEX `User_departmentSalaryId_fkey` ON `user`;

-- DropIndex
DROP INDEX `User_educationInfoId_key` ON `user`;

-- DropIndex
DROP INDEX `User_personalInfoId_key` ON `user`;

-- AlterTable
ALTER TABLE `educationinfo` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `personalinfo` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `educationInfoId`,
    DROP COLUMN `personalInfoId`;

-- CreateIndex
CREATE UNIQUE INDEX `EducationInfo_userId_key` ON `EducationInfo`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `PersonalInfo_userId_key` ON `PersonalInfo`(`userId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentSalaryId_fkey` FOREIGN KEY (`departmentSalaryId`) REFERENCES `DepartmentSalary`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonalInfo` ADD CONSTRAINT `PersonalInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EducationInfo` ADD CONSTRAINT `EducationInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_leaveTypeId_fkey` FOREIGN KEY (`leaveTypeId`) REFERENCES `LeaveType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
