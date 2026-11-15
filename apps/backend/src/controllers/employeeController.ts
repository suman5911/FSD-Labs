import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService.js";

export const employeeController = {
    async getDepartments(_request: Request, response: Response) {
        try {
            response.json(await employeeService.getDepartments());
        } catch {
            response.status(500).json({ message: "Unable to load departments." });
        }
    },

    async createEmployee(request: Request, response: Response) {
        try {
            const { firstName, departmentName } = request.body ?? {};
            const result = await employeeService.createEmployee(firstName, departmentName);
            response.status(result.success ? 201 : 400).json(result);
        } catch {
            response.status(500).json({ message: "Unable to save employee." });
        }
    },
};
