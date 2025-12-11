// utils/mailer.js
const nodemailer = require("nodemailer");

// configure as per your SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "akashyadav.8498@gmail.com",
    pass: "hwmsjjclrstgzsoy"
  }
});

async function sendWelcomeEmail(toEmail, name, plainPassword) {
  const html = `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h2 style="color: #2b6cb0;">Congratulations, ${name || "User"}! 🎉</h2>
    <p>Your account on <strong>Our Portal</strong> has been created successfully.</p>

    <p>Here are your login details:</p>
    <table style="border-collapse: collapse;">
      <tr>
        <td style="padding: 6px 12px;"><strong>Email:</strong></td>
        <td style="padding: 6px 12px;">${toEmail}</td>
      </tr>
      <tr>
        <td style="padding: 6px 12px;"><strong>Password:</strong></td>
        <td style="padding: 6px 12px;"><code>${plainPassword}</code></td>
      </tr>
    </table>

    <p style="margin-top: 16px;">
      For security reasons, please log in and change your password after your first login.
    </p>

    <p style="margin-top: 24px;">Regards,<br/>Team Support</p>
  </div>
  `;

  await transporter.sendMail({
    from: '"Support" <no-reply@example.com>',
    to: toEmail,
    subject: "Your account has been created",
    html
  });
}

module.exports = { sendWelcomeEmail };
