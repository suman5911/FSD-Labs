
import { employeeRepo } from "../repositories/employeeRepo";
import type { Department } from "../models/employee";

export interface AddEmployeeResult {
    success: boolean;
    firstNameError: string;
    departmentError: string;
}

export const employeeService = {
    getDepartments(): Department[] {
        return employeeRepo.getDepartments();
    },

    createEmployee(
        firstName: string,
        departmentName: string
    ): AddEmployeeResult {
        const cleanName = firstName.trim();

        let firstNameError = "";
        let departmentError = "";

        if (cleanName.length < 3) {
            firstNameError =
                "First name must have at least 3 characters.";
        }

        const departments = employeeRepo.getDepartments();

        const departmentExists = departments.some(
            (department) => department.name === departmentName
        );

        if (!departmentExists) {
            departmentError =
                "Please select a valid department.";
        }

        if (firstNameError || departmentError) {
            return {
                success: false,
                firstNameError,
                departmentError,
            };
        }

        employeeRepo.createEmployee(
            cleanName,
            departmentName
        );

        return {
            success: true,
            firstNameError: "",
            departmentError: "",
        };
    },
};
