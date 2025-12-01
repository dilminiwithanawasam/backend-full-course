export const createRole = async (req, res) => {
  try {
    const role = await createRoleService(req.body);

    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    });
  }
};
