const express = require("express");
const { getUsers, createUser } = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/createUser", createUser);
router.get("/employerDashboard", (req, res) => {
  res.render("employerDashboard", { title: "Registration Successful" });
});


module.exports = router;
