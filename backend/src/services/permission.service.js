import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a new permission
 * @param {Object} data - { name }
 */
export const createPermissionService = async (data) => {
  const { name } = data;

  // (1) Check if permission already exists
  const existingPermission = await prisma.permission.findUnique({
    where: { name }
  });

  if (existingPermission) {
    throw new Error("A permission with this name already exists");
  }

  // (2) Create permission
  const permission = await prisma.permission.create({
    data: { name }
  });

  return permission;
};

/**
 * Get all permissions
 */
export const getAllPermissionsService = async () => {
  return await prisma.permission.findMany({
    orderBy: { id: "asc" }
  });
};

/**
 * Delete a permission by ID
 * @param {number} id
 */
export const deletePermissionService = async (id) => {
  const permissionId = Number(id);

  // (1) Check whether permission exists
  const existing = await prisma.permission.findUnique({
    where: { id: permissionId }
  });

  if (!existing) {
    throw new Error("Permission not found");
  }

  // (2) Delete permission
  const deleted = await prisma.permission.delete({
    where: { id: permissionId }
  });

  return deleted;
};

/**
 * Update a permission name
 * @param {number} id
 * @param {Object} data - { name }
 */
export const updatePermissionService = async (id, data) => {
  const { name } = data;
  const permissionId = Number(id);

  // Check if permission exists
  const existing = await prisma.permission.findUnique({
    where: { id: permissionId }
  });

  if (!existing) {
    throw new Error("Permission not found");
  }

  // Check duplicate name
  const duplicateName = await prisma.permission.findUnique({
    where: { name }
  });

  if (duplicateName && duplicateName.id !== permissionId) {
    throw new Error("A permission with this name already exists");
  }

  // Update
  const updated = await prisma.permission.update({
    where: { id: permissionId },
    data: { name }
  });

  return updated;
};
