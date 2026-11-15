import { useEffect, useState } from "react";
import type { Department } from "../models/employee";
import { employeeService } from "../services/employeeService";
import { EmployeeDirectory } from "./EmployeeDirectory";
import { EmployeeForm } from "./EmployeeForm";

export function Employees() {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        employeeService.getDepartments()
            .then(setDepartments)
            .catch(() => setError("Could not load employees from the back-end."));
    }, []);

    async function handleAddEmployee(firstName: string, departmentName: string) {
        const result = await employeeService.createEmployee(firstName, departmentName);
        if (result.success) {
            setDepartments(await employeeService.getDepartments());
        }
        return result;
    }

    return (
        <>
            {error && <p className="validation-error">{error}</p>}
            <EmployeeDirectory departments={departments} />
            <EmployeeForm departments={departments} onAddEmployee={handleAddEmployee} />
        </>
    );
}
