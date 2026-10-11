
import { useState } from "react";
import type { Department } from "../models/employee";
import { employeeService } from "../services/employeeService";
import { EmployeeDirectory } from "./EmployeeDirectory";
import { EmployeeForm } from "./EmployeeForm";

export function Employees() {
    const [departments, setDepartments] =
        useState<Department[]>(() =>
            employeeService.getDepartments()
        );

    function handleAddEmployee(
        firstName: string,
        departmentName: string
    ) {
        const result = employeeService.createEmployee(
            firstName,
            departmentName
        );

        if (result.success) {
            setDepartments(employeeService.getDepartments());
        }

        return result;
    }

    return (
        <>
            <EmployeeDirectory departments={departments} />

            <EmployeeForm
                departments={departments}
                onAddEmployee={handleAddEmployee}
            />
        </>
    );
}