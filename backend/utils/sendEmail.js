const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

oAuth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

const sendEmail = async (subject, message, send_to) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: send_to,
      subject: subject,
      html: message,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.response);
    return result;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

module.exports = sendEmail;
