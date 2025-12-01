import {
  createPermissionService,
  getAllPermissionsService,
  deletePermissionService,
  updatePermissionService
} from "../services/permission.service.js";

/**
 * Create Permission
 */
export const createPermission = async (req, res) => {
  try {
    const permission = await createPermissionService(req.body);

    res.status(201).json({
      success: true,
      message: "Permission created successfully",
      data: permission
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Get All Permissions
 */
export const getPermissions = async (req, res) => {
  try {
    const permissions = await getAllPermissionsService();

    res.status(200).json({
      success: true,
      data: permissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Update Permission
 */
export const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPermission = await updatePermissionService(id, req.body);

    res.status(200).json({
      success: true,
      message: "Permission updated successfully",
      data: updatedPermission
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete Permission
 */
export const deletePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deletePermissionService(id);

    res.status(200).json({
      success: true,
      message: "Permission deleted successfully",
      data: deleted
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
