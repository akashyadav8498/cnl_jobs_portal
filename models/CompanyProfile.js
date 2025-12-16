const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const CompanyProfile = sequelize.define(
  "CompanyProfile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    hr_profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    founded_year: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    contact: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    website: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "company_categories",
        key: "id",
      },
    },

    street_address: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    location: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    description: {
      type: DataTypes.STRING(100),
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
    tableName: "company_profile",
    timestamps: true,
  }
);

module.exports = CompanyProfile;
