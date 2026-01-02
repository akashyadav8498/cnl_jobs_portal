require("dotenv").config();
const express = require("express");
const sequelize = require("./models/index");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companyRoutes");
const { User, HrProfile, CompanyProfile } = require("./models/relations");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(__dirname + "/utils"));

const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  session({
    secret: "cnl_job_portal_000001", // 💡 change this to a strong random string
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      // secure: true, // 👉 enable this only if you're using HTTPS
    },
  })
);

app.use((req, res, next) => {
  res.locals.currentPath = req.path; // ✅ makes current URL available in all EJS files
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/about-us", (req, res) => {
  res.render("about-us");
});
app.get("/faq", (req, res) => {
  res.render("faq");
});
app.get("/blogs", (req, res) => {
  res.render("blogs");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/employer-dashboard", (req, res) => {
  res.render("emp_panel/employer-dashboard", {
    session: req.session,
  });
});
app.get("/recruiter-profile", (req, res) => {
  res.render("emp_panel/recruiter-profile", {
    session: req.session,
  });
});
app.get("/company-profile", (req, res) => {
  res.render("emp_panel/company-profile", {
    session: req.session,
  });
});
app.get("/employer-jobs", (req, res) => {
  res.render("emp_panel/employer-jobs", {
    session: req.session,
  });
});
app.get("/employer-submit-jobs", (req, res) => {
  res.render("emp_panel/employer-submit-jobs", {
    session: req.session,
  });
});
app.get("/employer-applicants-jobs", (req, res) => {
  res.render("emp_panel/employer-applicants-jobs", {
    session: req.session,
  });
});
app.get("/employer-shortlist-candidates", (req, res) => {
  res.render("emp_panel/employer-shortlist-candidates", {
    session: req.session,
  });
});
app.get("/employer-package", (req, res) => {
  res.render("emp_panel/employer-package", {
    session: req.session,
  });
});
app.get("/employer-messages", (req, res) => {
  res.render("emp_panel/employer-messages", {
    session: req.session,
  });
});
app.get("/employer-change-password", (req, res) => {
  res.render("emp_panel/employer-change-password", {
    session: req.session,
  });
});
app.get("/employer-delete-account", (req, res) => {
  res.render("emp_panel/employer-delete-account", {
    session: req.session,
  });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // 👈 अब ये undefined नहीं होगा

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required",
      });
    }

    // 1️⃣ Email से user ढूंढो
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: HrProfile,
          as: "hrProfile",
          include: [
            {
              model: CompanyProfile,
              as: "companyProfile",
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // 2️⃣ Password compare करो (decrypt नहीं)
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    // ✅ SESSION SET HERE
    req.session.email = user.email;
    req.session.userId = user.id;
    req.session.hrProfileId = user.hrProfile.id;
    req.session.name = user.hrProfile.u_name;
    req.session.companyId = user.hrProfile.companyProfile.id;
    req.session.company = user.hrProfile.companyProfile.name;
    req.session.location = user.hrProfile.companyProfile.location;
    req.session.sidebarclass = "active";

    return res.status(200).json({
      success: true,
      message: "Login successful",
      // optionally user data (without password)
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);

// Sync DB (automatic tables creation)
sequelize.sync().then(() => {
  console.log("Database synced.");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} (${process.env.NODE_ENV})`);
});

const downloadTokens = new Map();

app.get("/generate", (req, res) => {
  const token = uuidv4();

  // File should NOT be publicly accessible
  const filePath = path.join(__dirname, "downloads", "offer_letter.pdf");

  downloadTokens.set(token, {
    filePath,
    createdAt: Date.now(),
  });

  res.send({
    downloadUrl: `https://jobs.codesnlogic.com/downloads/${token}`,
  });
});

app.get("/downloads/:token", (req, res) => {
  const token = req.params.token;
  const data = downloadTokens.get(token);

  if (!data) {
    return res.status(403).send("Link expired or invalid");
  }

  // OPTIONAL: expiry (10 min)
  if (Date.now() - data.createdAt > 10 * 60 * 1000) {
    downloadTokens.delete(token);
    return res.status(403).send("Link expired");
  }

  // One-time use
  downloadTokens.delete(token);

  res.download(data.filePath, (err) => {
    if (err) {
      res.status(500).send("Download failed");
    }
  });
});
