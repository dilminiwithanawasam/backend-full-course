import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/hash.util.js";

const prisma = new PrismaClient();

export const createUserService = async (data) => {
  const { first_name, email, password, roleId } = data;

  // Check duplicate user
  const existing = await prisma.user.findUnique({
    where: { email }
  });

  if (existing) {
    throw new Error("User already exists with this email");
  }

  // Hash password
  const hashed = await hashPassword(password);

  // Create user
  const user = await prisma.user.create({
    data: {
      first_name,
      email,
      password: hashed,
      roleId
    }
  });

  return user;
};
