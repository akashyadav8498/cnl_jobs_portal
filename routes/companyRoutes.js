const express = require("express");
const {
  getCompanyCategories,
  getCompanyDetails,
  updateCompanyDetails,
} = require("../controllers/companyController");

const router = express.Router();

router.get("/getCompanyCategories", getCompanyCategories);
router.get("/getCompanyDetails", getCompanyDetails);
router.post("/updateCompanyDetails", updateCompanyDetails);

module.exports = router;
