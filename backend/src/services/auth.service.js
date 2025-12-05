// src/services/auth.service.js
import prisma from "../DB/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const loginService = async (email, password) => {
  // Find user with role
  const user = await prisma.user.findUnique({
    where: { email },
    include: { role: true } // include role to get role.name
  });

  if (!user) {
    return { success: false, message: "User not found" };
  }

  // Match password
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return { success: false, message: "Invalid credentials" };
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role.name
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  // ✅ Return user object along with token
  return {
    success: true,
    message: "Login successful",
    token,
    user // <-- include full user object
  };
};
