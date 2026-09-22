import { useState } from "react";
import "./App.css";
import employeeData from "./data/employees.json";
import { Header } from "./components/Header";
import { EmployeeDirectory } from "./components/EmployeeDirectory";
import { EmployeeForm } from "./components/EmployeeForm";
import { Footer } from "./components/Footer";
import type { Department } from "./models/employee";

function App() {
    const [departments, setDepartments] =
        useState<Department[]>(employeeData);

    function addEmployee(firstName: string, departmentName: string) {
        const updatedDepartments = departments.map((department) => {
            if (department.name === departmentName) {
                return {
                    ...department,
                    employees: [
                        ...department.employees,
                        { firstName: firstName },
                    ],
                };
            }

            return department;
        });

        setDepartments(updatedDepartments);
    }

    return (
        <>
            <Header />

            <EmployeeDirectory departments={departments} />

            <EmployeeForm
                departments={departments}
                onAddEmployee={addEmployee}
            />

            <Footer />
        </>
    );
}

export default App;