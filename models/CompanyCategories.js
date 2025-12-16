const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const CompanyCategories = sequelize.define(
  "CompanyCategories",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "company_categories",
    timestamps: true,
  }
);

module.exports = CompanyCategories;
