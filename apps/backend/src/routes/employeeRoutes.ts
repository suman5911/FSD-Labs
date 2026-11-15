import { Router } from "express";
import { employeeController } from "../controllers/employeeController.js";

export const employeeRoutes = Router();

employeeRoutes.get("/departments", employeeController.getDepartments);
employeeRoutes.post("/employees", employeeController.createEmployee);
