import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

async function main() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
        throw new Error("ADMIN_EMAIL or ADMIN_PASSWORD missing in .env");
    }

    const adminExists = await prisma.user.findFirst({
        where: { role: "ADMIN" },
    });

    if (!adminExists) {
        await prisma.user.create({
            data: {
                firstName: "Kashish",
                email: adminEmail,
                contactNumber: "9999999999",
                joiningDate: new Date("2025-12-08T00:00:00.000Z"),
                password: await bcrypt.hash(adminPassword, 10),
                role: "ADMIN",
            },
        });

        console.log(`Admin created: ${adminEmail} / ${adminPassword}`);
    } else {
        console.log("Admin already exists");
    }
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
