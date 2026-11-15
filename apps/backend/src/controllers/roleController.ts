import type { Request, Response } from "express";
import { roleService } from "../services/roleService.js";

export const roleController = {
    getRoles(_request: Request, response: Response) {
        response.json(roleService.getRoles());
    },

    createRole(request: Request, response: Response) {
        const { firstName, lastName, role } = request.body ?? {};
        const result = roleService.createRole(firstName, lastName, role);
        response.status(result.success ? 201 : 400).json(result);
    },
};
