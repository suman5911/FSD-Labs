import { employeeRepo } from "../repositories/employeeRepo.js";

export interface AddEmployeeResult {
    success: boolean;
    firstNameError: string;
    departmentError: string;
}

export const employeeService = {
    getDepartments() {
        return employeeRepo.getDepartments();
    },

    createEmployee(firstName: unknown, departmentName: unknown): AddEmployeeResult {
        const cleanName = typeof firstName === "string" ? firstName.trim() : "";
        const selectedDepartment =
            typeof departmentName === "string" ? departmentName : "";

        const firstNameError = cleanName.length < 3
            ? "First name must have at least 3 characters."
            : "";
        const departmentExists = employeeRepo.getDepartments().some(
            (department) => department.name === selectedDepartment
        );
        const departmentError = departmentExists
            ? ""
            : "Please select a valid department.";

        if (firstNameError || departmentError) {
            return { success: false, firstNameError, departmentError };
        }

        employeeRepo.createEmployee(cleanName, selectedDepartment);
        return { success: true, firstNameError: "", departmentError: "" };
    },
};
