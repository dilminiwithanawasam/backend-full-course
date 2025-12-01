import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Create a new role with assigned permissions
 * @param {Object} data - { name, permissionIds }
 */
export const createRoleService = async (data) => {
  const { name, permissionIds } = data;

  // (1) Check if role name already exists
  const existingRole = await prisma.role.findUnique({
    where: { name }
  });

  if (existingRole) {
    throw new Error("A role with this name already exists");
  }

  // (2) Validate permission IDs (ensure they exist)
  const permissions = await prisma.permission.findMany({
    where: { id: { in: permissionIds || [] } }
  });

  if (permissions.length !== permissionIds.length) {
    throw new Error("One or more permission IDs are invalid");
  }

  // (3) Create role with many-to-many relation
  const role = await prisma.role.create({
    data: {
      name,
      permissions: {
        connect: permissionIds.map((id) => ({ id }))
      }
    },
    include: {
      permissions: true
    }
  });

  return role;
};
