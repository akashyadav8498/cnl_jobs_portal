const User = require("./User");
const HrProfile = require("./HrProfile");
const CompanyProfile = require("./CompanyProfile");

User.hasOne(HrProfile, {
  foreignKey: "user_id",  
  as: "hrProfile"
});

HrProfile.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

HrProfile.hasOne(CompanyProfile, {
  foreignKey: "hr_profile_id",  
  as: "companyProfile"
});

CompanyProfile.belongsTo(HrProfile, {
  foreignKey: "hr_profile_id",
  as: "hrProfile"
});

module.exports = { User, HrProfile, CompanyProfile };
