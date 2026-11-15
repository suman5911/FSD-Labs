// Employee and Role types shared between the front-end and back-end.
export interface Employee {
    firstName: string;
    lastName?: string;
}

export interface Department {
    name: string;
    employees: Employee[];
}

export interface Role {
    firstName: string;
    lastName: string;
    role: string;
}
