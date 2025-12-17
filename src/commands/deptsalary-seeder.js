import prisma from "../config/prisma.js";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const departmentSalaries = [
    {
      department: "HR",
      basicSalary: 50000,
      allowance: 1000,
      deduction: 500,
    },
    {
      department: "IT",
      basicSalary: 40000,
      allowance: 1000,
      deduction: 500,
    },
    {
      department: "Finance",
      basicSalary: 350000,
      allowance: 1000,
      deduction: 500,
    },
    {
      department: "Sales",
      basicSalary: 25000,
      allowance: 1000,
      deduction: 500,
    },
    {
      department: "Marketing",
      basicSalary: 30000,
      allowance: 1000,
      deduction: 500,
    },
  ];

  for (const dept of departmentSalaries) {
    // Check if department already exists
    const exists = await prisma.departmentSalary.findUnique({
      where: { department: dept.department },
    });

    if (!exists) {
      await prisma.departmentSalary.create({
        data: dept,
      });
      console.log(`Department salary added: ${dept.department}`);
    } else {
      console.log(`Department already exists: ${dept.department}`);
    }
  }
}

main()
  .then(() => {
    console.log("Department salary seeding completed.");
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
