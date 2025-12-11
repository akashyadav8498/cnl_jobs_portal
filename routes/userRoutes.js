const express = require("express");
const { getUsers, createUser, updateUser } = require("../controllers/userController");

const router = express.Router();

router.get("/getUserDetails", getUsers);
router.post("/register", createUser);
router.post("/updateUser", updateUser);

module.exports = router;
