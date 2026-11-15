import { Router } from "express";
import { roleController } from "../controllers/roleController.js";

export const roleRoutes = Router();

roleRoutes.get("/roles", roleController.getRoles);
roleRoutes.post("/roles", roleController.createRole);
