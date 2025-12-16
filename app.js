import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import leaveTypesRouter from "./src/routes/leavetypes.routes.js";
import leaveRoutes from "./src/routes/leave.routes.js";
import payrollRoutes from "./src/routes/payroll.routes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", //Frontend url
        credentials: true
    })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leavetype", leaveTypesRouter);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes)

export default app;
