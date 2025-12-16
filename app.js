import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import leaveTypesRouter from "./src/routes/leavetypes.routes.js";
import leaveRoutes from "./src/routes/leave.routes.js";
import enumRoutes from "./src/routes/enum.routes.js";

dotenv.config();

const app = express();

// Allow JSON
app.use(express.json());

// Add CORS before routes
app.use(
    cors({
        origin: " http://localhost:5173", //React frontend URL
        credentials: true,
    })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leavetype", leaveTypesRouter);
app.use("/api/leaves", leaveRoutes);
app.use("/api/enums", enumRoutes);

export default app;
