import type { Department } from "../models/employee";
import type { AddEmployeeResult } from "../services/employeeService";

const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const employeeRepo = {
    async getDepartments(): Promise<Department[]> {
        const response = await fetch(`${apiUrl}/api/departments`);
        if (!response.ok) {
            throw new Error("Unable to load employees.");
        }
        return response.json() as Promise<Department[]>;
    },

    async createEmployee(firstName: string, departmentName: string): Promise<AddEmployeeResult> {
        const response = await fetch(`${apiUrl}/api/employees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, departmentName }),
        });
        if (response.status !== 201 && response.status !== 400) {
            throw new Error("Unable to save employee.");
        }
        return response.json() as Promise<AddEmployeeResult>;
    },
};
