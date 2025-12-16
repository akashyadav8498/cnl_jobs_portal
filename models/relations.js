const User = require("./User");
const HrProfile = require("./HrProfile");
const CompanyProfile = require("./CompanyProfile");
const CompanyCategories = require("./CompanyCategories");

// User ↔ HR Profile
User.hasOne(HrProfile, {
  foreignKey: "user_id",
  as: "hrProfile",
});

HrProfile.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});

// HR Profile ↔ Company Profile
HrProfile.hasOne(CompanyProfile, {
  foreignKey: "hr_profile_id",
  as: "companyProfile",
});

CompanyProfile.belongsTo(HrProfile, {
  foreignKey: "hr_profile_id",
  as: "hrProfile",
});

// ✅ Company Category ↔ Company Profile
CompanyCategories.hasMany(CompanyProfile, {
  foreignKey: "category_id",
  as: "companyProfile",
});

CompanyProfile.belongsTo(CompanyCategories, {
  foreignKey: "category_id",
  as: "companyCategories",
});

module.exports = {
  User,
  HrProfile,
  CompanyProfile,
  CompanyCategories,
};
