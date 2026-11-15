import { employeeRepo } from "../repositories/employeeRepo";
import type { Department } from "../models/employee";

export interface AddEmployeeResult {
    success: boolean;
    firstNameError: string;
    departmentError: string;
}

export const employeeService = {
    async getDepartments(): Promise<Department[]> {
        return employeeRepo.getDepartments();
    },

    async createEmployee(firstName: string, departmentName: string): Promise<AddEmployeeResult> {
        const cleanName = firstName.trim();
        const firstNameError = cleanName.length < 3
            ? "First name must have at least 3 characters."
            : "";
        const departments = await employeeRepo.getDepartments();
        const departmentError = departments.some((department) => department.name === departmentName)
            ? ""
            : "Please select a valid department.";

        if (firstNameError || departmentError) {
            return { success: false, firstNameError, departmentError };
        }
        return employeeRepo.createEmployee(cleanName, departmentName);
    },
};
