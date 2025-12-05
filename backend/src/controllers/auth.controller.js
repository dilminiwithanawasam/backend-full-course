import { loginService } from "../services/auth.service.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginService(email, password);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    const roleName = result.user.role?.name;

    return res.status(200).json({
      message: result.message,
      token: result.token,
      role: roleName // send role name to frontend
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};
