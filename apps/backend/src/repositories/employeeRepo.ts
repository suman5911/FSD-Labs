import { prisma } from "../database/prisma.js";
import type { Department, Employee } from "../models/employee.js";

export const employeeRepo = {
    async getDepartments(): Promise<Department[]> {
        const departments = await prisma.department.findMany({
            include: { employees: true },
            orderBy: { name: "asc" },
        });

        return departments.map((department) => ({
            name: department.name,
            employees: department.employees.map((employee) => ({
                firstName: employee.firstName,
                ...(employee.lastName ? { lastName: employee.lastName } : {}),
            })),
        }));
    },

    async createEmployee(firstName: string, departmentName: string): Promise<Employee> {
        const employee = await prisma.employee.create({
            data: {
                firstName,
                department: { connect: { name: departmentName } },
            },
        });
        return { firstName: employee.firstName, ...(employee.lastName ? { lastName: employee.lastName } : {}) };
    },
};
