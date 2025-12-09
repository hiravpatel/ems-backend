import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check Admin role
    if (user.role !== "ADMIN") {
      return res.status(403).json({
        message: "Access denied. Admin Only.",
      });
    }

    req.user = user; //Store user info
    next(); //Continue request
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Invalid token",
    });
  }
};
