import type { Role } from "../models/role";
import type { AddRoleResult } from "../services/roleService";

const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const roleRepo = {
    async getRoles(): Promise<Role[]> {
        const response = await fetch(`${apiUrl}/api/roles`);
        if (!response.ok) {
            throw new Error("Unable to load organization.");
        }
        return response.json() as Promise<Role[]>;
    },

    async createRole(person: Role): Promise<AddRoleResult> {
        const response = await fetch(`${apiUrl}/api/roles`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(person),
        });
        if (response.status !== 201 && response.status !== 400) {
            throw new Error("Unable to save role.");
        }
        return response.json() as Promise<AddRoleResult>;
    },
};
