import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import leaveTypesRouter from "./src/routes/leavetypes.routes.js";
import leaveRoutes from "./src/routes/leave.routes.js";

dotenv.config();

const app = express();

/* -------------------- CORS -------------------- */
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());

/* -------------------- PATH FIX -------------------- */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* -------------------- STATIC FILES -------------------- */
app.use(express.static(path.join(__dirname, "src")));

/* -------------------- ROOT -------------------- */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "src", "index.html"));
});

/* -------------------- API ROUTES -------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leavetype", leaveTypesRouter);
app.use("/api/leaves", leaveRoutes);

export default app;
