import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import employeeData from "./data/employees.json";
import { Employees } from "./components/Employees";
import { Organization } from "./components/Organization";
import { Layout } from "./components/Layout";
import type { Department } from "./models/employee";

function App() {
    const [departments, setDepartments] =
        useState<Department[]>(employeeData);

    function addEmployee(
        firstName: string,
        departmentName: string
    ) {
        const updatedDepartments = departments.map(
            (department) => {
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
            }
        );

        setDepartments(updatedDepartments);
    }

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={
                        <Navigate
                            to="/employees"
                            replace
                        />
                    }
                />

                <Route
                    path="employees"
                    element={
                        <Employees
                            departments={departments}
                            onAddEmployee={addEmployee}
                        />
                    }
                />

                <Route
                    path="organization"
                    element={<Organization />}
                />
            </Route>
        </Routes>
    );
}

export default App;