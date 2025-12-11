const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const HrProfile = sequelize.define(
  "HrProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    u_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    designation: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    contact: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "hr_profile",
    timestamps: true,
  }
);

module.exports = HrProfile;
