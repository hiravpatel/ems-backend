import prisma from "../src/config/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
    const adminExists = await prisma.user.findFirst({
        where: { role: "ADMIN" },
    });

    if (!adminExists) {
        await prisma.user.create({
            data: {
                name: "Admin",
                email: "admin@gmail.com",
                password: await bcrypt.hash("admin123", 10),
                role: "ADMIN",
            },
        });

        console.log("Admin created: admin@gmail.com / admin123");
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
