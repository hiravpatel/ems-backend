import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import leaveTypesRouter from "./src/routes/leavetypes.routes.js";
import leaveRoutes from "./src/routes/leave.routes.js";
import payrollRoutes from "./src/routes/payroll.routes.js";
import enumRoutes from "./src/routes/enum.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import cardsRoutes from "./src/routes/cards.routes.js";

dotenv.config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173", //Frontend url
        credentials: true
    })
);

// Allow JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leavetype", leaveTypesRouter);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes)
app.use("/api/enums", enumRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/cards", cardsRoutes);

export default app;
