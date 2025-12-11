const bcrypt = require("bcryptjs");
const { generateRandomPassword } = require("../utils/password");
const { sendWelcomeEmail } = require("../utils/mailer");
const User = require("../models/User");
const HrProfile = require("../models/HrProfile");
const CompanyProfile = require("../models/CompanyProfile");

exports.getUsers = async (req, res) => {
  try {
    const email = req.session.email;

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
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const userDetails = {
      hrProfile: user.hrProfile,
      email: user.email,
    };

    return res.json({
      success: true,
      userDetails: userDetails,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    // 1. Generate random password
    const plainPassword = generateRandomPassword(10);

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // 3. Create user with hashed password
    const user = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const user_id = user.id;
    const hrProfile = await HrProfile.create({
      user_id: user_id,
      u_name: req.body.u_name,
    });

    const hr_profile_id = hrProfile.id;
    const companyProfile = await CompanyProfile.create({
      hr_profile_id: hr_profile_id,
      name: req.body.c_name,
      location: req.body.location,
    });

    // 4. Send welcome email with plain password
    try {
      await sendWelcomeEmail(user.email, user.u_name, plainPassword);
    } catch (mailErr) {
      console.error("Email sending failed:", mailErr.message);
      // Optional: you can still continue even if email fails
    }

    // 5. Render EJS page instead of JSON
    return res.status(201).json({
      status: "success",
      message:
        "You have registered successfully. You will be redirected to the homepage shortly.",
      redirectUrl: "/", // or "/index" or wherever you want
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "error",
      message:
        "Something went wrong while creating the user. Please try again.",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userData = req.body;

    const hrProfile = await HrProfile.update(
      {
        u_name: userData.name,
        gender: userData.gender,
        designation: userData.designation,
        experience: userData.experience,
        contact: parseInt(userData.contact),
        city: userData.city,
        state: userData.state,
        city: userData.city,
        description: userData.description,
        updatedAt: new Date(),
      },
      { where: { user_id: req.session.userId } }
    );

    if (!hrProfile) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.json({
      success: true,
      message: "Login Succesfully",
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
