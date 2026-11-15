import { roleRepo } from "../repositories/roleRepo.js";

export interface AddRoleResult {
    success: boolean;
    firstNameError: string;
    lastNameError: string;
    roleError: string;
}

export const roleService = {
    async getRoles() {
        return roleRepo.getRoles();
    },

    async createRole(firstName: unknown, lastName: unknown, role: unknown): Promise<AddRoleResult> {
        const cleanFirstName = typeof firstName === "string" ? firstName.trim() : "";
        const cleanLastName = typeof lastName === "string" ? lastName.trim() : "";
        const cleanRole = typeof role === "string" ? role.trim() : "";

        const firstNameError = cleanFirstName.length < 3
            ? "First name must have at least 3 characters."
            : "";
        const lastNameError = cleanLastName ? "" : "Last name is required.";
        let roleError = cleanRole ? "" : "Role is required.";

        if (cleanRole && (await roleRepo.getRoles()).some(
            (person) => person.role.toLowerCase() === cleanRole.toLowerCase()
        )) {
            roleError = "This role is already occupied.";
        }

        if (firstNameError || lastNameError || roleError) {
            return { success: false, firstNameError, lastNameError, roleError };
        }

        await roleRepo.createRole({ firstName: cleanFirstName, lastName: cleanLastName, role: cleanRole });
        return { success: true, firstNameError: "", lastNameError: "", roleError: "" };
    },
};
