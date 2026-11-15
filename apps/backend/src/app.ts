import express from "express";
import cors from "cors";
import { employeeRoutes } from "./routes/employeeRoutes.js";
import { roleRoutes } from "./routes/roleRoutes.js";

export const app = express();
const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:5173";

// Allow the React app and tools such as Postman (which send no Origin header).
app.use((request, response, next) => {
    const origin = request.get("origin");
    if (origin && origin !== frontendOrigin) {
        response.status(403).json({ message: "Origin not allowed." });
        return;
    }
    next();
});
app.use(cors({ origin: frontendOrigin }));
app.use(express.json());

app.use("/api", employeeRoutes);
app.use("/api", roleRoutes);

// Vercel can use the same Express application when deployed later.
export default app;
