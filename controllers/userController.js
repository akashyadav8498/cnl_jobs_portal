const HrProfile = require("../models/HrProfile");

exports.getUsers = async (req, res) => {
  try {
    const users = await HrProfile.findAll();
    res.json({ status: "success", data: users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = await HrProfile.create(req.body);
    res.json({ status: "created", data: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
