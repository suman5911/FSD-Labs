
import employeeData from "../data/employees.json";
import type { Department, Employee } from "../models/employee";

let departments: Department[] = employeeData.map((department) => ({
    ...department,
    employees: [...department.employees],
}));

export const employeeRepo = {
    getDepartments(): Department[] {
        return departments.map((department) => ({
            ...department,
            employees: department.employees.map((employee) => ({
                ...employee,
            })),
        }));
    },

    createEmployee(
        firstName: string,
        departmentName: string
    ): Employee {
        const newEmployee: Employee = {
            firstName: firstName,
        };

        departments = departments.map((department) => {
            if (department.name === departmentName) {
                return {
                    ...department,
                    employees: [
                        ...department.employees,
                        newEmployee,
                    ],
                };
            }

            return department;
        });

        return newEmployee;
    },
};
