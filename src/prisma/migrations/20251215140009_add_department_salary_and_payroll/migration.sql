-- DropIndex
DROP INDEX `Leave_employeeId_fkey` ON `leave`;

-- DropIndex
DROP INDEX `Leave_leaveTypeId_fkey` ON `leave`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `departmentSalaryId` INTEGER NULL,
    ADD COLUMN `salary` DOUBLE NULL;

-- CreateTable
CREATE TABLE `DepartmentSalary` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `department` ENUM('HR', 'IT', 'Finance', 'Sales', 'Marketing') NOT NULL,
    `basicSalary` DOUBLE NOT NULL,
    `allowance` DOUBLE NOT NULL,
    `deduction` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `DepartmentSalary_department_key`(`department`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payroll` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `employeeId` INTEGER NOT NULL,
    `month` VARCHAR(191) NOT NULL,
    `basicSalary` DOUBLE NOT NULL,
    `allowance` DOUBLE NOT NULL,
    `deduction` DOUBLE NOT NULL,
    `netSalary` DOUBLE NOT NULL,
    `payrollStatus` ENUM('PAID', 'UNPAID') NOT NULL DEFAULT 'UNPAID',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Payroll_employeeId_month_key`(`employeeId`, `month`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_departmentSalaryId_fkey` FOREIGN KEY (`departmentSalaryId`) REFERENCES `DepartmentSalary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payroll` ADD CONSTRAINT `Payroll_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leave` ADD CONSTRAINT `Leave_leaveTypeId_fkey` FOREIGN KEY (`leaveTypeId`) REFERENCES `LeaveType`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
