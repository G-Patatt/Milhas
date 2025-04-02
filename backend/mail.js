const transport = require("nodemailer").createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "rubinhobahia@hotmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = async (email, subject, message) => {
  try {
    const info = await transport.sendMail({
      from: "Miles Exchange <rubinhobahia@hotmail.com>",
      to: email,
      subject,
      html: message,
      text: message,
    });
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendEmail };
