import { roles } from "../data/roles.js";
import type { Role } from "../models/role.js";

let organization: Role[] = roles.map((person) => ({ ...person }));

export const roleRepo = {
    getRoles(): Role[] {
        return organization.map((person) => ({ ...person }));
    },

    createRole(person: Role): Role {
        const newPerson = { ...person };
        organization = [...organization, newPerson];
        return newPerson;
    },
};
