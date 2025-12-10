/*
  Warnings:

  - Added the required column `department` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `department` ENUM('HR', 'IT', 'Finance', 'Sales', 'Marketing') NOT NULL,
    ADD COLUMN `position` ENUM('HR_Executive', 'Software_Developer', 'Payroll_Executive', 'Sales_Manager', 'Marketing_Manager') NOT NULL,
    ADD COLUMN `status` ENUM('Active', 'Inactive') NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
