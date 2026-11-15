import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService.js";

export const employeeController = {
    getDepartments(_request: Request, response: Response) {
        response.json(employeeService.getDepartments());
    },

    createEmployee(request: Request, response: Response) {
        const { firstName, departmentName } = request.body ?? {};
        const result = employeeService.createEmployee(firstName, departmentName);
        response.status(result.success ? 201 : 400).json(result);
    },
};
