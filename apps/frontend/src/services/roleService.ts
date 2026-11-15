import { roleRepo } from "../repositories/roleRepo";
import type { Role } from "../models/role";

export interface AddRoleResult {
    success: boolean;
    firstNameError: string;
    lastNameError: string;
    roleError: string;
}

export const roleService = {
    async getRoles(): Promise<Role[]> {
        return roleRepo.getRoles();
    },

    async createRole(firstName: string, lastName: string, role: string): Promise<AddRoleResult> {
        const cleanFirstName = firstName.trim();
        const cleanLastName = lastName.trim();
        const cleanRole = role.trim();
        const firstNameError = cleanFirstName.length < 3
            ? "First name must have at least 3 characters."
            : "";
        const lastNameError = cleanLastName ? "" : "Last name is required.";
        let roleError = cleanRole ? "" : "Role is required.";

        if (cleanRole) {
            const roles = await roleRepo.getRoles();
            if (roles.some((person) => person.role.toLowerCase() === cleanRole.toLowerCase())) {
                roleError = "This role is already occupied.";
            }
        }

        if (firstNameError || lastNameError || roleError) {
            return { success: false, firstNameError, lastNameError, roleError };
        }
        return roleRepo.createRole({ firstName: cleanFirstName, lastName: cleanLastName, role: cleanRole });
    },
};
