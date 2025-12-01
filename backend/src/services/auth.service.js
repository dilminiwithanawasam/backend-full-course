// src/services/auth.service.js
import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async (email, password) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true }
  });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  // Match password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Invalid credentials" };
  }

  // Generate token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    success: true,
    message: "Login successful",
    token
  };
};
