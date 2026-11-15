import type { Request, Response } from "express";
import { roleService } from "../services/roleService.js";

export const roleController = {
    async getRoles(_request: Request, response: Response) {
        try {
            response.json(await roleService.getRoles());
        } catch {
            response.status(500).json({ message: "Unable to load roles." });
        }
    },

    async createRole(request: Request, response: Response) {
        try {
            const { firstName, lastName, role } = request.body ?? {};
            const result = await roleService.createRole(firstName, lastName, role);
            response.status(result.success ? 201 : 400).json(result);
        } catch {
            response.status(500).json({ message: "Unable to save role." });
        }
    },
};
