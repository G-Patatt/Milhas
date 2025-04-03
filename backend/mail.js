const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para o SSL
  auth: {
    user: "nealwoltz@gmail.com", // seu endereço de e-mail do Yahoo
    pass: "hkjx ejaa rfew hftq", // sua senha ou senha de aplicativo
  },
});

transport.verify(function (error, success) {
  if (error) {
    console.log(error, "erro");
    return;
  }
});

const sendEmail = async (email, subject, message) => {
  try {
    const info = await transport.sendMail({
      from: '"Miles Exchange" <rubinhobahia@hotmail.com',
      to: email,
      subject,
      text: message,
      html: message,
    });
    return info;
  } catch (error) {}
};

module.exports = { sendEmail };
