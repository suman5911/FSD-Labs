
import { roleRepo } from "../repositories/roleRepo";
import type { Role } from "../models/role";

export interface AddRoleResult {
    success: boolean;
    firstNameError: string;
    lastNameError: string;
    roleError: string;
}

export const roleService = {
    getRoles(): Role[] {
        return roleRepo.getRoles();
    },

    createRole(
        firstName: string,
        lastName: string,
        role: string
    ): AddRoleResult {
        const cleanFirstName = firstName.trim();
        const cleanLastName = lastName.trim();
        const cleanRole = role.trim();

        let firstNameError = "";
        let lastNameError = "";
        let roleError = "";

        if (cleanFirstName.length < 3) {
            firstNameError =
                "First name must have at least 3 characters.";
        }

        if (cleanLastName.length === 0) {
            lastNameError = "Last name is required.";
        }

        if (cleanRole.length === 0) {
            roleError = "Role is required.";
        } else {
            const roleExists = roleRepo.getRoles().some(
                (person) =>
                    person.role.toLowerCase() ===
                    cleanRole.toLowerCase()
            );

            if (roleExists) {
                roleError = "This role is already occupied.";
            }
        }

        if (
            firstNameError ||
            lastNameError ||
            roleError
        ) {
            return {
                success: false,
                firstNameError,
                lastNameError,
                roleError,
            };
        }

        roleRepo.createRole({
            firstName: cleanFirstName,
            lastName: cleanLastName,
            role: cleanRole,
        });

        return {
            success: true,
            firstNameError: "",
            lastNameError: "",
            roleError: "",
        };
    },
};