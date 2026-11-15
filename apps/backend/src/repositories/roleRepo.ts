import { prisma } from "../database/prisma.js";
import type { Role } from "../models/role.js";

export const roleRepo = {
    async getRoles(): Promise<Role[]> {
        const roles = await prisma.role.findMany({ orderBy: { id: "asc" } });
        return roles.map((person) => ({
            firstName: person.firstName,
            lastName: person.lastName,
            role: person.title,
        }));
    },

    async createRole(person: Role): Promise<Role> {
        const result = await prisma.role.create({
            data: {
                title: person.role,
                firstName: person.firstName,
                lastName: person.lastName,
            },
        });
        return { firstName: result.firstName, lastName: result.lastName, role: result.title };
    },
};
