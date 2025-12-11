const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const CompanyProfile = sequelize.define("CompanyProfile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  hr_profile_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },

  location: {
    type: DataTypes.STRING(50),
    allowNull: true
  },

  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },

  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }

}, {
  tableName: "company_profile",
  timestamps: true
});

module.exports = CompanyProfile;
