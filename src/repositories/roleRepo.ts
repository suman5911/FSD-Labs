
import { roles } from "../data/roles";
import type { Role } from "../models/role";

let organization: Role[] = roles.map((person) => ({
    ...person,
}));

export const roleRepo = {
    getRoles(): Role[] {
        return organization.map((person) => ({
            ...person,
        }));
    },

    createRole(person: Role): Role {
        const newPerson = { ...person };

        organization = [...organization, newPerson];

        return newPerson;
    },

    updateRole(
        currentRole: string,
        updatedPerson: Role
    ): boolean {
        const exists = organization.some(
            (person) => person.role === currentRole
        );

        if (!exists) {
            return false;
        }

        organization = organization.map((person) =>
            person.role === currentRole
                ? { ...updatedPerson }
                : person
        );

        return true;
    },

    deleteRole(roleName: string): boolean {
        const originalLength = organization.length;

        organization = organization.filter(
            (person) => person.role !== roleName
        );

        return organization.length < originalLength;
    },
};