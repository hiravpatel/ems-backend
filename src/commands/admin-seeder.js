import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
  }

  // Check if ADMIN already exists
  const adminExists = await prisma.user.findFirst({
    where: { role: "ADMIN" },
  });

  if (adminExists) {
    console.log("Admin already exists");
    return;
  }

  // Create DepartmentSalary for HR if it doesn't exist
  let hrDepartmentSalary = await prisma.departmentSalary.findUnique({
    where: { department: "HR" },
  });

  if (!hrDepartmentSalary) {
    hrDepartmentSalary = await prisma.departmentSalary.create({
      data: {
        department: "HR",
        basicSalary: 120000,
        allowance: 20000,
        deduction: 5000,
      },
    });
  }

  // Create ADMIN user and connect to HR DepartmentSalary
  await prisma.user.create({
    data: {
      firstName: "Admin",
      lastName: "User",
      email: adminEmail,
      contactNumber: "9999999999",
      joiningDate: new Date(),
      password: await bcrypt.hash(adminPassword, 10),
      role: "ADMIN",
      position: "HR_Executive",
      department: "HR",
      status: "Active",
      salary: hrDepartmentSalary.basicSalary,
      departmentSalary: {
        connect: { id: hrDepartmentSalary.id },
      },
    },
  });

  console.log(`Admin created: ${adminEmail}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });