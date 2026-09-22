import { useState } from "react";
import type { FormEvent } from "react";
import type { Department } from "../models/employee";

interface EmployeeFormProps {
    departments: Department[];
    onAddEmployee: (
        firstName: string,
        departmentName: string
    ) => void;
}

export function EmployeeForm({
    departments,
    onAddEmployee,
}: EmployeeFormProps) {
    const [firstName, setFirstName] = useState("");
    const [departmentName, setDepartmentName] = useState("");

    const [firstNameError, setFirstNameError] = useState("");
    const [departmentError, setDepartmentError] = useState("");

    function handleFirstNameChange(value: string) {
        setFirstName(value);

        if (value.trim().length >= 3) {
            setFirstNameError("");
        }
    }

    function handleDepartmentChange(value: string) {
        setDepartmentName(value);

        if (value !== "") {
            setDepartmentError("");
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setFirstNameError("");
        setDepartmentError("");

        let isValid = true;

        if (firstName.trim().length < 3) {
            setFirstNameError(
                "First name must have at least 3 characters."
            );
            isValid = false;
        }

        if (departmentName === "") {
            setDepartmentError(
                "Please select a department."
            );
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        onAddEmployee(firstName.trim(), departmentName);

        setFirstName("");
        setDepartmentName("");
    }

    return (
        <section className="employee-form-section">
            <h2>Add Employee</h2>

            <form
                className="employee-form"
                onSubmit={handleSubmit}
            >
                <div>
                    <label htmlFor="first-name">
                        First Name
                    </label>

                    <input
                        id="first-name"
                        type="text"
                        value={firstName}
                        onChange={(event) =>
                            handleFirstNameChange(
                                event.target.value
                            )
                        }
                    />

                    {firstNameError && (
                        <p className="validation-error">
                            {firstNameError}
                        </p>
                    )}
                </div>

                <div>
                    <label htmlFor="department">
                        Department
                    </label>

                    <select
                        id="department"
                        value={departmentName}
                        onChange={(event) =>
                            handleDepartmentChange(
                                event.target.value
                            )
                        }
                    >
                        <option value="">
                            Select a department
                        </option>

                        {departments.map((department) => (
                            <option
                                key={department.name}
                                value={department.name}
                            >
                                {department.name}
                            </option>
                        ))}
                    </select>

                    {departmentError && (
                        <p className="validation-error">
                            {departmentError}
                        </p>
                    )}
                </div>

                <button type="submit">
                    Add Employee
                </button>
            </form>
        </section>
    );
}