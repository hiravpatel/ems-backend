import express from "express";
import { createUser, getAllUser, getUserById, updateUser, deleteUser } from "../controllers/user.controller.js";
import { verifyAdmin } from "../middlewares/verifyadmin.js";

const router = express.Router();

// Create Users
router.post("/", verifyAdmin, createUser);

// Get All User
router.get("/", verifyAdmin, getAllUser);

// Get user by ID
router.get("/:id", verifyAdmin, getUserById);

// Update User
router.put("/:id", verifyAdmin, updateUser);

// Delete User
router.delete("/:id", verifyAdmin, deleteUser);

export default router;