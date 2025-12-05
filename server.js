require("dotenv").config();
const express = require("express");
const sequelize = require("./models/index");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(express.static("public"));

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');   
});
app.get('/contact', (req, res) => {
  res.render('contact');   
});
app.get('/about-us', (req, res) => {
  res.render('about-us');   
});
app.get('/faq', (req, res) => {
  res.render('faq');   
});
app.get('/blogs', (req, res) => {
  res.render('blogs');  
});
app.get('/signup', (req, res) => {
  res.render('signup');  
});
app.post('/employer-dashboard', (req, res) => {
  res.render('employer-dashboard');  
});


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
