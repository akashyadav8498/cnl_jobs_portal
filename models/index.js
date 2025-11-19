const { Sequelize } = require("sequelize");
const config = require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging
  }
);

// Test DB connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Unable to connect to database:", error);
  }
})();

module.exports = sequelize;
