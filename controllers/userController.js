const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ status: "success", data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      ...rest,
      password: hashedPassword,
    });
    res.redirect("/api/users/employerDashboard");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
