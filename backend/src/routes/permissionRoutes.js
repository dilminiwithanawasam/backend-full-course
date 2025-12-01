import express from "express";
import {
  createPermission,
  getPermissions,
  updatePermission,
  deletePermission
} from "../controllers/permission.controller.js";
import { isAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// Only admin can manage permissions
router.post("/", isAdmin, createPermission);          // Create permission
router.get("/", isAdmin, getPermissions);            // Get all permissions
router.put("/:id", isAdmin, updatePermission);       // Update a permission
router.delete("/:id", isAdmin, deletePermission);    // Delete a permission

export default router;
