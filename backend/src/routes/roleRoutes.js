import express from "express";
import { createRole } from "../controllers/rolecontroller.js";
import { isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Only admin can create users
router.post("/", isAdmin, createRole);

export default router;
