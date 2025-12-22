-- DropIndex
DROP INDEX `Leave_employeeId_fkey` ON `leave`;

-- DropIndex
DROP INDEX `Leave_leaveTypeId_fkey` ON `leave`;

-- DropIndex
DROP INDEX `User_departmentSalaryId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isFirstLogin` BOOLEAN NOT NULL DEFAULT true;

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
