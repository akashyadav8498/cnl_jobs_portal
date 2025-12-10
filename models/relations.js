const User = require("./User");
const HrProfile = require("./HrProfile");

// Parent: User
// Child: HrProfile

User.hasOne(HrProfile, {
  foreignKey: "user_id",   // column in hr_profile table
  as: "hrProfile"
});

HrProfile.belongsTo(User, {
  foreignKey: "user_id",
  as: "user"
});

module.exports = { User, HrProfile };
