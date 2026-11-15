import type { Department } from "../models/employee";

interface EmployeeDirectoryProps {
    departments: Department[];
}

export function EmployeeDirectory({ departments }: EmployeeDirectoryProps) {
    return (
        <main className="employee-directory">
            {departments.map((department) => (
                <section className="department" key={department.name}>
                    <h2>{department.name}</h2>

                    <ul>
                        {department.employees.map((employee) => (
                            <li
                                key={`${employee.firstName}-${employee.lastName ?? ""}`}
                            >
                                {employee.firstName}
                                {employee.lastName ? ` ${employee.lastName}` : ""}
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </main>
    );
}