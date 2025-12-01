// src/controllers/auth.controller.js
import { loginService } from "../services/auth.service.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginService(email, password);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    return res.status(200).json({
      message: result.message,
      token: result.token
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
