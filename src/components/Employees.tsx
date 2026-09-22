import type { Department } from "../models/employee";
import { EmployeeDirectory } from "./EmployeeDirectory";
import { EmployeeForm } from "./EmployeeForm";

interface EmployeesProps {
    departments: Department[];
    onAddEmployee: (
        firstName: string,
        departmentName: string
    ) => void;
}

export function Employees({
    departments,
    onAddEmployee,
}: EmployeesProps) {
    return (
        <>
            <EmployeeDirectory departments={departments} />

            <EmployeeForm
                departments={departments}
                onAddEmployee={onAddEmployee}
            />
        </>
    );
}