import prisma from "../config/prisma.js";

export const generateEmployeeCode = async () => {
    
    // Find the latest employee bbased on ID
    const lastEmployee = await prisma.user.findFirst({
        where: { role: "EMPLOYEE" },
        orderBy: { id: "desc" },
        select: { employeeCode: true }
    });

    if (!lastEmployee || !lastEmployee.employeeCode) {
        return "EMP_001";   //First Employee
    }

    // Extract the number part
    const lastNumber = parseInt(lastEmployee.employeeCode.split("_")[1]);

    const newNumber = lastNumber + 1;

    // Pad number to 3 digits
    const padded = String(newNumber).padStart(3, "0");

    return `EMP_${padded}`;
}