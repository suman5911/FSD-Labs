
import type { FormEvent } from "react";
import { useFormInput } from "../hooks/useFormInput";
import type { Department } from "../models/employee";
import type { AddEmployeeResult } from "../services/employeeService";

interface EmployeeFormProps {
    departments: Department[];
    onAddEmployee: (
        firstName: string,
        departmentName: string
    ) => AddEmployeeResult;
}

export function EmployeeForm({
    departments,
    onAddEmployee,
}: EmployeeFormProps) {
    const firstName = useFormInput();
    const departmentName = useFormInput();

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const result = onAddEmployee(
            firstName.value,
            departmentName.value
        );

        firstName.validate(() =>
            result.firstNameError
                ? [result.firstNameError]
                : []
        );

        departmentName.validate(() =>
            result.departmentError
                ? [result.departmentError]
                : []
        );

        if (result.success) {
            firstName.reset();
            departmentName.reset();
        }
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
                        value={firstName.value}
                        onChange={(event) =>
                            firstName.changeValue(
                                event.target.value
                            )
                        }
                    />

                    {firstName.messages.map((message) => (
                        <p
                            className="validation-error"
                            key={message}
                        >
                            {message}
                        </p>
                    ))}
                </div>

                <div>
                    <label htmlFor="department">
                        Department
                    </label>

                    <select
                        id="department"
                        value={departmentName.value}
                        onChange={(event) =>
                            departmentName.changeValue(
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

                    {departmentName.messages.map((message) => (
                        <p
                            className="validation-error"
                            key={message}
                        >
                            {message}
                        </p>
                    ))}
                </div>

                <button type="submit">
                    Add Employee
                </button>
            </form>
        </section>
    );
}