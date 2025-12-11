import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import leaveTypesRouter from "./src/routes/leavetypes.routes.js";
import leaveRoutes from "./src/routes/leave.routes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leavetype", leaveTypesRouter);
app.use("/api/leaves", leaveRoutes);

export default app;
