const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true
  }
  ,
  password: {
    type: DataTypes.STRING
  }
  ,
  mobile: {
    type: DataTypes.STRING
  }
}, {
  tableName: "users",
  timestamps: true
});

module.exports = User;
