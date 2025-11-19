require("dotenv").config();
const express = require("express");
const sequelize = require("./models/index");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(express.static("public"));


// Routes
app.use("/users", userRoutes);

// Sync DB (automatic tables creation)
sequelize.sync().then(() => {
  console.log("Database synced.");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV})`);
});
