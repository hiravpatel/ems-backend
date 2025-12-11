import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

        const token = authHeader.split(" ")[1];

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find User
        const user = await prisma.user.findUnique({
            where: { id: decoded.id },
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Check user role - must be EMPLOYEE
        if (user.role !== "EMPLOYEE") {
            return res.status(403).json({
                message: "Access denied. Only employees can apply for leave."
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({
            message: "Invalid token"
        });
    }
}
