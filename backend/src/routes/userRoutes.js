import express from "express";
import { createUser } from "../controllers/user.controller.js";
import { isAdmin } from "../middleware/auth.middleware.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Only admin can create users
router.post("/", protect, isAdmin, createUser);

export default router;
