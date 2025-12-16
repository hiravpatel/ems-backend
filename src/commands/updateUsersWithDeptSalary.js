import prisma from "../config/prisma.js";

async function main() {
  const departments = await prisma.departmentSalary.findMany();
  const users = await prisma.user.findMany();

  for (const user of users) {
    const dept = departments.find(d => d.department === user.department);
    if (dept) {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          departmentSalaryId: dept.id,
          salary: dept.basicSalary,
        },
      });
      console.log(`Updated user ${user.id} with department salary`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
