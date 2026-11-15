import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { employeeData } from "../src/data/employees.js";
import { roles } from "../src/data/roles.js";

const prisma = new PrismaClient();

async function main() {
    for (const department of employeeData) {
        const savedDepartment = await prisma.department.upsert({
            where: { name: department.name },
            update: {},
            create: { name: department.name },
        });

        for (const employee of department.employees) {
            const lastName = employee.lastName ?? null;
            const existingEmployee = await prisma.employee.findFirst({
                where: {
                    departmentId: savedDepartment.id,
                    firstName: employee.firstName,
                    lastName,
                },
            });

            if (!existingEmployee) {
                await prisma.employee.create({
                    data: {
                        firstName: employee.firstName,
                        lastName,
                        departmentId: savedDepartment.id,
                    },
                });
            }
        }
    }

    for (const person of roles) {
        await prisma.role.upsert({
            where: { title: person.role },
            update: {},
            create: {
                title: person.role,
                firstName: person.firstName,
                lastName: person.lastName,
            },
        });
    }

    console.log("Seed completed using the original Lab 3.2 employee and role data.");
}

main()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
