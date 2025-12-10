require("dotenv").config();
const express = require("express");
const sequelize = require("./models/index");
const userRoutes = require("./routes/userRoutes");
const { User, HrProfile } = require("./models/relations");

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
app.get('/employer-dashboard', (req, res) => {
  res.render('emp_panel/employer-dashboard');  
});
app.get('/recruiter-profile', (req, res) => {
  res.render('emp_panel/recruiter-profile');  
});
app.get('/company-profile', (req, res) => {
  res.render('emp_panel/company-profile');  
});
app.get('/employer-jobs', (req, res) => {
  res.render('emp_panel/employer-jobs');  
});
app.get('/employer-submit-jobs', (req, res) => {
  res.render('emp_panel/employer-submit-jobs');  
});
app.get('/employer-applicants-jobs', (req, res) => {
  res.render('emp_panel/employer-applicants-jobs');  
});
app.get('/employer-shortlist-candidates', (req, res) => {
  res.render('emp_panel/employer-shortlist-candidates');  
});
app.get('/employer-package', (req, res) => {
  res.render('emp_panel/employer-package');  
});
app.get('/employer-messages', (req, res) => {
  res.render('emp_panel/employer-messages');  
});
app.get('/employer-change-password', (req, res) => {
  res.render('emp_panel/employer-change-password');  
});
app.get('/employer-delete-account', (req, res) => {
  res.render('emp_panel/employer-delete-account');  
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
