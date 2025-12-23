import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";  
import cors from "cors";
import path from "path";
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

/* -------------------- CORS -------------------- */
app.use(
    cors({
        origin: "https://https://ems-front-rouge.vercel.app",
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    })
);

/* -------------------- MIDDLEWARE -------------------- */
app.use(express.json());

// Allow JSON
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

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/leavetype", leaveTypesRouter);
app.use("/api/leaves", leaveRoutes);
app.use("/api/payroll", payrollRoutes)
app.use("/api/profile", profileRoutes);
app.use("/api/enums", enumRoutes);
app.use("/api/cards", cardsRoutes);

export default app;
