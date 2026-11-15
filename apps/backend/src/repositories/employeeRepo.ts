import { employeeData } from "../data/employees.js";
import type { Department, Employee } from "../models/employee.js";

let departments: Department[] = employeeData.map((department) => ({
    ...department,
    employees: department.employees.map((employee) => ({ ...employee })),
}));

export const employeeRepo = {
    getDepartments(): Department[] {
        return departments.map((department) => ({
            ...department,
            employees: department.employees.map((employee) => ({ ...employee })),
        }));
    },

    createEmployee(firstName: string, departmentName: string): Employee {
        const newEmployee: Employee = { firstName };
        departments = departments.map((department) =>
            department.name === departmentName
                ? { ...department, employees: [...department.employees, newEmployee] }
                : department
        );
        return newEmployee;
    },
};
